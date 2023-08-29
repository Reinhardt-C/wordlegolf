const fs = require("fs");

let list = fs.readFileSync("wordle.txt", "utf-8").split("\n");
list.pop();

function hammingMetric(a, b) {
    return [...a].filter((c,i)=>c!=b[i]).length;
}

let lookup = [{},{},{},{},{}];
for (let k in list) {
    const word = list[k]
    for (let i = 0; i < 5; i++) {
        if (lookup[i][word[i]] == undefined) lookup[i][word[i]] = [word];
        else lookup[i][word[i]].push(word);
    }
}

let word = list[0];
let chain = [word];
list.splice(list.indexOf(word), 1)[0];
while (list.length > 0) {
    let mindistance = 5, minword = "";
    Main: for (let i = 0; i < 5; i++) 
        for (let check of lookup[i][word[i]]) {
            if (chain.includes(check)) continue;
            let distance = hammingMetric(word, check);
            if (distance == 1) {
                minword = check;
                break Main;
            } else if (distance < mindistance) {
                mindistance = distance;
                minword = check;
            }
        }
    minword = list.splice(list.indexOf(minword), 1)[0];
    chain.push(minword);
    word = minword;
}

let output = chain[0];
for (let i = 0; i < chain.length - 1; i++) {
    let mask = [...chain[i]].map((e,j)=>e!=chain[i+1][j]?1:0).join("");
    output += String.fromCharCode(parseInt(mask, 2) + 32);
    [...mask].map((e,j) => e == "1" ? output += chain[i+1][j] : 0);
}

fs.writeFileSync("chain.txt", chain.join("\n"));
fs.writeFileSync("output.txt", output);