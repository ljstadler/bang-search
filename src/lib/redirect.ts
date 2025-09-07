import { bangs } from "./bangs";

export const getRedirectUrl = (query: string) => {
    const matches = [...query.matchAll(/!(\S+)/gi)];

    const trigger = matches.at(-1)?.[1] ?? "g";

    const selectedBang = bangs[trigger];

    const cleanQuery = query.replace(/!\S+\s*/gi, "").trim();

    if (cleanQuery === "")
        return selectedBang ? `${new URL(selectedBang).origin}` : null;

    const searchUrl = selectedBang.replace(
        "{{{s}}}",
        encodeURIComponent(cleanQuery).replace(/%2F/g, "/")
    );

    if (!searchUrl) return null;

    return searchUrl;
};
