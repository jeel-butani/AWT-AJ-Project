class ObjectId {
    constructor(timestamp, counter, randomValue1, randomValue2) {
        this.timestamp = timestamp;
        this.counter = counter;
        this.randomValue1 = randomValue1;
        this.randomValue2 = randomValue2;
    }

    toHexString() {
        const hexString = [
            this.timestamp.toString(16).padStart(8, '0'),
            this.randomValue1.toString(16).padStart(6, '0'),
            this.randomValue2.toString(16).padStart(4, '0'),
            this.counter.toString(16).padStart(6, '0')
        ].join('');
        return hexString;
    }

    static createFromHexString(hexString) {
        if (!ObjectId.isValid(hexString)) {
            throw new Error('Invalid ObjectId hex string');
        }
        const parts = [
            hexString.substr(0, 8),
            hexString.substr(8, 6),
            hexString.substr(14, 4),
            hexString.substr(18, 6)
        ];
        const [timestamp, randomValue1, randomValue2, counter] = parts.map(part => parseInt(part, 16));
        return new ObjectId(timestamp, counter, randomValue1, randomValue2);
    }

    static isValid(hexString) {
        return /^[0-9a-fA-F]{24}$/.test(hexString);
    }
}