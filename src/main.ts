import { bangs } from "./bangs";
import "./style.css";

const defaultBang = localStorage.getItem("defaultBang") ?? "ddg";

const homePage = () => {
    document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <h3>https://bang-search.pages.dev?q=%s</h1>
    <div id="settings">
        <label for="default">Default Bang</label>
        <input id="default" type="text" value="${defaultBang}" />
        <button id="save">Save</button>
    </div>
`;

    const defaultInput = document.querySelector<HTMLInputElement>("#default")!;
    const saveButton = document.querySelector<HTMLButtonElement>("#save")!;

    saveButton.addEventListener("click", () => {
        localStorage.setItem("defaultBang", defaultInput.value);
        window.location.reload();
    });
};

const getRedirectUrl = () => {
    const url = new URL(window.location.href);
    const query = url.searchParams.get("q")?.trim() ?? "";

    if (!query) {
        homePage();
        return null;
    }

    const match = query.match(/!(\S+)/i);

    const trigger = match?.[1]?.toLowerCase() ?? "";

    const selectedBang = bangs[trigger] ?? bangs[defaultBang];

    const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

    const searchUrl = selectedBang.replace(
        "{{{s}}}",
        encodeURIComponent(cleanQuery).replace(/%2F/g, "/")
    );

    if (!searchUrl) return null;

    return searchUrl;
};

const redirect = () => {
    const url = getRedirectUrl();

    if (!url) return;

    window.location.replace(url);
};

redirect();
