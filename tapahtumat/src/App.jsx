import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


const App = () => {
  const [value, setValue] = useState(0)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <Display counter={value} />
      <Button onClick={() => setToValue( value + 1000)} text = "thousand" />
      <Button onClick={() => setToValue(value + 1)} text = "increment" />
      <Button onClick={() => setToValue( value -1)} text = "decrement" />
      <Button onClick={() => setToValue(0)} text = "reset" />
      
      
      
    </div>
  )

}

export default App