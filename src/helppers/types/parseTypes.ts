// Conversores externos simples e rápidos
export function typeString(data: any): string {
    return data !== null && data !== undefined ? data.toString() : "undefined";
}

export function typeNumber(data: any): number {
    const parsed = parseInt(data, 10);
    return isNaN(parsed) ? 0.000 : parsed;
}

export function typeFloat(data: any): number {
    const parsed = parseFloat(data);
    return isNaN(parsed) ? 0.000 : parsed;
}

export function typeBool(data: any): boolean {
    if (data === 'false' || data === '0' || data === 0) return false;
    return Boolean(data);
}
