//Simple ts implementation of a Trie Structure for searching prefixes in a set of words;

const strs: string[] = ["correlation","cooperative","coordinate"];

class Tnode {
    key: string;
    paths: Tnode[];
    value: string | null;
    uniqueChild: number | null;
    length: number;

    constructor(key: string) {
        this.key = key;
        this.paths = [];
        this.value = null;
        this.uniqueChild = null;
        this.length = 0;
    }

    add(word: string) {
        let currentNode: Tnode = this;
        if (word == "") { word = " " }
        for (let i = 0; i < word.length; i++) {
            let index = word[i].charCodeAt(0) - 97;
            let char = String.fromCharCode(97 + index);
            //console.log(`added ${char} in index: ${index}`)

            if (currentNode.paths[index] == null) {
                currentNode.paths[index] = new Tnode(char);
                currentNode.length++;
                currentNode.uniqueChild = currentNode.length == 1 ? index : null;
                currentNode = currentNode.paths[index];
                if (word[i + 1] == null) {
                    currentNode.value = word;
                }
            } else {
                currentNode = currentNode.paths[index];
                if (word[i + 1] == null) {
                    currentNode.value = word;
                    //console.log(`setting value char ${currentNode.key} to ${currentNode.value}`)
                }
            }
        }

    }
    search(word: string): Tnode | null {
        let currentNode: Tnode = this;
        let exists: boolean = false;

        for (let i = 0; i < word.length; i++) {
            let index = word[i].charCodeAt(0) - 97;
            let char = String.fromCharCode(97 + index);
            if (currentNode.paths[index] == null) {
                break;
            } else {
                currentNode = currentNode.paths[index];
                if (word[i + 1] == null) {
                    if (currentNode.value === word) {
                        exists = true;

                    }
                }
            }
        }
        return currentNode;
    }


    searchPrefix(): string {
        let prefix = "";
        let currentNode: Tnode = this;
        let locked = false;
        let closerToRootPrx: Tnode | null = null;

        while (true) {

            if (currentNode.uniqueChild != null) { // If it doesn't biffurcate
                prefix += currentNode.key; //Add letter to prefix
                currentNode = currentNode.paths[currentNode.uniqueChild] // Go to the next node
                if (!locked && currentNode.value != null) { // If the node closer to root has a value save it and loock it,
                    closerToRootPrx = currentNode;
                    locked = true;
                }
            } else {//If it biffurcates
                prefix += currentNode.key
                
                if (closerToRootPrx && closerToRootPrx.value) {
                    console.log(`Overwriting prefix to ${closerToRootPrx.value}`)
                    prefix = closerToRootPrx.value;

                }
                break;
            }

            //If we reach the end and there is biffucation take the node's prefix that is closer to root
            if (currentNode.paths.length < 1) { //If the bottom is reached
                console.log("Reach bottom with no biffurcation");
                console.log(closerToRootPrx?.value)
                if (closerToRootPrx && closerToRootPrx.value) {
                    console.log(`Overwriting prefix to ${closerToRootPrx.value}`)
                    prefix = closerToRootPrx.value;

                }
                break;
            }
        }
        console.log(prefix == " " ? "" : prefix)
        return prefix == " " ? "" : prefix;
    }
}

const root = new Tnode("");

let trns = root;

for (let i = 0; i < strs.length; i++) {
    trns.add(strs[i])
}

//console.log(trns.search("flow")?.uniqueChild)
trns.searchPrefix();


//var chr = String.fromCharCode(97 + 0);
//var num = "a".charCodeAt(0)