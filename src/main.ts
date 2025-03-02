import { bangs } from "./bangs";
import "./style.css";

const defaultBang = localStorage.getItem("defaultBang") ?? "ddg";

const homePage = () => {
    document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
            <div>
                <label for="default">Default Bang</label>
                <div style="display: flex; gap: 5px;">
                    <input id="default" type="text" value="${defaultBang}" />
                    <button id="save" title="Save">
                        <img id="save-icon" src="/save.svg" alt="Save" />
                    </button>
                </div>
            </div>

            <div>
                <label for="search">Search URL</label>
                <div style="display: flex; gap: 5px;">
                    <input id="search" type="text" value="https://bang-search.pages.dev?q=%s" disabled />
                    <button id="copy" title="Copy">
                        <img id="copy-icon" src="/copy.svg" alt="Copy" />
                    </button>
                </div>
            </div>
        </div>
`;

    const defaultInput = document.querySelector<HTMLInputElement>("#default")!;
    const saveButton = document.querySelector<HTMLButtonElement>("#save")!;
    const saveIcon = document.querySelector<HTMLImageElement>("#save-icon")!;

    saveButton.addEventListener("click", () => {
        localStorage.setItem("defaultBang", defaultInput.value);

        saveIcon.src = "/check.svg";
        setTimeout(() => {
            saveIcon.src = "/save.svg";
        }, 2000);
    });

    const searchInput = document.querySelector<HTMLInputElement>("#search")!;
    const copyButton = document.querySelector<HTMLButtonElement>("#copy")!;
    const copyIcon = document.querySelector<HTMLImageElement>("#copy-icon")!;

    copyButton.addEventListener("click", async () => {
        await navigator.clipboard.writeText(searchInput.value);

        copyIcon.src = "/check.svg";
        setTimeout(() => {
            copyIcon.src = "/copy.svg";
        }, 2000);
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
