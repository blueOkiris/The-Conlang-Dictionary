class Dictionary {
    constructor() {
        this.Keys = [];
        this.Values = [];
    }

    Add(key, value) {
        this.Keys.push(key);
        this.Values.push(value);
    }

    Remove(key) {
        let key_index = this.Keys.findIndex((element) => element == key);

        this.Keys.splice(key_index, 1);
        this.Values.splice(key_index, 1);
    }

    Translate(key, closest) {
        let ret_translation = "";
        
        if(!closest) { // Find all exact matches
            let key_index = this.Keys.findIndex((element) => element == key);

            let i = key_index + 1;
            while(key_index != -1) {
                ret_translation += ", " + this.Values[key_index];
                
                key_index = this.Keys.findIndex((element, index) => element == key && index >= i);
                i = key_index + 1;
            }

            return ret_translation.substring(2);
        } else { // Find closest word to match
            ret_translation += "Closest matches: ";

            let i = 0;
            let distances = this.Keys.map((element) => LevensteinDistance(key, element));
            let minInd = 0;
            let minimum = distances.reduce((prev, dist, index) => {
                if(index >= i) {
                    minInd = dist < prev ? index : minInd;
                    return   dist < prev ? dist : prev
                }

                minInd = -1;
                return -1;
            });

            i = minInd + 1;
            while(minInd != -1) {
                ret_translation += "\n\t(" + this.Keys[minInd] + " => " + this.Values[minInd] + ")";

                minimum = distances.reduce((prev, dist, index) => {
                    if(index >= i) {
                        minInd = dist < prev ? index : minInd;
                        i = minInd + 1;

                        return   dist < prev ? dist : prev
                    }
    
                    minInd = -1;
                    return -1;
                });
            }
            
            return ret_translation;
        }
    }

    ReverseTranslate(value, closest) {
        let ret_translation = "";
        
        if(!closest) { // Find all exact matches
            let key_index = this.Values.findIndex((element) => element == value);

            let i = key_index + 1;
            while(key_index != -1) {
                ret_translation += ", " + this.Keys[key_index];
                
                key_index = this.Values.findIndex((element, index) => element == value && index >= i);
                i = key_index + 1;
            }

            return ret_translation.substring(2);
        } else { // Find closest word to match
            ret_translation += "Closest matches: ";

            let i = 0;
            let distances = this.Values.map((element) => LevensteinDistance(value, element));
            let minInd = 0;
            let minimum = distances.reduce((prev, dist, index) => {
                if(index >= i) {
                    minInd = dist < prev ? index : minInd;
                    return   dist < prev ? dist : prev
                }

                minInd = -1;
                return -1;
            });

            i = minInd + 1;
            while(minInd != -1) {
                ret_translation += "\n\t(" + this.Values[minInd] + " => " + this.Keys[minInd] + ")";

                minimum = distances.reduce((prev, dist, index) => {
                    if(index >= i) {
                        minInd = dist < prev ? index : minInd;
                        i = minInd + 1;

                        return   dist < prev ? dist : prev
                    }
    
                    minInd = -1;
                    return -1;
                });
            }
            
            return ret_translation;
        }
    }
}

var conDict = new Dictionary();

function LevensteinDistance(input, comp) {
    let n = input.length;
    let m = comp.length;
    let dist = [];
    for(let i = 0; i < n + 1; i++) {
        let row = [];
        for(let j = 0; j < m + 1; j++)
            row.push(0);
        dist.push(row);
    }

    // Step 1
    if (n == 0)
        return m;
    if (m == 0)
        return n;

    // Step 2
    for (let i = 0; i <= n; dist[i][0] = i++);
    for (let i = 0; i <= m; dist[0][i] = i++);

    // Step 3
    for (let i = 1; i <= n; i++) {
        //Step 4
        for (let j = 1; j <= m; j++) {
            // Step 5
            let cost = (comp[j - 1] == input[i - 1]) ? 0 : 1;

            // Step 6
            dist[i][j] = Math.min(Math.min(dist[i - 1][j] + 1, dist[i][j - 1] + 1), dist[i - 1][j - 1] + cost);
        }
    }

    // Step 7
    return dist[n][m];
}

function readDict(event) {
    let input = event.target;
    let reader = new FileReader();

    reader.onload = function() {
        conDict = new Dictionary();

        let text = reader.result;
        let lines = text.split(/[\r\n]+/);

        for(let i = 0; i < lines.length; i++) {
            let keyValPair = lines[i].split(/,/);
            conDict.Add(keyValPair[0], keyValPair[1]);

            console.log(keyValPair[1] + " == " + conDict.Translate(keyValPair[0]));
        }
    };

    reader.readAsText(input.files[0]);
}

function getWords() {
    let word = document.getElementById("tb_toConlang").value;
    let translation = "";

    if(word[0] == ":")
        translation = conDict.Translate(word.substring(1), true);
    else
        translation = conDict.Translate(word, false);

    let output = document.getElementById("output");
    output.innerText = translation;
}

function getTranslation() {
    let word = document.getElementById("tb_fromConlang").value;
    let translation = "";

    if(word[0] == ":")
        translation = conDict.ReverseTranslate(word.substring(1), true);
    else
        translation = conDict.ReverseTranslate(word, false);

    let output = document.getElementById("output");
    output.innerText = translation;
}