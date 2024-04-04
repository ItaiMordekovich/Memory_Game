import { random, shuffle } from './utils.js'

export function createGameImageArray(n) {

    let numPairs = n / 2;
    let arr = [];
    while (arr.length < numPairs) {
        const index = random(1, 22);
        const src = `images/pic${index}.webp`;
        if (!arr.includes(src)) {
            arr.push(src);
        }
    }

    arr = arr.concat(arr);
    arr = shuffle(arr);

    return arr;
}