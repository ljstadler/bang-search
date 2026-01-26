import { getRedirectUrl } from "@/lib/redirect";
import { Redirect, useSearchParams } from "wouter";

export default function Search() {
    const [searchParams] = useSearchParams();

    const q = searchParams.get("q");

    if (!q) return <Redirect to="/" />;

    const url = getRedirectUrl(q);

    window.location.replace(url);
}
