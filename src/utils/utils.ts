export const objectToString = (obj: { [key: string]: string | number | boolean }): string => {
    let str = "";
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            str += encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]) + ";";
        }
    }
    return str;
};

export const stringToObject = (str: string): { [key: string]: string | number | boolean } => {
    const obj: { [key: string]: string | number | boolean } = {};
    const pairs = str.split(';');

    pairs.forEach(pair => {
        if (pair) { // Ignore empty strings
            const [key, value] = pair.split('=');
            obj[decodeURIComponent(key)] = decodeURIComponent(value);
        }
    });

    return obj;
};
