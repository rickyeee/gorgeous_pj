export function encode(subscriberId: number, stateKey: string) {
    return `${subscriberId}-${stateKey}`;
}
export function decode(encoded) {
    const arr = encoded.split('-');
    return {
        key: arr[1],
        id: arr[0]
    };
}
