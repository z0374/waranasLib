import type { cachePAGE } from "../core/interface/intenface.index";

export function cachePage({
  title = "",
  content = "",
  mode = 0,
  forc_update = false,
}: cachePAGE) {
  const page: cachePAGE = {
    title,
    content,
    mode,
    forc_update,
  };
}
