/** Command-line tool to generate Markov text. */

const markov = require('./markov');
const fs = require('fs');
const axios = require('axios');
const process = require('process');

// Generates the markov chain
function generateMarkov(text){
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

// reads the file or throws an error id not found
function readFile(file){
  fs.readFile(file, "utf8", function(error, data){
    if (error){
      console.error(error, ` cannot read ${file}`);
    }else{
      generateMarkov(data);
    }
  });
}

// makes an axios call to the url or throws an error if not found
async function readUrl(url){
  let response;
  try{
    response =  await axios.get(url);
  }catch{
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  generateMarkov(response.data)
}


// decides if what was passed into the command line was a file or url
// calls the correct function to read that file or url and make a markov chain
if(process.argv[2] === 'file'){
  readFile(process.argv[3]);
}

else if(process.argv[2] === 'url'){
  readUrl(process.argv[3]);
}

else{
  console.error(`unknown ${process.argv[3]}`);
  process.exit(1);
}