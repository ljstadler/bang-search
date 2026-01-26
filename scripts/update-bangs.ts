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

    const bangsTxt: Record<string, string> = {};
    const bangsRecord: Record<string, string> = {};

    for (const bang of data) {
        if (!bang.d.includes("kagi.com") && !bang.ad && !bang.x) {
            bangsTxt[bang.s] = `!${bang.t}`;
            bangsRecord[bang.t] = bang.u;
            if (bang.ts) {
                for (const t of bang.ts) {
                    bangsTxt[bang.s] += ` !${t}`;
                    bangsRecord[t] = bang.u;
                }
            }
        }
    }

    await Bun.write(
        "src/assets/bangs.txt",
        Object.entries(bangsTxt).map(([key, value]) => `${key}: ${value}\n`),
    );

    await Bun.write(
        "src/lib/bangs.ts",
        `export const bangs: Record<string, string> = ${JSON.stringify(
            bangsRecord,
            null,
            4,
        )};`,
    );
})();
