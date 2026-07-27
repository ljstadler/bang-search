import { readFile, writeFile } from "node:fs/promises";

(async () => {
    const currentBangsString = await readFile("src/bangs.js", "utf-8");

    const response = await fetch(
        "https://raw.githubusercontent.com/kagisearch/bangs/refs/heads/main/data/bangs.json",
    );

    const json = await response.json();

    const newBangs = {};

    json.filter((bang) => !bang.d.includes("kagi.com") && !bang.ad && !bang.x).forEach((bang) => {
        newBangs[bang.t] = { d: bang.d, u: bang.u };
        bang.ts?.forEach((t) => (newBangs[t] = { d: bang.d, u: bang.u }));
    });

    const newBangsString = `export const bangs = ${JSON.stringify(newBangs)}`;

    if (currentBangsString !== newBangsString) {
        await writeFile("src/bangs.js", newBangsString);

        const sw = await readFile("src/sw.js", "utf-8");

        const lines = sw.split("\n");

        lines[0] = `const VERSION = "${Date.now()}";`;

        await writeFile("src/sw.js", lines.join("\n"));
    }
})();
