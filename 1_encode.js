const fs = require("fs");

const list = fs.readFileSync("wordle.txt", "utf-8").split("\n");

fs.writeFileSync("output.txt", list.join(""));
