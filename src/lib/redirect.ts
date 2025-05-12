import { bangs } from "./bangs";

export const getRedirectUrl = (query: string, defaultBang: string) => {
    const match = query.match(/!(\S+)/i);

    const trigger = match?.[1]?.toLowerCase() ?? "";

    const selectedBang = bangs[trigger] ?? bangs[defaultBang];

    const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

    if (cleanQuery === "")
        return selectedBang ? `${new URL(selectedBang).origin}` : null;

    const searchUrl = selectedBang.replace(
        "{{{s}}}",
        encodeURIComponent(cleanQuery).replace(/%2F/g, "/")
    );

    if (!searchUrl) return null;

    return searchUrl;
};
