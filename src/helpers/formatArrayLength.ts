export function formatArrayLength<T>(array: (T | undefined)[], length: number) {
    const newArray = array.slice(0, length);

    while (newArray.length < length) {
        newArray.push(undefined);
    }

    return newArray;
}
