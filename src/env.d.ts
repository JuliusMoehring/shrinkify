/// <reference types="@astrojs/image/client" />

interface ImportMetaEnv {
    readonly PUBLIC_API_URL: string;
    readonly PUBLIC_BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
