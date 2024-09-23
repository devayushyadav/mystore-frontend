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


export const base64ToFile = (base64String :string, fileName :string, mimeType :string) => {
  // Decode the Base64 string
  const byteString = atob(base64String.split(',')[1]);

  // Create an array of 8-bit unsigned integers
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  // Assign each character's code to the buffer
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  // Create a Blob from the Uint8Array
  const blob = new Blob([uint8Array], { type: mimeType });

  // Create a File from the Blob (optional, if you need a File object instead of a Blob)
  const file = new File([blob], fileName, { type: mimeType });

  return file;
}
  
