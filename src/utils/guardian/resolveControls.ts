import type { GuardianControls, GuardianControlsObject } from "../../interfaces/guardian";

export function resolveControls<TValidPage = unknown, TInvalidPage = unknown>(
  controls?: GuardianControls<TValidPage, TInvalidPage>
): GuardianControlsObject<TValidPage, TInvalidPage> {
  if (!controls) return {};
  if (Array.isArray(controls)) {
    return { items: controls };
  }
  return controls;
}
