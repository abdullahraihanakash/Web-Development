const utilities = {}

// Hashing with 'Crypto' module to encrepet user password
import crypto from 'node:crypto';
import environment from './environment.js';

utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString)
    }
    catch {
        output = {}
    }
    return output;
}

// hash string
utilities.hash = (str) => {
   if(typeof(str) === 'string' && str.length > 0) {
    let hash = crypto.createHmac("sha256",environment.secretKey).update(str).digest("hex");
        return hash;
   }
   else {
    return false;
   }
}

// Create random string
utilities.createRandomString = (strLength) => {
    let length = strLength;
    length = typeof strLength === 'number' && strLength > 0 ? strLength : false;

    if (length) {
        const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let output = '';
        for (let i=1; i<=length; i++) {
            const randomCharacter = possibleCharacters.charAt(
                Math.floor(Math.random() * possibleCharacters.length)
            );
            output += randomCharacter;
        };
        return output;
    };
    return false;
};

export default utilities;