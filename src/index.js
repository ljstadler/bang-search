if (window.location.pathname === "/search") {
    const { bangs } = await import("./bangs.js");

    const defaultBang = bangs["ecosia"];

    const query = new URLSearchParams(window.location.search).get("q");

    if (!query) window.location.replace(window.location.origin);
    else {
        const parts = query.trim().split(" ");
        let selectedBang = defaultBang;
        const cleanParts = [];

        for (const part of parts) {
            if (part.startsWith("!")) {
                const bang = bangs[part.substring(1)];
                if (bang) {
                    selectedBang = bang;
                    continue;
                }
            }
            cleanParts.push(part);
        }

        const cleanQuery = cleanParts.join(" ");

        const url =
            cleanQuery === ""
                ? `https://${selectedBang.d}`
                : selectedBang.u.replace(
                      "{{{s}}}",
                      encodeURIComponent(cleanQuery).replaceAll("%2F", "/"),
                  );

        window.location.replace(url);
    }
} else {
    document.querySelector("#app").innerHTML = `
        <h1>${window.location.origin}/search?q=!ecosia+%s</h1>
    `;
}
