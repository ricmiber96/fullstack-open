import { useState } from 'react'
import Content from './components/Content'
import Header from './components/Header'
import Hello from './components/Hello'
import Total from './components/Total'
import Display from './components/Display'
import Button from './components/Button'
import History from './components/History'

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }

  const name = 'Peter'
  const age = 10
  const [counter, setCounter] = useState(0)
  const [secondCounter, setSecondCounter] = useState(0)
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  })
  const [allClicks, setAll] = useState([])

  const increaseByOne = () => setSecondCounter(secondCounter + 1)
  const decreaseByOne = () => setSecondCounter(secondCounter - 1)
  const setToZero = () => setSecondCounter(0)
  const [total, setTotal] = useState(0)

  setTimeout(() => setCounter(counter + 1), 1000)
  const handleClick = () => {
    setCounter(counter + 1)
  }

  const handleLeftClick = () => {
    setClicks({...clicks,left: clicks.left + 1})
    setAll(allClicks.concat('L'))
    const updateTotal = clicks.left + 1
    setTotal(updateTotal + clicks.right)
  }

  const handleRightClick = () => {
    setClicks({...clicks,right: clicks.right + 1})
    setAll(allClicks.concat('R'))
    const updateTotal = clicks.right + 1
    setTotal(clicks.left + updateTotal)
  }

  return (
    <div>
    
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      <Hello name={name} age={age} />
      <Hello name="Daisy" age={26 + 10} />
      <h2>First counter</h2>
      <div>{counter}</div>
      <button onClick={handleClick}>plus</button>
      <button onClick={() => setCounter(0)}>zero</button>
      <h2>Second counter</h2>
      <Display counter={secondCounter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={decreaseByOne} text="minus" />
      <div>
        <h2>Left and Right</h2>
        {clicks.left}
        <Button handleClick={handleLeftClick} text="left" />
        <Button handleClick={handleRightClick} text="right" />
        {clicks.right}
      </div>
      <div>
        <History allClicks={allClicks} />
        <p>{total}</p>
      </div>
    </div>
  )
}

export default App
