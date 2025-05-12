import { getRedirectUrl } from "@/lib/redirect";
import { createFileRoute, redirect } from "@tanstack/react-router";

type Search = {
    q: string;
};

export const Route = createFileRoute("/search")({
    component: Search,
    validateSearch: (search: Record<string, unknown>): Search => {
        return {
            q: search.q as string,
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
    const { q } = Route.useSearch();

    const defaultBang = localStorage.getItem("defaultBang") ?? "g";

    const url = getRedirectUrl(q, defaultBang);

    if (!url) throw redirect({ to: "/" });

    location.replace(url);
}
