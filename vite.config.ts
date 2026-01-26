import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), VitePWA({ registerType: "autoUpdate" })],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
});
