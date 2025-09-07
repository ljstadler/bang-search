import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy } from "lucide-react";

export const Route = createFileRoute("/")({
    component: App,
});

function App() {
    const [searchUrl, setSearchUrl] = useState("/search?q=!g+%s");

    const [copying, setCopying] = useState(false);

    const copy = async () => {
        setCopying(true);
        setTimeout(() => {
            setCopying(false);
        }, 2000);
        await navigator.clipboard.writeText(
            `https://bang-search.pages.dev${searchUrl}`
        );
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen m-0">
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                <Label htmlFor="default">Default Bang</Label>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                        id="default"
                        type="text"
                        defaultValue="g"
                        onChange={(e) =>
                            setSearchUrl(`/search?q=!${e.target.value}+%s`)
                        }
                    />
                </div>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="search">Search URL</Label>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input id="search" type="text" value={searchUrl} disabled />
                    <Button
                        className="cursor-pointer"
                        variant="outline"
                        size="icon"
                        onClick={copy}
                        disabled={copying}
                    >
                        {copying ? <Check /> : <Copy />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
