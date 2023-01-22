
export function lineNameToId(lineName: string): string {
    return lineName.replace("-", "").toLowerCase();
}