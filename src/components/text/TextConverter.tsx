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

// const replaceSkillPlaceholder = (
//     description: string,
//     blackboard: Record<string, number>
// ) => {
//     // More general regex: allow any character except } in the key
//     return description.replace(/\{([^}]+?)(?::0%|:0)?\}/g, (_, key, format) => {
//         const value = blackboard[key];
//         if (value === undefined) return `{${key}}`;

//         if (format === ":0%") {
//             return `${value * 100}%`;
//         }
//         if (format === ":0") {
//             return `${value}`;
//         }
//         return `${value}`;
//     });
// };

// const replaceSkillTags = (text: string) => {
//     // Match any <@ba.xxx> or <$ba.xxx> or </> tag
//     const tagRegex = /<(@;
//     const stack: Array<{
//         tag: string;
//         tagType: string;
//         children: React.ReactNode[];
//     }> = [];
//     let lastIndex = 0;
//     let match;
//     let idx = 0;
//     const result: React.ReactNode[] = [];

//     while ((match = tagRegex.exec(text)) !== null) {
//         // Push text before the tag
//         if (match.index > lastIndex) {
//             const content = text.slice(lastIndex, match.index);
//             if (stack.length) {
//                 stack[stack.length - 1].children.push(content);
//             } else {
//                 result.push(content);
//             }
//         }
//         const [full, atOrDollar, tagName] = match;
//         if (full.startsWith("</")) {
//             const node = stack.pop();
//             if (node) {
//                 let element: React.ReactNode;
//                 if (node.tag === "vup") {
//                     element = (
//                         <span key={idx++} style={{ color: "dodgerblue" }}>
//                             {node.children}
//                         </span>
//                     );
//                 } else if (node.tag === "rem") {
//                     element = (
//                         <span key={idx++} style={{ color: "orange" }}>
//                             {node.children}
//                         </span>
//                     );
//                 } else if (node.tag === "root") {
//                     element = <b key={idx++}>{node.children}</b>;
//                 } else {
//                     // All other tags: gray
//                     element = (
//                         <span key={idx++} style={{ fontWeight: "bold" }}>
//                             {node.children}
//                         </span>
//                     );
//                 }
//                 if (stack.length) {
//                     stack[stack.length - 1].children.push(element);
//                 } else {
//                     result.push(element);
//                 }
//             }
//         } else {
//             // Push tag info to stack
//             stack.push({ tag: tagName, tagType: atOrDollar, children: [] });
//         }
//         lastIndex = tagRegex.lastIndex;
//     }
//     // Push any remaining text
//     if (lastIndex < text.length) {
//         const content = text.slice(lastIndex);
//         if (stack.length) {
//             stack[stack.length - 1].children.push(content);
//         } else {
//             result.push(content);
//         }
//     }
//     return result;
// };

// const convertSkillText = (
//     text: string,
//     blackboard: { [key: string]: number }
// ) => replaceSkillTags(replaceSkillPlaceholder(text, blackboard));

// const convertAttrText = (str: string): React.ReactNode => {
//     // Regex to match any <@ba.xxx> or <$ba.xxx> ... </>
//     const tagRegex = /<(@|\$)ba\.(\w+)>|<\/>/g;
//     let lastIndex = 0;
//     let match;
//     let idx = 0;
//     const stack: Array<{
//         tag: string;
//         tagType: string;
//         children: React.ReactNode[];
//     }> = [];
//     const result: React.ReactNode[] = [];

//     while ((match = tagRegex.exec(str)) !== null) {
//         if (match.index > lastIndex) {
//             const content = str.slice(lastIndex, match.index);
//             if (stack.length) {
//                 stack[stack.length - 1].children.push(content);
//             } else {
//                 result.push(content);
//             }
//         }
//         const [full, atOrDollar, tagName] = match;
//         if (full.startsWith("</")) {
//             const node = stack.pop();
//             if (node) {
//                 let element: React.ReactNode;
//                 if (node.tag === "kw") {
//                     element = (
//                         <span key={idx++} style={{ color: "dodgerblue" }}>
//                             {node.children}
//                         </span>
//                     );
//                 } else {
//                     // All other tags: bold gray
//                     element = (
//                         <span
//                             key={idx++}
//                             style={{ color: "gray", fontWeight: "bold" }}
//                         >
//                             {node.children}
//                         </span>
//                     );
//                 }
//                 if (stack.length) {
//                     stack[stack.length - 1].children.push(element);
//                 } else {
//                     result.push(element);
//                 }
//             }
//         } else {
//             stack.push({ tag: tagName, tagType: atOrDollar, children: [] });
//         }
//         lastIndex = tagRegex.lastIndex;
//     }
//     if (lastIndex < str.length) {
//         const content = str.slice(lastIndex);
//         if (stack.length) {
//             stack[stack.length - 1].children.push(content);
//         } else {
//             result.push(content);
//         }
//     }
//     return <>{result}</>;
// };
