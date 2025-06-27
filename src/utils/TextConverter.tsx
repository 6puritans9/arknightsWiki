import React from "react";

const replaceSkillPlaceholder = (
    description: string,
    blackboard: Record<string, number>
) => {
    // More general regex: allow any character except } in the key
    return description.replace(/\{([^}]+?)(?::0%|:0)?\}/g, (_, key, format) => {
        const value = blackboard[key];
        if (value === undefined) return `{${key}}`;

        if (format === ":0%") {
            return `${value * 100}%`;
        }
        if (format === ":0") {
            return `${value}`;
        }
        return `${value}`;
    });
};

const replaceSkillTags = (text: string) => {
    // Match any <@ba.xxx> or <$ba.xxx> or </> tag
    const tagRegex = /<(@|\$)ba\.(\w+)>|<\/>/g;
    const stack: Array<{
        tag: string;
        tagType: string;
        children: React.ReactNode[];
    }> = [];
    let lastIndex = 0;
    let match;
    let idx = 0;
    const result: React.ReactNode[] = [];

    while ((match = tagRegex.exec(text)) !== null) {
        // Push text before the tag
        if (match.index > lastIndex) {
            const content = text.slice(lastIndex, match.index);
            if (stack.length) {
                stack[stack.length - 1].children.push(content);
            } else {
                result.push(content);
            }
        }
        const [full, atOrDollar, tagName] = match;
        if (full.startsWith("</")) {
            const node = stack.pop();
            if (node) {
                let element: React.ReactNode;
                if (node.tag === "vup") {
                    element = (
                        <span key={idx++} style={{ color: "dodgerblue" }}>
                            {node.children}
                        </span>
                    );
                } else if (node.tag === "rem") {
                    element = (
                        <span key={idx++} style={{ color: "orange" }}>
                            {node.children}
                        </span>
                    );
                } else if (node.tag === "root") {
                    element = <b key={idx++}>{node.children}</b>;
                } else {
                    // All other tags: gray
                    element = (
                        <span key={idx++} style={{ fontWeight: "bold" }}>
                            {node.children}
                        </span>
                    );
                }
                if (stack.length) {
                    stack[stack.length - 1].children.push(element);
                } else {
                    result.push(element);
                }
            }
        } else {
            // Push tag info to stack
            stack.push({ tag: tagName, tagType: atOrDollar, children: [] });
        }
        lastIndex = tagRegex.lastIndex;
    }
    // Push any remaining text
    if (lastIndex < text.length) {
        const content = text.slice(lastIndex);
        if (stack.length) {
            stack[stack.length - 1].children.push(content);
        } else {
            result.push(content);
        }
    }
    return result;
};

const convertSkillText = (
    text: string,
    blackboard: { [key: string]: number }
) => replaceSkillTags(replaceSkillPlaceholder(text, blackboard));

const convertAttrText = (str: string): React.ReactNode => {
    // Regex to match any <@ba.xxx> or <$ba.xxx> ... </>
    const tagRegex = /<(@|\$)ba\.(\w+)>|<\/>/g;
    let lastIndex = 0;
    let match;
    let idx = 0;
    const stack: Array<{
        tag: string;
        tagType: string;
        children: React.ReactNode[];
    }> = [];
    const result: React.ReactNode[] = [];

    while ((match = tagRegex.exec(str)) !== null) {
        if (match.index > lastIndex) {
            const content = str.slice(lastIndex, match.index);
            if (stack.length) {
                stack[stack.length - 1].children.push(content);
            } else {
                result.push(content);
            }
        }
        const [full, atOrDollar, tagName] = match;
        if (full.startsWith("</")) {
            const node = stack.pop();
            if (node) {
                let element: React.ReactNode;
                if (node.tag === "kw") {
                    element = (
                        <span key={idx++} style={{ color: "dodgerblue" }}>
                            {node.children}
                        </span>
                    );
                } else {
                    // All other tags: bold gray
                    element = (
                        <span
                            key={idx++}
                            style={{ color: "gray", fontWeight: "bold" }}
                        >
                            {node.children}
                        </span>
                    );
                }
                if (stack.length) {
                    stack[stack.length - 1].children.push(element);
                } else {
                    result.push(element);
                }
            }
        } else {
            stack.push({ tag: tagName, tagType: atOrDollar, children: [] });
        }
        lastIndex = tagRegex.lastIndex;
    }
    if (lastIndex < str.length) {
        const content = str.slice(lastIndex);
        if (stack.length) {
            stack[stack.length - 1].children.push(content);
        } else {
            result.push(content);
        }
    }
    return <>{result}</>;
};

export { convertSkillText, convertAttrText };
