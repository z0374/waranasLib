export interface SleepFetchData {
  dt: number;
  run: boolean;
}

export async function sleepFetch(
  name: string,
  timeUpdate: number,
  env: KVNamespace,
): Promise<SleepFetchData> {
  const key = name + "SleepFetch";
  const now = Date.now();

  const stored = await env.get(key);

  if (!stored) {
    const data: SleepFetchData = {
      dt: now + timeUpdate,
      run: true,
    };

    await env.put(key, JSON.stringify(data));
    return data;
  }

  let data: SleepFetchData;

  try {
    data = JSON.parse(stored);
  } catch {
    data = {
      dt: now + timeUpdate,
      run: true,
    };

    await env.put(key, JSON.stringify(data));

    return data;
  }

  if (now >= data.dt) {
    data = {
      dt: now + timeUpdate,
      run: true,
    };

    await env.put(key, JSON.stringify(data));

    return data;
  }

  return {
    dt: data.dt,
    run: false,
  };
}
