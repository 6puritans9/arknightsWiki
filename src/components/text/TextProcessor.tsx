import { ReactNode, isValidElement, cloneElement } from "react";
import { Popover } from "radix-ui";
import { SingleOpType, BlackboardType, BlackboardEntry } from "@/api/apiMongo";
import richTextStylesDict from "@/app/styles/textStyleMap";
import termDescriptionDict from "@/lib/constants/textTagMap";
import { css } from "$/styled-system/css";

//#region Styles
const popoverTextStyles = css({
    textDecoration: "underline",
    cursor: "help",
    color: "primary",
});

const popoverContainer = css({
    maxWidth: { base: "200px" },
    backgroundColor: "white",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    zIndex: "modal",
});
//#endregion

// Utility function
const extractSkillRange = (
    op: SingleOpType,
    activeSkill: number,
    activeLevel: number
): string | null => {
    const rawBlackboard =
        op.skillDetails[activeSkill].levels[activeLevel].blackboard;

    if (Array.isArray(rawBlackboard)) {
        for (const entry of rawBlackboard) {
            if (entry.valueStr) {
                return entry.valueStr;
            }
        }
    }

    return null;
};

// Utilizing builder pattern
class TextProcessor {
    private nodes: ReactNode[] = [];
    private keyCounter = 0;

    constructor(text: string) {
        this.nodes = [text];
    }

    // Static factory method
    static from(text: string): TextProcessor {
        return new TextProcessor(text);
    }

    // Parse rich text (<@tag>content</> patterns)
    parseRichText(): TextProcessor {
        const tagRegex = /<@([a-zA-Z0-9.]+)>(.*?)<\/>/g;
        const result: ReactNode[] = [];

        for (const node of this.nodes) {
            if (typeof node === "string") {
                let lastIndex = 0;
                let match;

                while ((match = tagRegex.exec(node))) {
                    if (match.index > lastIndex) {
                        result.push(node.slice(lastIndex, match.index));
                    }

                    const tag = match[1];
                    const content = match[2];
                    const color = richTextStylesDict[tag] || "inherit";
                    result.push(
                        <span
                            key={`rich-${this.keyCounter++}`}
                            style={{ color }}
                        >
                            {content}
                        </span>
                    );
                    lastIndex = tagRegex.lastIndex;
                }

                if (lastIndex < node.length) {
                    result.push(node.slice(lastIndex));
                }
            } else {
                result.push(node);
            }
        }

        this.nodes = result;
        return this;
    }

    // Handle newlines (; to .<br/>)
    parseNewlines(): TextProcessor {
        const result: ReactNode[] = [];

        for (const node of this.nodes) {
            if (typeof node === "string") {
                const parts = node.split(";");
                parts.forEach((part, i) => {
                    result.push(part);
                    if (i < parts.length - 1) {
                        result.push(".");
                        result.push(<br key={`br-${this.keyCounter++}`} />);
                    }
                });
            } else if (
                isValidElement(node) &&
                typeof (node.props as { children?: unknown }).children ===
                    "string"
            ) {
                const childrenStr = (node.props as { children?: unknown })
                    .children as string;
                const parts = childrenStr.split(";");
                parts.forEach((part, i) => {
                    result.push(
                        cloneElement(
                            node,
                            { key: `el-${this.keyCounter++}` },
                            part.trim()
                        )
                    );
                    if (i < parts.length - 1) {
                        result.push(".");
                        result.push(<br key={`br-${this.keyCounter++}`} />);
                    }
                });
            } else {
                result.push(node);
            }
        }

        // Add period if missing
        let lastText = "";
        for (let i = result.length - 1; i >= 0; i--) {
            const item = result[i];
            if (typeof item === "string" && item.trim() !== "") {
                lastText = item.trim();
                break;
            }
            if (
                isValidElement(item) &&
                typeof (item.props as { children?: unknown }).children ===
                    "string"
            ) {
                lastText = (
                    (item.props as { children?: unknown }).children as string
                ).trim();
                break;
            }
        }
        if (lastText && !lastText.endsWith(".")) {
            result.push(".");
        }

        this.nodes = result;
        return this;
    }

