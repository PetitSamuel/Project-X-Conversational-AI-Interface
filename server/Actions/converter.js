const fs = require('fs');

function convertCsvToMd(fileInput, outputFile) {
    var inputArray = fs.readFileSync(fileInput).toString().split("\n"); //splits CSV by each line
    let titlePos = determineFormatting(inputArray[0])
    let titlesWritten = [];
    let finalString = '';
    for (i = 1; i < inputArray.length; i++) {
        if (inputArray[i].toString().trim().includes('"')) { var lineSelected = inputArray[i].toString().split('",') }
        else { var lineSelected = inputArray[i].toString().split(","); }
        let title = lineSelected[titlePos].toString().trim();
        if (!titlesWritten.includes(title)) {
            titlesWritten.push(title);
            let textArray = [];
            for (j = i + 1; j < inputArray.length; j++) {
                if (inputArray[j].toString().trim().includes('"')) { var lineSearch = inputArray[j].toString().split('",') }
                else { var lineSearch = inputArray[j].toString().split(",") }
                if (lineSearch[titlePos].toString().trim() == title) {
                    textArray.push(lineSearch[titlePos - 1])
                }
            }
            finalString += arrayToLine(title, textArray);
        }
    }
    fs.writeFile(outputFile, finalString, function(err){
        if (err) return false;
      }) // Clear file on launch
    return true;
}

function determineFormatting(firstLine) {
    let firstLineArray = firstLine.toString().split(",");
    for (i = 0; i < firstLineArray.length; i++) {
        if (firstLineArray[i].toUpperCase().trim() === "Intent".toUpperCase().trim() || firstLineArray[i].toUpperCase().trim() === "Entity".toUpperCase().trim()) {
            return i;
        }
    }
}

function arrayToLine(title, array) {
    let outputString = "\n### " + title;
    for (i = 0; i < array.length; i++) outputString += "\n* " + array[i];
    outputString += "\n"

    return outputString;
}

module.exports = {
    convertCsvToMd: convertCsvToMd,
}