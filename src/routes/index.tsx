import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, Save } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
    component: App,
});

function App() {
    const [defaultBang, setDefaultBang] = useState(
        localStorage.getItem("defaultBang") ?? "g"
    );

    const searchUrl = "https://bang-search.pages.dev/search?q=%s";

    const [saving, setSaving] = useState(false);
    const [copying, setCopying] = useState(false);

    const save = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
        }, 2000);
        localStorage.setItem("defaultBang", defaultBang);
    };

    const copy = async () => {
        setCopying(true);
        setTimeout(() => {
            setCopying(false);
        }, 2000);
        await navigator.clipboard.writeText(searchUrl);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen m-0">
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                <Label htmlFor="default">Default Bang</Label>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                        id="default"
                        type="text"
                        value={defaultBang}
                        onChange={(e) => setDefaultBang(e.target.value)}
                    />
                    <Button
                        className="cursor-pointer"
                        variant="outline"
                        size="icon"
                        onClick={save}
                        disabled={saving}
                    >
                        {saving ? <Check /> : <Save />}
                    </Button>
                </div>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="search">Search URL</Label>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                        id="search"
                        type="text"
                        defaultValue={searchUrl}
                        disabled
                    />
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
