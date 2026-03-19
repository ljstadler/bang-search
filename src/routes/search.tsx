import { Navigate, useSearchParams } from "react-router";

import { getRedirectUrl } from "@/lib/redirect";

export function Search() {
    const [searchParams] = useSearchParams();

    const q = searchParams.get("q");

    if (!q) return <Navigate to="/" />;

    const url = getRedirectUrl(q);

    window.location.replace(url);
}
