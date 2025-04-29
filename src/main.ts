import { bangs } from "./bangs";

const defaultBang = localStorage.getItem("defaultBang") ?? "ddg";

const homePage = () => {
    document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
        <label class="uk-form-label" for="default">Default Bang</label>
        <div class="flex gap-1">
            <input id="default" class="uk-input w-80" type="text" value="${defaultBang}" />
            <button id="save" class="uk-btn uk-btn-default uk-btn-icon" title="Save">
                <uk-icon id="save-icon" icon="save"></uk-icon>
            </button>
        </div>

        <label class="uk-form-label" for="search">Search URL</label>
        <div class="flex gap-1">
            <input id="search" class="uk-input w-80" type="text" value="https://bang-search.pages.dev?q=%s" disabled />
            <button id="copy" class="uk-btn uk-btn-default uk-btn-icon" title="Copy">
                <uk-icon id="copy-icon" icon="copy"></uk-icon>
            </button>
        </div>
`;

    const defaultInput = document.querySelector<HTMLInputElement>("#default")!;
    const saveButton = document.querySelector<HTMLButtonElement>("#save")!;
    const saveIcon = document.querySelector("#save-icon")! as any;

    saveButton.addEventListener("click", () => {
        localStorage.setItem("defaultBang", defaultInput.value);

        saveIcon.icon = "check";
        setTimeout(() => {
            saveIcon.icon = "save";
        }, 2000);
    });

    const searchInput = document.querySelector<HTMLInputElement>("#search")!;
    const copyButton = document.querySelector<HTMLButtonElement>("#copy")!;
    const copyIcon = document.querySelector("#copy-icon")! as any;

    copyButton.addEventListener("click", async () => {
        await navigator.clipboard.writeText(searchInput.value);

        copyIcon.icon = "check";
        setTimeout(() => {
            copyIcon.icon = "copy";
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

    if (cleanQuery === "")
        return selectedBang ? `${new URL(selectedBang).origin}` : null;

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
