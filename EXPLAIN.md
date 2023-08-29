[1_decode.js](https://github.com/Reinhardt-C/wordlegolf/blob/main/1_decode.js) - Naive
Join all the words and parse into groups of 5.

[2_decode.js](https://github.com/Reinhardt-C/wordlegolf/blob/main/2_decode.js) - Index
Awful indexing based on prefixes.

[3_decode.js](https://github.com/Reinhardt-C/wordlegolf/blob/main/3_decode.js) - Hamming
Creates a reordering of the list that does a terrible job of minimising the Hamming distance between adjacent elements. Encodes each word in terms of the previous word and which positions need to be modified. Quite efficient at the start of the list, dreadful at the end.
