/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // loop words, make object
    let markovObj = {}
    for(let i = 0; i < this.words.length; i++){
      if(!(this.words[i] in markovObj)){
        markovObj[this.words[i]] = [this.words[i + 1]];
      }else if (!markovObj[this.words[i]].includes(this.words[i + 1])){
        markovObj[this.words[i]].push(this.words[i + 1])
      }
    }
    // console.log(markovObj);
    this.markovObj = markovObj;
    return markovObj;
  }


  /** return random text from chains */

  makeText(numWords = 100) {

    let markovChain = [this.words[0]];

    while (markovChain.length < numWords){
      let lastChar = markovChain[markovChain.length-1];
      let randomIdx = Math.floor(Math.random() * Math.floor(this.markovObj[lastChar].length));

      if(this.markovObj[lastChar][randomIdx] === undefined){
        return markovChain.join(' ')
      }
      markovChain.push(this.markovObj[lastChar][randomIdx]);
    }
    return markovChain.join(' ')
  }
}
  
module.exports = {
  MarkovMachine,
}