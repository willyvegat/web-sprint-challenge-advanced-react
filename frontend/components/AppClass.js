import React from 'react';


// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  currentIndex: initialIndex,
  totalSteps: initialSteps,
  coordinateX: 2,
  coordinateY: 2,
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  state = {
      email: initialEmail,
      message: initialMessage,
      totalSteps: initialSteps,
      coordinateX: 2,
      coordinateY: 2,
      currentIndex: initialIndex
    }


  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  getXYMessage = (direction) => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    
    if (this.state.coordinateY === 1 && direction === 'up' || this.state.coordinateY === 3 && direction === 'down') {
      this.setState({
        ...this.state,
        message: `You can't go ${direction}`
      })
    } 
  }

  getNextIndex = (direction) => {
    if (direction === 'up'){
      // this.setState({
      //   ...this.state,
      //   message: initialMessage});
      this.setState({
        ...this.state,
        coordinateY: this.state.coordinateY === 1 ? this.state.coordinateY : this.state.coordinateY - 1,
        currentIndex: this.state.coordinateY === 1 ? this.state.currentIndex : this.state.currentIndex - 3,
        totalSteps: this.state.totalSteps + 1,
      })
    } else if (direction === 'down') {
      // this.setState({
      //   ...this.state,
      //   message: initialMessage});
      this.setState({
        ...this.state,
        coordinateY: this.state.coordinateY === 3 ? this.state.coordinateY : this.state.coordinateY + 1,
        currentIndex: this.state.coordinateY === 3 ? this.state.currentIndex : this.state.currentIndex + 3,
        totalSteps: this.state.totalSteps + 1
      })
      } else if (direction === 'left') {
      // console.log('left');
      this.setState({
        ...this.state,
        coordinateX: this.state.coordinateX === 1 ? this.state.coordinateX : this.state.coordinateX - 1,
        currentIndex: this.state.coordinateX === 1 ? this.state.currentIndex : this.state.currentIndex - 1,
        totalSteps: this.state.totalSteps + 1
      })
      } else if (direction === 'right') {
        // console.log('right');
        this.setState({
          ...this.state,
          coordinateX: this.state.coordinateX === 3 ? this.state.coordinateX : this.state.coordinateX + 1,
          currentIndex: this.state.coordinateX === 3 ? this.state.currentIndex : this.state.currentIndex + 1,
          totalSteps: this.state.totalSteps + 1
        })
      }
      this.getXYMessage(direction)
  } 

  reset = () => {
    this.setState(initialState)
  } 

  onChange = (evt) => {
    // You will need this to update the value of the input.
    const { value } = evt.target;
    // console.log(value)
    this.setState({
      ...this.state,
      email: value
    })
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
  }

    // move = (evt) => {
  //   // This event handler can use the helper above to obtain a new index for the "B",
  //   // and change any states accordingly.
    
  // }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.state.coordinateX}, ${this.state.coordinateY})`}</h3>
          <h3 id="steps">{`You moved ${this.state.totalSteps} times`}</h3>
        </div>
        <div id="grid">
          { 
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.currentIndex ? ' active' : ''}`}>
                {idx === this.state.currentIndex ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={() => this.getNextIndex("left")} id="left">LEFT</button>
          <button onClick={() => this.getNextIndex("up")} id="up">UP</button>
          <button onClick={() => this.getNextIndex("right")} id="right">RIGHT</button>
          <button onClick={() => this.getNextIndex("down")} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
