import { DataConversion } from "./dataConversion.js";
import { Heap } from "./heap.js";

const divider = '=';

function getCharFrequency(text) {
    const freq = new Map();

    for (const char of text) {
        const count = freq.get(char);
        freq.set(char, count ? count + 1 : 1);
    }

    return Array.from(freq);
}

function getTree(freq) {
    const heap = new Heap();
    for (const [char, weight] of freq) {
        heap.add(new TreeNode(char, weight, null, null));
    }
    while (heap.length > 1) {
        const left = heap.remove();
        const right = heap.remove();
        const parent = new TreeNode('', left?.weight + right?.weight, left, right);
        heap.add(parent);
    }
    return heap.peek();
}

function getCharCodesFromTree(tree) {
    const codes = new Map();
    getCodes(tree, (char, code) => {
        codes.set(char, code);
    }, '');
    return codes;
}

function getCodes(tree, cb, code) {
    if (!tree) {
        return;
    }

    if (!tree.left && !tree.right) {
        cb(tree.char, code);
        return;
    }

    getCodes(tree.left, cb, code + '0');
    getCodes(tree.right, cb, code + '1');
}

function getHuffmanTableFromTree(tree) {
    let last = rightMostChar(tree);
    let table = last;

    function rightMostChar(tree) {
        while (tree.right) {
            tree = tree.right;
        }
        return tree.char;
    }

    function dfs(tree) {

        if (!tree.left && !tree.right) {
            table += tree.char;
            last = tree.char;
            return;
        }
        table += last;
        dfs(tree.left);
        dfs(tree.right);
    }

    dfs(tree);
    table = encodeURIComponent(table)
    return table;
}

function getTreeFromHuffmanTable(text) {
    text = decodeURIComponent(text)
    let index = 1;

    function dfs() {
        if (index >= text.length) {
            return null;
        }

        if (text[index] !== text[index - 1]) {
            return new TreeNode(text[index++], null);
        }
        index++;
        return new TreeNode('', null, dfs(), dfs());
    }

    return dfs();
}

function getText(binString, tree) {
    let curTree = tree;
    let text = '';
    for (const char of binString) {
        if (char === '0') {
            curTree = curTree.left;
        }
        else {
            curTree = curTree.right;
        }
        if (!curTree.left && !curTree.right) {
            text += curTree.char;
            curTree = tree;
        }
    }
    return text;
}

class TreeNode {
    constructor(char = '', weight = null, left = null, right = null) {
        this.char = char;
        this.weight = weight;
        this.left = left;
        this.right = right;
    }
}

export function encode(data) {
    const dataConversion = new DataConversion();
    const jsonString = JSON.stringify(data);
    // data = encodeURI(data)
    const freqArr = getCharFrequency(jsonString);
    const tree = getTree(freqArr);
    const codes = getCharCodesFromTree(tree);
    const table = getHuffmanTableFromTree(tree);
    let binaryString = '';
    for (const char of jsonString) {
        binaryString += codes.get(char);
    }
    const text = dataConversion.binaryToChar(binaryString);
    const encodedData = `${text}${divider}${table}`;
    const encodeLength = binaryString.length;
    const dataLength = jsonString.length * 8;
    const compression_ratio = (encodeLength * 100 / dataLength);
    return {
        encodedData,
        unique_letters: freqArr.length,
        binaryEnocded: binaryString,
        compression_ratio,
        huffman_tree: tree,
        huffman_codes: codes,
        frequency_array: freqArr
    };
}

export function decode(data) {
    const dataConversion = new DataConversion();
    const index = data.indexOf(divider);
    const text = data.substring(0, index);
    const table = data.substring(index + 1, data.length);
    const binaryString = dataConversion.charToBinary(text);
    const tree = getTreeFromHuffmanTable(table);
    let result = getText(binaryString, tree);
    // result = decodeURI(result);
    result = JSON.parse(result)
    return result;
}