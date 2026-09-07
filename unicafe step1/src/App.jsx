import { StrictMode } from 'react';
import { useState } from 'react'


// Tulostaa tekstin ja arvon omiin td-sarakkeisiinsa taulukon riville (tr)
const StatisticLine = (props) => {
  console.log(props)
  return (
    <tr>
      {/* SARAKKEIDEN RIVIEN MUODOSTUS */}
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  console.log(props)
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = props.good + props.neutral + props.bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
      
  
  }
  {/* Table, eli taulukko, jonka sisällä tbody */}
  return (
    
    <table>
      <tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive + " %"} />
      </tbody>
    </table>
  )

}



const App = (props) => {
  console.log(props)


  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)
  const handleReset = () => {
    console.log("reset votes")
    setGood(0)
    setNeutral(0)
    setBad(0)
  }
 

  
  return (
    <>
      <h2>give feedback</h2>
    
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <button onClick={handleReset}>reset</button>

      <h2>statistics</h2>
      
      <Statistics good={good} neutral={neutral} bad={bad} />
      
      

      
    
    </>
  )
  
}

export default App