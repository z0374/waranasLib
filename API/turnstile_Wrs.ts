import type {
  TurnstileSiteverifyResult,
  TurnstileVerifyInput,
} from "../interface/turnstile";

export async function turnstile_Wrs(
  request: Request,
  secretOrToken: string
): Promise<Response> {
  const keyOrToken = (secretOrToken ?? "").trim();

  let bodyToken = "";
  if (request.method !== "GET" && request.method !== "HEAD") {
    try {
      const body = (await request.json()) as Partial<TurnstileVerifyInput> & {
        token?: string;
      };
      if (typeof body?.token === "string") {
        bodyToken = body.token.trim();
      }
    } catch {
      bodyToken = "";
    }
  }

  const url = new URL(request.url);
  const queryToken = (url.searchParams.get("token") ?? "").trim();
  const resolvedToken = bodyToken || queryToken || keyOrToken;

  if (!keyOrToken || !resolvedToken) {
    const missingResult: TurnstileSiteverifyResult = {
      success: false,
      "error-codes": [!keyOrToken ? "missing-secret-or-token" : "missing-input-response"],
    };

    return new Response(JSON.stringify(missingResult), {
      status: 400,
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });
  }

  const params = new URLSearchParams({
    secret: keyOrToken,
    response: resolvedToken,
  });

  const verifyResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    }
  );

  if (!verifyResponse.ok) {
    const httpErrorResult: TurnstileSiteverifyResult = {
      success: false,
      "error-codes": [`http-${verifyResponse.status}`],
    };

    return new Response(JSON.stringify(httpErrorResult), {
      status: 502,
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });
  }

  const data = (await verifyResponse.json()) as TurnstileSiteverifyResult;

  return new Response(JSON.stringify(data), {
    status: data.success ? 200 : 403,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  });
}
