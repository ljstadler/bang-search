type Bang = {
    t: string;
    u: string;
    ts?: string[];
};

(async () => {
    const data = await fetch(
        "https://raw.githubusercontent.com/kagisearch/bangs/refs/heads/main/data/bangs.json",
    );

    const arr: Bang[] = await data.json();

    const bangs: Record<string, string> = {};

    for (const bang of arr) {
        bangs[bang.t] = bang.u;
        if (bang.ts) {
            for (const t of bang.ts) {
                bangs[t] = bang.u;
            }
        }
    }

    Bun.write(
        "src/lib/bangs.ts",
        `export const bangs: Record<string, string> = ${JSON.stringify(
            bangs,
            null,
            4,
        )};`,
    );
})();
