// =======================================================
// WARANAS BOOTSTRAP
// =======================================================

export interface Env {
  ASSETS: KVNamespace;
  CORE: KVNamespace;
}

export * from "./core.index";

export * from "../api/api.index";
export * from "../utils/utils.index";
export * from "../database/database.index";
export * from "../components/components.index";
