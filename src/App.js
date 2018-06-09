import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <h1>Word Game</h1>
       <Word />
      </div>
    );
  }
}

class Word extends Component {
  constructor(props) {
    const wordBank = {
  words: [
    {id: 0, book: 'Moby Dick'},
    {id: 1, book: 'Huckleberry Finn'},
    {id: 2, book: 'Grapes of Wrath'},
    {id: 3, book: 'Infinite Jest'}
  ]
}

const wordPick = wordBank.words[1].book.toLowerCase();
const wordPickArr = wordPick.split('')
const correctResponses = [];

for(let i = 0; i < wordPickArr.length; i++) {
  wordPickArr[i] === ' ' ? correctResponses.push(' ') : correctResponses.push('_')
}
    super(props)
    this.state = {
      wordLogic: correctResponses
    }

document.addEventListener('keypress', (event) => {
  const keyName = event.key;
  let duplicates = []
  for (let i = 0; i < wordPick.length; i++ ) {
    if (wordPickArr[i] === keyName) {
        duplicates.push(i);
    }
  }
  
  for (let i = 0; i < duplicates.length; i++) {
      correctResponses.splice(duplicates[i], 1, keyName);
  }
  
  this.setState((prevState) => {
    return {
      wordLogic: correctResponses
    }
  })
  
  console.log(duplicates)
  console.log(correctResponses);

  if(wordPickArr.join() === correctResponses.join()) {
    alert("You win!")
  }
});

}

render() {
    return (
      <div className="App">
       {this.state.wordLogic.map((letter) => {
         return <p>{letter}</p>
       })}
      </div>
    );
  }

}

export default App;
