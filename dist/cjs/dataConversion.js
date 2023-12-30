const defaultCharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

module.exports = class DataConversion {
    constructor(charSet = defaultCharSet) {
        this.charSet = charSet;
        this.base = Math.floor(Math.log2(charSet.length));
    }
    binaryToChar(binaryString) {
        const mod = binaryString.length % this.base;
        const extra = this.base && (this.base - mod);
        binaryString += '0'.repeat(extra);
        let base64 = `${extra}`;
        for (let i = 0; i < binaryString.length; i += this.base) {
            const num = parseInt(binaryString.substring(i, i + this.base), 2);
            base64 += this.charSet[num];
        }
        return base64;
    }
    charToBinary(charString) {
        const extra = parseInt(charString[0]);
        let text = '';
        for (let i = 1; i < charString.length; i++) {
            const charNum = this.charSet.indexOf(charString[i]);
            const value = charNum.toString(2).padStart(this.base, '0');
            text += value;
        }
        return text.substring(0, text.length - extra);
    }
}