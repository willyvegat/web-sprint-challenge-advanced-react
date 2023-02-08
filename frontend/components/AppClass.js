import React from 'react';
import axios from 'axios';


const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;


const initialState = {
  message: initialMessage,
  email: initialEmail,
  currentIndex: initialIndex,
  steps: initialSteps,
  coordinateX: 2,
  coordinateY: 2,
}

export default class AppClass extends React.Component {
  state = {
      email: initialEmail,
      message: initialMessage,
      steps: initialSteps,
      coordinateX: 2,
      coordinateY: 2,
      currentIndex: initialIndex
    }

  getXYMessage = (direction) => {
    if (this.state.coordinateY === 1 && direction === 'up' || this.state.coordinateY === 3 && direction === 'down') {
      this.setState({
        ...this.state,
        message: `You can't go ${direction}`
      })
    } else if (this.state.coordinateX === 1 && direction === 'left' || this.state.coordinateX === 3 && direction === 'right') {
      this.setState({
        ...this.state,
        message: `You can't go ${direction}`
      })
    }
  }

  getNextIndex = (direction) => {

    if (direction === 'up'){
      this.setState({
        ...this.state,
        coordinateY: this.state.coordinateY === 1 ? this.state.coordinateY : this.state.coordinateY - 1,
        currentIndex: this.state.coordinateY === 1 ? this.state.currentIndex : this.state.currentIndex - 3,
        steps: this.state.steps + 1,
        message: initialMessage
      })
    } else if (direction === 'down') {
      this.setState({
        ...this.state,
        coordinateY: this.state.coordinateY === 3 ? this.state.coordinateY : this.state.coordinateY + 1,
        currentIndex: this.state.coordinateY === 3 ? this.state.currentIndex : this.state.currentIndex + 3,
        steps: this.state.steps + 1,
        message: initialMessage
      })
      } else if (direction === 'left') {
      this.setState({
        ...this.state,
        coordinateX: this.state.coordinateX === 1 ? this.state.coordinateX : this.state.coordinateX - 1,
        currentIndex: this.state.coordinateX === 1 ? this.state.currentIndex : this.state.currentIndex - 1,
        steps: this.state.steps + 1,
        message: initialMessage
      })
      } else if (direction === 'right') {
        this.setState({
          ...this.state,
          coordinateX: this.state.coordinateX === 3 ? this.state.coordinateX : this.state.coordinateX + 1,
          currentIndex: this.state.coordinateX === 3 ? this.state.currentIndex : this.state.currentIndex + 1,
          steps: this.state.steps + 1,
          message: initialMessage
        })
      }

      this.getXYMessage(direction)
  } 

  reset = () => {
    this.setState({...initialState})
  }

  resetEmail = () => {
    this.setState({...this.state, email: initialEmail})
  } 

  onChange = (evt) => {
    evt.preventDefault();
    const { value } = evt.target;
    this.setState({
      ...this.state,
      email: value
    })
  }


  onSubmit = (evt) => {
    evt.preventDefault();
    axios.post('http://localhost:9000/api/result', {
      email: this.state.email, 
      steps: this.state.steps,
      x: this.state.coordinateX,
      y: this.state.coordinateY 
    })
      .then(res => {
        this.setState({ ...this.state, email: this.state.email, message: res.data.message})
      })
      .catch(err => {
        this.setState({ ...this.state, message: err.response.data.message })
      })
    this.resetEmail();
  }


  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.state.coordinateX}, ${this.state.coordinateY})`}</h3>
          <h3 id="steps">{this.state.steps === 1 ? `You moved ${this.state.steps} time` : `You moved ${this.state.steps} times`}</h3>
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
          <h3 id="message">{this.state.message}{this.state.winner}</h3>
        </div>
        <div id="keypad">
          <button onClick={() => this.getNextIndex("left")} id="left">LEFT</button>
          <button onClick={() => this.getNextIndex("up")} id="up">UP</button>
          <button onClick={() => this.getNextIndex("right")} id="right">RIGHT</button>
          <button onClick={() => this.getNextIndex("down")} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit} >
          <input onChange={this.onChange} value={this.state.email} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
