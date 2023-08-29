const fs = require("fs");

const list = fs.readFileSync("wordle.txt", "utf-8").split("\n");

function maxPrefix(list) {
    let currentPrefix;
    for (let word of list) {
        if (currentPrefix == undefined)  currentPrefix = word;
        while (!word.startsWith(currentPrefix)) currentPrefix = currentPrefix.slice(0, -1);
    }
    return currentPrefix;
}

let buffer = [],
    data = {};
for (let word of list) {
    if (maxPrefix([...buffer, word]).length < 2) {
        const prefix = maxPrefix(buffer);
        data[prefix] = buffer.map(w => w.slice(prefix.length));
        buffer = [word];
    } else buffer.push(word);
}
data[maxPrefix(buffer)] = buffer;
delete data[''];

const output = Object.keys(data).map(p => `${p}|${data[p].join('') || ' '}`).join("\n");

fs.writeFileSync("output.txt", output);
