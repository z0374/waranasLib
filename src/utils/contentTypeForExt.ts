export function contentTypeForExt(contentType: string): string {
  const mime = contentType.split(";")[0].trim().toLowerCase();

  if (mime === "text/plain") {
    return "textString";
  }

  if (mime === "image/svg+xml") {
    return "svg";
  }

  if (mime.startsWith("image/")) {
    return mime
      .substring("image/".length)
      .replace("+xml", "")
      .replace("jpeg", "jpg");
  }

  const [, subtype = "bin"] = mime.split("/");

  return subtype.replace("+xml", "").replace(/[^a-z0-9]/g, "");
}
