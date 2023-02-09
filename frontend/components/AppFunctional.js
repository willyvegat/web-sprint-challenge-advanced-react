import React, {useState} from 'react'
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

export default function AppFunctional(props) {
  const[state, setState] = useState({
    email: initialEmail,
    message: initialMessage,
    steps: initialSteps,
    coordinateX: 2,
    coordinateY: 2,
    currentIndex: initialIndex
  });

  const getXYMessage = (direction) => {
    if (state.coordinateY === 1 && direction === 'up' || state.coordinateY === 3 && direction === 'down') {
      setState({
        ...state,
        message: `You can't go ${direction}`
      })
    } else if (state.coordinateX === 1 && direction === 'left' || state.coordinateX === 3 && direction === 'right') {
      setState({
        ...state,
        message: `You can't go ${direction}`
      })
    }
  }

  const getNextIndex = (direction) => {

    if (direction === 'up'){
      setState({
        ...state,
        coordinateY: state.coordinateY === 1 ? state.coordinateY : state.coordinateY - 1,
        currentIndex: state.coordinateY === 1 ? state.currentIndex : state.currentIndex - 3,
        steps: state.steps + 1,
        message: initialMessage
      })
    } else if (direction === 'down') {
      setState({
        ...state,
        coordinateY: state.coordinateY === 3 ? state.coordinateY : state.coordinateY + 1,
        currentIndex: state.coordinateY === 3 ? state.currentIndex : state.currentIndex + 3,
        steps: state.steps + 1,
        message: initialMessage
      })
      } else if (direction === 'left') {
      setState({
        ...state,
        coordinateX: state.coordinateX === 1 ? state.coordinateX : state.coordinateX - 1,
        currentIndex: state.coordinateX === 1 ? state.currentIndex : state.currentIndex - 1,
        steps: state.steps + 1,
        message: initialMessage
      })
      } else if (direction === 'right') {
        setState({
          ...state,
          coordinateX: state.coordinateX === 3 ? state.coordinateX : state.coordinateX + 1,
          currentIndex: state.coordinateX === 3 ? state.currentIndex : state.currentIndex + 1,
          steps: state.steps + 1,
          message: initialMessage
        })
      }

      getXYMessage(direction)
  } 

  const reset = () => {
    setState({...initialState})
  } 

  const onChange = (evt) => {
    evt.preventDefault();
    const { value } = evt.target;
    setState({
      ...state,
      email: value
    })
  }


  const onSubmit = (evt) => {
    evt.preventDefault();
    axios.post('http://localhost:9000/api/result', {
      email: state.email, 
      steps: state.steps,
      x: state.coordinateX,
      y: state.coordinateY 
    })
      .then(res => {
        setState({ ...state, email: initialEmail, message: res.data.message })
      })
      .catch(err => {
        setState({ ...state, message: err.response.data.message })
      })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
          <h3 id="coordinates">{`Coordinates (${state.coordinateX}, ${state.coordinateY})`}</h3>
          <h3 id="steps">{state.steps === 1 ? `You moved ${state.steps} time` : `You moved ${state.steps} times`}</h3>
        </div>
        <div id="grid">
          { 
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === state.currentIndex ? ' active' : ''}`}>
                {idx === state.currentIndex ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={() => getNextIndex("left")} id="left">LEFT</button>
          <button onClick={() => getNextIndex("up")} id="up">UP</button>
          <button onClick={() => getNextIndex("right")} id="right">RIGHT</button>
          <button onClick={() => getNextIndex("down")} id="down">DOWN</button>
          <button onClick={reset} id="reset">reset</button>
        </div>
        <form onSubmit={onSubmit} >
          <input onChange={onChange} value={state.email} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
    </div>
  )
}
