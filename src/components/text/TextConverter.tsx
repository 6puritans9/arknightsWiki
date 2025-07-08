import { ReactNode, isValidElement, cloneElement } from "react";
import richTextStylesDict from "@/app/styles/textStyleMap";

const parseRichText = (text: string) => {
    const tagRegex = /<@([a-zA-Z0-9.]+)>(.*?)<\/>/g;
    const result: ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let idx = 0;

    while ((match = tagRegex.exec(text))) {
        if (match.index > lastIndex) {
            result.push(text.slice(lastIndex, match.index));
        }

        const tag = match[1];
        const content = match[2];
        const color = richTextStylesDict[tag] || "inherit";
        result.push(
            <span key={idx++} style={{ color }}>
                {content}
            </span>
        );
        lastIndex = tagRegex.lastIndex;
    }

    if (lastIndex < text.length) {
        result.push(text.slice(lastIndex));
    }

    return result;
};

const NewlineRichText = (nodes: ReactNode[]): ReactNode[] => {
    const result: ReactNode[] = [];
    let key = 0;
    for (const node of nodes) {
        if (typeof node === "string") {
            // Replace all ; with .<br />
            const parts = node.split(";");
            parts.forEach((part, i) => {
                result.push(part);
                if (i < parts.length - 1) {
                    result.push(".");
                    result.push(<br key={"br-" + key++} />);
                }
            });
        } else if (
            isValidElement(node) &&
            typeof (node.props as { children?: unknown }).children === "string"
        ) {
            const childrenStr = (node.props as { children?: unknown })
                .children as string;
            const parts = childrenStr.split(";");
            parts.forEach((part, i) => {
                result.push(
                    cloneElement(node, { key: "el-" + key++ }, part.trim())
                );
                if (i < parts.length - 1) {
                    result.push(".");
                    result.push(<br key={"br-" + key++} />);
                }
            });
        } else {
            result.push(node);
        }
    }

    // Ensure if the last char is not "."
    let lastText = "";
    for (let i = result.length - 1; i >= 0; i--) {
        const item = result[i];
        if (typeof item === "string" && item.trim() !== "") {
            lastText = item.trim();
            break;
        }
        if (
            isValidElement(item) &&
            typeof (item.props as { children?: unknown }).children === "string"
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

    return result;
};

export { parseRichText, NewlineRichText };
