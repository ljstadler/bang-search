import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { defaultTrigger } from "@/lib/redirect";

export function Index() {
    const [searchUrl, setSearchUrl] = useState(`/search?q=!${defaultTrigger}+%s`);

    const [copying, setCopying] = useState(false);

    const copy = async () => {
        setCopying(true);
        setTimeout(() => {
            setCopying(false);
        }, 2000);
        await navigator.clipboard.writeText(`${window.location.origin}${searchUrl}`);
    };

    return (
        <div className="m-0 flex h-screen flex-col items-center justify-center p-2">
            <div className="mb-2 grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="default">Default Bang</Label>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                        id="default"
                        type="text"
                        defaultValue={defaultTrigger}
                        onChange={(e) => setSearchUrl(`/search?q=!${e.target.value}+%s`)}
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
                        title="Copy"
                    >
                        {copying ? <Check /> : <Copy />}
                    </Button>
                </div>
            </div>

            <div className="text-ring fixed bottom-4 text-center text-sm">
                <a className="hover:text-foreground" href="/bangs">
                    Bangs
                </a>
                &nbsp;•&nbsp;
                <a
                    className="hover:text-foreground"
                    href="https://github.com/ljstadler/bang-search"
                    target="blank"
                >
                    GitHub
                </a>
            </div>
        </div>
    );
}
