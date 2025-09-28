import { bangs } from "./bangs";

export const defaultTrigger = "ecosia";

export const getRedirectUrl = (query: string) => {
    const candidates = [...query.matchAll(/!(\S+)/gi)].map((m) => m[1]);

    const trigger = candidates.findLast((c) => bangs[c]) ?? defaultTrigger;

    const selectedBang = bangs[trigger];

    const cleanQuery = query.replace(/!\S+\s*/gi, "").trim();

    return cleanQuery === ""
        ? `${new URL(selectedBang).origin}`
        : selectedBang.replace(
              "{{{s}}}",
              encodeURIComponent(cleanQuery).replace(/%2F/g, "/")
          );
};
