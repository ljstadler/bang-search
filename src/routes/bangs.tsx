import { Input } from "@/components/ui/input";
import { bangs } from "@/lib/bangs";
import { useMemo, useState } from "react";

export function Bangs() {
    const [search, setSearch] = useState("");

    const filteredBangs = useMemo(() => {
        const query = search.toLowerCase().trim();
        if (!query) return [];
        return bangs
            .filter(
                (bang) =>
                    bang.s.toLowerCase().includes(query) ||
                    bang.ts.some((t) => t.toLowerCase().includes(query)),
            )
            .slice(0, 60);
    }, [search]);

    return (
        <div className="p-2 max-w-4xl mx-auto">
            <Input
                className="mb-2"
                id="search"
                type="search"
                placeholder="Search Bangs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
                {filteredBangs.map((bang) => (
                    <a
                        key={bang.s}
                        href={`https://${bang.d}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="p-2 border rounded h-full hover:bg-accent">
                            <h3 className="font-bold">{bang.s}</h3>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {bang.ts.map((t) => (
                                    <span
                                        key={t}
                                        className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full"
                                    >
                                        !{t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
