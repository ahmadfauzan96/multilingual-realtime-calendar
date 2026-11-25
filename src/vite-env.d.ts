/// <reference types="vite/client" />

interface ViteTypeOptions {
  /** The title of the application. */
  readonly VITE_APP_TITLE: string;
  //   strictImportMetaEnv: true;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_APP_AUTHOR: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_BUILD_DATE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
