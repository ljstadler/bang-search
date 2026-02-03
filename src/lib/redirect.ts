import { bangs } from "./bangs";

export const defaultTrigger = "ecosia";

const defaultBang = bangs.find((bang) => bang.ts.includes(defaultTrigger))!;

export const getRedirectUrl = (query: string) => {
    const parts = query.trim().split(" ");
    let selectedBang = defaultBang;
    const cleanParts: string[] = [];

    for (const part of parts) {
        if (part.startsWith("!")) {
            const bang = bangs.find((bang) =>
                bang.ts.includes(part.substring(1)),
            );
            if (bang) {
                selectedBang = bang;
                continue;
            }
        }
        cleanParts.push(part);
    }

    const cleanQuery = cleanParts.join(" ");

    return cleanQuery === ""
        ? `https://${selectedBang.d}`
        : selectedBang.u.replace(
              "{{{s}}}",
              encodeURIComponent(cleanQuery).replaceAll("%2F", "/"),
          );
};
