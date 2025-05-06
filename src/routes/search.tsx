import { createFileRoute, redirect } from "@tanstack/react-router";
import { bangs } from "@/bangs";

type Search = {
    q?: string;
};

export const Route = createFileRoute("/search")({
    component: Search,
    validateSearch: (search: Record<string, unknown>): Search => {
        return {
            q: search.q ? (search.q as string).trim() : undefined,
        };
    },
    loaderDeps: ({ search: { q } }) => ({ q }),
    loader: ({ deps: { q } }) => {
        if (!q) {
            throw redirect({
                to: "/",
            });
        }
    },
});

function Search() {
    const defaultBang = localStorage.getItem("defaultBang") ?? "g";

    const getRedirectUrl = (query: string) => {
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

    const { q } = Route.useSearch();

    const url = getRedirectUrl(q!);

    if (!url) throw redirect({ to: "/" });

    window.location.replace(url);
}
