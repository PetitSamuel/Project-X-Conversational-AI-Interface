const http = require('http');
const fs = require('fs');
const readline = require('readline');
const hostname = '127.0.0.1';
const port = 3000;
var fileInput = "input.csv";


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

fs.writeFile('output.md', " ", function(err){
  if (err) throw err;
}) // Clear file on launch
var inputArray = fs.readFileSync(fileInput).toString().split("\n"); //splits CSV by each line

var titlePos = determineFormatting(inputArray[0])


var titlesWritten = [];
for(i = 1; i < inputArray.length; i++){
   if(inputArray[i].toString().trim().includes('"')){var lineSelected = inputArray[i].toString().split('",')}
   else{ var lineSelected = inputArray[i].toString().split(",");}
   var title = lineSelected[titlePos].toString().trim();
   if(!titlesWritten.includes(title)){
   titlesWritten.push(title);
   var textArray = [];
   for(j = i + 1; j < inputArray.length; j++){
      if(inputArray[j].toString().trim().includes('"')){ var lineSearch = inputArray[j].toString().split('",')}
      else{var lineSearch = inputArray[j].toString().split(",")}
      if(lineSearch[titlePos].toString().trim() == title){
        textArray.push(lineSearch[titlePos - 1])
      }
   }
   writeArrayToFile(title, textArray);
  }
}


function determineFormatting(firstLine){
  var firstLineArray = firstLine.toString().split(",");
  for(i = 0; i < firstLineArray.length; i++){
    if(firstLineArray[i].toUpperCase().trim() === "Intent".toUpperCase().trim() || firstLineArray[i].toUpperCase().trim() === "Entity".toUpperCase().trim()){
      return i;
    }
  }
}


function writeArrayToFile(title, array){
  var outputString = "\n### " + title;
  for(i = 0; i < array.length; i++) outputString += "\n* "+array[i];
  outputString += "\n" 

  fs.appendFile('output.md', outputString, function (err) {
    if (err) throw err;
  })
}




