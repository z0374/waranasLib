export async function getContentSVG(url: string): Promise<string | null> {
  try {
    // 1. Força o servidor a entender que queremos um SVG ou texto
    const response = await fetch(url, {
      headers: {
        Accept: "image/svg+xml, text/plain, text/html, application/xml",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to load SVG from ${url}: ${response.statusText}`);
    }

    // 2. Transforma em buffer e decodifica para forçar a leitura como texto UTF-8
    const arrayBuffer = await response.arrayBuffer();
    const decoder = new TextDecoder("utf-8");
    const svgText = decoder.decode(arrayBuffer);

    return svgText;
  } catch (error) {
    console.error("Error loading SVG string:", error);
    return null;
  }
}
