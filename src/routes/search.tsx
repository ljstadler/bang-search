import { getRedirectUrl } from "@/lib/redirect";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/search")({
    validateSearch: (search: Record<string, unknown>): { q: string } => {
        return {
            q: search.q as string,
        };
    },
    loaderDeps: ({ search: { q } }) => ({ q }),
    loader: ({ deps: { q } }) => {
        if (!q) throw redirect({ to: "/" });

        const url = getRedirectUrl(q);

        if (!url) throw redirect({ to: "/" });

        throw redirect({ href: url });
    },
});
