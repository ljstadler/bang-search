import { bangs } from "./bangs";

export const defaultTrigger = "ecosia";

export const getRedirectUrl = (query: string) => {
    const parts = query.trim().split(" ");
    let trigger = defaultTrigger;
    const cleanParts: string[] = [];

    for (const part of parts) {
        if (part.startsWith("!") && bangs[part.substring(1)]) {
            trigger = part.substring(1);
        } else {
            cleanParts.push(part);
        }
    }

    const selectedBang = bangs[trigger];
    const cleanQuery = cleanParts.join(" ");

    return cleanQuery === ""
        ? `${new URL(selectedBang).origin}`
        : selectedBang.replace(
              "{{{s}}}",
              encodeURIComponent(cleanQuery).replaceAll("%2F", "/"),
          );
};
