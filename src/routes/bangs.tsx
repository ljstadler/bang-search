import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { bangs } from "@/lib/bangs";

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
        <div className="mx-auto max-w-4xl p-2">
            <Input
                className="mb-2"
                id="search"
                type="search"
                placeholder="Search Bangs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2 lg:grid-cols-3">
                {filteredBangs.map((bang) => (
                    <a
                        key={bang.s}
                        href={`https://${bang.d}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="hover:bg-accent h-full rounded border p-2">
                            <h3 className="font-bold">{bang.s}</h3>
                            <div className="mt-1 flex flex-wrap gap-1">
                                {bang.ts.map((t) => (
                                    <span
                                        key={t}
                                        className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs"
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
