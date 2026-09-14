if (window.location.pathname === "/bangs") {
    const { bangs } = await import("./bangs.js");

    const siteTriggers = {};
    for (const [key, value] of Object.entries(bangs)) {
        if (!siteTriggers[value.s]) {
            siteTriggers[value.s] = [key];
        } else {
            siteTriggers[value.s].push(key);
        }
    }

    document.querySelector("#app").innerHTML = Object.entries(siteTriggers)
        .map(([k, v]) => `<p><strong>${k}</strong>: ${v.join(", ")}</p>`)
        .join("");
} else if (window.location.pathname === "/search") {
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
        <strong>${window.location.origin}/search?q=!ecosia+%s</strong>
        <p>Performs client-side bang redirects using last valid bang in search query, discarding all other valid bangs</p>
        <a href="/bangs">Bangs</a>
    `;
}
