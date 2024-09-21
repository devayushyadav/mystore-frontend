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


export const generateBase64String = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        resolve(reader.result); // Resolve with the Base64 string
      };
  
      reader.onerror = (error) => {
        reject(error); // Reject if there's an error
      };
    });
  };
  
