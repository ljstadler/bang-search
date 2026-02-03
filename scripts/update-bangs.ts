type Bang = {
    d: string;
    s: string;
    t: string;
    u: string;
    ad?: string;
    ts?: string[];
    x?: string;
};

(async () => {
    const res = await fetch(
        "https://raw.githubusercontent.com/kagisearch/bangs/refs/heads/main/data/bangs.json",
    );

    const data: Bang[] = await res.json();

    const bangs = data
        .filter((bang) => !bang.d.includes("kagi.com") && !bang.ad && !bang.x)
        .map((bang) => ({
            s: bang.s,
            d: bang.d,
            u: bang.u,
            ts: [bang.t, ...(bang.ts ?? [])],
        }));

    await Bun.write(
        "src/lib/bangs.ts",
        `export const bangs = ${JSON.stringify(bangs, null, 4)}`,
    );
})();
