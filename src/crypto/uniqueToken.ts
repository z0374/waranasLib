let counter = 0;
let lastTimestamp = 0;

export function generateUniqueToken() {
  let now = Date.now();

  if (now === lastTimestamp) {
    counter++;
  } else {
    counter = 0;
    lastTimestamp = now;
  }

  const randomPart = Math.floor(Math.random() * 900) + 100;
  const tokenString = `${now}${String(counter).padStart(2, '0')}${randomPart}`;

  return Number(tokenString);
}
