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

    Translate(key) {
        let key_index = this.Keys.findIndex((element) => element == key);

        return this.Values[key_index];
    }
}

var conDict = new Dictionary();

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
    let translation = conDict.Translate(word);

    let output = document.getElementById("output");
    output.innerText = translation;
}

function getTranslation() {

}