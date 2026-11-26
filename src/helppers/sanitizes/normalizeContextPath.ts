export function normalizeContextPath(contextPath?: string): string {
  if (!contextPath) return "";
  const cleaned = contextPath.trim().replace(/^\/+|\/+$/g, "");
  return cleaned ? `/${cleaned}` : "";
}