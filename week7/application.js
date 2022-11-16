const fs = require("fs");
const rs = fs.createReadStream("test2.ndjson");
const ws = fs.createWriteStream("filteredData.ndjson");
const { pipeline, Transform } = require("stream");
const ndjson = require("ndjson");
const afinn = require("./AFINN.json");
const sort = require("sort-stream2")

const filterSpam = new Transform({
    objectMode: true,
    transform: function (chunk, enc, push) {
        if (chunk.class === 0) {
            push(null, chunk);
        } else {
            push(null);
        }
    }
})

const checkPositivity = new Transform({
    objectMode: true,
    transform: function (chunk, enc, push) {
        const afinnObj = JSON.parse(JSON.stringify(afinn));
        if (chunk.reviewText != null) {
            let score = 0;
            chunk.reviewText.split(" ").forEach((element) => {
                const pureText = element.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
                if (afinnObj[pureText] != null) {
                    score += parseInt(afinnObj[pureText]);
                }
            });
            chunk.score = score;
            push(null, chunk);
        } else {
            push(null);
        }
    }
})

const stringfyStream = new Transform({
    objectMode: true,
    transform: function (chunk, enc, push) {
        if (chunk != null) {
            push(null, JSON.stringify(chunk));
        } else {
            push(null);
        }
    },
});


pipeline(
    rs,
    ndjson.parse(),
    filterSpam,
    checkPositivity,
    sort(function (a, b) { return a.score - b.score }),
    stringfyStream,
    ws,
    //.on('data', function (chunk) { console.log(chunk); }),
    function (err) { console.log(`err:${err}`) }
);