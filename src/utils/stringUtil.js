

export function convertToDotNotation (list) {
    return list.split(",").map(i => '.' + i).join()

}