    // Fill blackboard values ({variable} patterns)
    fillValues(
        op: SingleOpType,
        activeSkill: number,
        activeLevel: number
    ): TextProcessor {
        const result: ReactNode[] = [];

        for (const node of this.nodes) {
            if (
                isValidElement(node) &&
                typeof (node.props as { children?: unknown }).children ===
                    "string"
            ) {
                const childrenStr = (node.props as { children?: unknown })
                    .children as string;
                const rawBlackboard =
                    op.skillDetails[activeSkill].levels[activeLevel].blackboard;

                if (
                    rawBlackboard &&
                    childrenStr.includes("{") &&
                    childrenStr.includes("}")
                ) {
                    let blackboard: { [key: string]: number };
                    if (this.isObjectBlackboard(rawBlackboard)) {
                        blackboard = rawBlackboard;
                    } else {
                        blackboard = this.normalizeBlackboard(
                            rawBlackboard
                        ) as {
                            [key: string]: number;
                        };
                    }

                    const translated = childrenStr.replace(
                        /\{([^}]+)\}/g,
                        (match, keyword) => {
                            const key = keyword.split(":")[0].toLowerCase();
                            let value;
                            let shouldNegate = false;

                            if (key.startsWith("-")) {
                                const actualKey = key.substring(1);
                                value = blackboard[actualKey];
                                shouldNegate = true;
                            } else {
                                value = blackboard[key];
                            }

                            if (value !== undefined) {
                                const finalValue = shouldNegate
                                    ? -value
                                    : value;
                                return String(finalValue);
                            }

                            return match;
                        }
                    );
                    result.push(
                        cloneElement(node, { key: node.key }, translated)
                    );
                } else {
                    result.push(node);
                }
            } else {
                result.push(node);
            }
        }

        this.nodes = result;
        return this;
    }

    // Parse popover text (<$> patterns)
    parsePopovers(): TextProcessor {
        const result: ReactNode[] = [];

        for (const node of this.nodes) {
            if (typeof node === "string") {
                const processedString = this.processStringForPopovers(node);
                result.push(...processedString);
            } else if (
                isValidElement(node) &&
                typeof (node.props as { children?: unknown }).children ===
                    "string"
            ) {
                const childrenStr = (node.props as { children?: unknown })
                    .children as string;
                const processedString =
                    this.processStringForPopovers(childrenStr);

                if (
                    processedString.length === 1 &&
                    typeof processedString[0] === "string"
                ) {
                    result.push(
                        cloneElement(
                            node,
                            { key: node.key },
                            processedString[0]
                        )
                    );
                } else {
                    result.push(
                        cloneElement(
                            node,
                            { key: node.key },
                            ...processedString
                        )
                    );
                }
            } else {
                result.push(node);
            }
        }

        this.nodes = result;
        return this;
    }

    // Get final result
    getResult(): ReactNode[] {
        return this.nodes;
    }

    // Helper methods
    private processStringForPopovers(text: string): ReactNode[] {
        const result: ReactNode[] = [];
        const popoverRegex = /<\$([^>]+)>(.*?)<\/>/g;
        let lastIndex = 0;
        let match;

        while ((match = popoverRegex.exec(text))) {
            if (match.index > lastIndex) {
                result.push(text.slice(lastIndex, match.index));
            }

            const popoverType = match[1];
            const content = match[2];

            result.push(
                <Popover.Root key={`popover-${this.keyCounter++}`}>
                    <Popover.Trigger asChild>
                        <span className={popoverTextStyles}>{content}</span>
                    </Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content className={popoverContainer}>
                            <p>{this.getPopoverContent(popoverType)}</p>
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            );
            lastIndex = popoverRegex.lastIndex;
        }

        if (lastIndex < text.length) {
            result.push(text.slice(lastIndex));
        }

        return result;
    }

    private getPopoverContent(keyword: string): string {
        return (
            termDescriptionDict[keyword]?.description ||
            `Information about ${keyword}`
        );
    }

    private normalizeBlackboard(blackboard: BlackboardEntry[]): {
        [key: string]: number | string;
    } {
        return Object.fromEntries(
            blackboard.map((entry) => [entry.key, entry.value])
        );
    }

    private isObjectBlackboard(
        blackboard: BlackboardType
    ): blackboard is { [key: string]: number } {
        return !Array.isArray(blackboard);
    }
}

export default TextProcessor;
export { extractSkillRange };
