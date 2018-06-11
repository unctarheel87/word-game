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
const wordPickArr = wordPick.split('');
const correctResponses = [];
const wrongLetter = [];

for(let i = 0; i < wordPickArr.length; i++) {
  wordPickArr[i] === ' ' ? correctResponses.push(' ') : correctResponses.push('_')
}
    super(props)
    this.state = {
      wordLogic: correctResponses,
      wrongLetter:[]
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
  
  if(wordPickArr.indexOf(keyName) === -1 && wrongLetter.includes(keyName) === false) {
    wrongLetter.push(keyName)
  }
  
  this.setState((prevState) => {
    return {
      wordLogic: correctResponses,
      wrongLetter: wrongLetter
    }
  })
  
  console.log(duplicates)
  console.log(correctResponses);

  if(wordPickArr.join() === correctResponses.join()) {
    alert("You win!")
  } else if(wrongLetter.length === 9) {
    alert("You Lose")
  }
});

}

render() {
    return (
      <div className="App">
       {this.state.wordLogic.map((letter) => {
         return <p>{letter}</p>
       })}
      <h2>{this.state.wrongLetter}</h2>
      <Canvas wrongLetter={this.state.wrongLetter} />
      </div>
    );
  }

}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
      
      ctx.beginPath();
      ctx.moveTo(10,310);
      ctx.lineWidth = 5;
      ctx.lineTo(180,310);
      ctx.stroke();
  }
  
  componentDidUpdate() {
   
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
      
    ctx.beginPath();
    ctx.moveTo(10,310);
    ctx.lineWidth = 5;
    ctx.lineTo(180,310);
      
    const vertices = [
        {x:90, y:310},
        {x:90, y:62},
        {x:182, y:62},
        {x:182, y:109},
        {x:182, y:172},
        {x:182, y:240},
        {x:162, y:270},
        {x:182, y:240},
        {x:202, y:270},
        {x:182, y:200},
        {x:162, y:215},
        {x:182, y:200},
        {x:202, y:215}
      ]
      
      const radians = [
        {r0: 0},
        {r1: 2*Math.PI}
      ]
      
      //animate logic
      if(this.props.wrongLetter.length === 1) {
        animateLineDraw(vertices.filter((point, index) => {
          return index < 2;
        }))
      }
      if(this.props.wrongLetter.length === 2) {
        animateLineDraw(vertices.filter((point, index) => {
          return index < 3 && index > 0;
        }))
      }
      if(this.props.wrongLetter.length === 3) {
        animateLineDraw(vertices.filter((point, index) => {
          return index < 4 && index > 1;
        }))
      }
      if(this.props.wrongLetter.length === 4) {
        animateDrawArc(radians,182,140,25)
      }
      if(this.props.wrongLetter.length === 5) {
        animateLineDraw(vertices.filter((point, index) => {
          return index < 6 && index > 3;
        }))
      }
      if(this.props.wrongLetter.length === 6) {
        animateLineDraw(vertices.filter((point, index) => {
          return index < 7 && index > 4;
        }))
      }
      if(this.props.wrongLetter.length === 7) {
        animateLineDraw(vertices.filter((point, index) => {
          return index < 9 && index > 6;
        }))
      }
      if(this.props.wrongLetter.length === 8) {
        animateLineDraw(vertices.filter((point, index) => {
          return index < 11 && index > 8;
        }))
      }
      if(this.props.wrongLetter.length === 9) {
        animateLineDraw(vertices.filter((point, index) => {
          return index < 13 && index > 10;
        }))
      }
      
      //animation functions
      function animateLineDraw(vertices) {
      const wayPoints = [ ]
      for(let i = 1; i < vertices.length; i++) {
        //find distance between each point
        const pt1 = vertices[i-1];
        const pt2 = vertices[i];
        const dx = pt2.x - pt1.x;
        const dy = pt2.y - pt1.y; 
        //create individual waypoints
          for(let n = 0; n < 100; n++) {
            const x = pt1.x + dx * n/100;
            const y = pt1.y + dy * n/100;
            wayPoints.push({x:x, y:y})
          }
        }
      let a = 1
      function draw() {
          //create Animation Frame
          if(a < wayPoints.length - 1 ) { 
            ctx.beginPath();
            ctx.lineCap = 'round';
            ctx.lineWidth = 5;
            ctx.moveTo(wayPoints[a - 1].x, wayPoints[a - 1].y);
            ctx.lineTo(wayPoints[a].x, wayPoints[a].y);
            ctx.stroke();
            a++
            requestAnimationFrame(draw) 
          }  
        }
        requestAnimationFrame(draw);
    }    

    function animateDrawArc(radians, x, y, r) {
      const wayPoints = [ ]
      for(let i = 1; i < radians.length; i++) {
        //find distance between each point
        const rd0 = radians[i-1];
        const rd1 = radians[i];
        const dr = rd1.r1 - rd0.r0;
        //create individual waypoints
          for(let n = 0; n < 100; n++) {
            const r = rd0.r0 + dr * n/100;
            wayPoints.push({rd:r})
          }
          console.log(wayPoints)
        }
      let a = 1
      function draw() {
          //create Animation Frame
          if(a < wayPoints.length - 1 ) { 
            const lineWidth = 5
            ctx.clearRect(x - r - lineWidth, y - r - lineWidth, r * 2 + lineWidth * 2, r * 2 + lineWidth * 2);
            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            ctx.arc(x,y,r,0,wayPoints[a].rd)
            ctx.stroke();
            ctx.closePath();
            a++
            requestAnimationFrame(draw) 
          }  
        }
        requestAnimationFrame(draw);
      }
    }
    
  render() {
    return(
      <div>
        <canvas ref="canvas" width={640} height={425} />
      </div>
    )
  }
}



export default App;

      // //post
      // if(this.props.wrongLetter.length === 1) {
      // ctx.moveTo(95,310);
      // ctx.lineTo(95,62);
      // ctx.stroke();
      // }
      
      // //post arm
      // if(this.props.wrongLetter.length === 2) {
      // ctx.moveTo(80,76);
      // ctx.lineTo(182.5,76);
      // ctx.moveTo(180,76);
      // ctx.lineTo(180,118);
      // ctx.stroke();
      // }
      
      // //head
      // if(this.props.wrongLetter.length === 3) {
      // ctx.beginPath(); 
      // ctx.arc(180,140,25,0,2*Math.PI);
      // ctx.stroke();
      // }
      
      // //body
      // if(this.props.wrongLetter.length === 4) {
      // ctx.beginPath();
      // ctx.moveTo(180,162);
      // ctx.lineTo(180,240);
      // ctx.stroke();
      // }
      
      // //arms
      // if(this.props.wrongLetter.length === 5) {
      // ctx.moveTo(180,200);
      // ctx.lineTo(220,220);
      // ctx.moveTo(180,200);
      // ctx.lineTo(140,220);
      // ctx.stroke();
      // }
      
      // //legs
      // if(this.props.wrongLetter.length === 6) {
      // ctx.moveTo(180,240);
      // ctx.lineTo(140,280);
      // ctx.moveTo(180,240);
      // ctx.lineTo(220,280);
      // ctx.stroke();
      // }
