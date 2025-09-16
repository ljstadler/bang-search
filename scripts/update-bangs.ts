type Bang = {
    t: string;
    u: string;
};

(async () => {
    const data = await fetch(
        "https://raw.githubusercontent.com/kagisearch/bangs/refs/heads/main/data/bangs.json"
    );

    const arr: Bang[] = await data.json();

    const bangs = arr.reduce((obj, bang) => ((obj[bang.t] = bang.u), obj), {});

    bangs["gweb"] = `${bangs["g"]}&udm=14`;

    Bun.write(
        "src/lib/bangs.ts",
        `export const bangs: Record<string, string> = ${JSON.stringify(
            bangs,
            null,
            4
        )};`
    );
})();
