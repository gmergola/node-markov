const markov = require('./markov')

describe("markov tests", function(){
  let mm;
  
  beforeEach(function (){
    mm = new markov.MarkovMachine('I would not like them I do not like them I would not like them')
  })
  
  test('returns an object from makeChains', function(){
    expect(mm.makeChains()).toEqual({I: [ 'would', 'do' ],
                                      would: [ 'not' ],
                                      not: [ 'like' ],
                                      like: [ 'them' ],
                                      them: [ 'I', undefined ],
                                      do: [ 'not' ]
                                    })
  })

  test("makeText returns a string with less than or equal to numWords amout of words",
  function(){
    expect(mm.makeText(10).split(' ').length <= 10).toBe(true)
  })
})