import React, { useState } from 'react'

const Header = ({text}) => (<h1>{text}</h1>) ;

const Button = ({text,handleClick}) => ( <button onClick={handleClick}> {text} </button>) ;
const StatLine =  ({text,number}) => (   <p>{text} {number} </p>)

const Stat = ({stat}) => {
  let [good,neutral,bad] = stat;
  let total = stat.reduce( (a,b) => (a+b) , 0) ;
  function average () {
    if (total == 0 )
      return 0 ;
    return (good-bad)/total;
  }
  function positive () {
    if (total == 0 )
      return 0 ;
    return (good*100)/total;
  }

  if (total == 0 )
    return (<p> no feedback given </p>) ;
  return (
    <div>
      <StatLine text="good" number={good} > </StatLine>
      <StatLine text="neutral" number={neutral} > </StatLine>
      <StatLine text="neutral" number={bad} > </StatLine>
      <StatLine text="total" number={total} > </StatLine>
      <StatLine text="average" number={average()} > </StatLine>
      <StatLine text="positive" number={positive()} > </StatLine>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback"> </Header>
      <Button text="good" handleClick={() => setGood(good+1) } />
      <Button text="neutral" handleClick={() => setNeutral(neutral+1) } />
      <Button text="bad" handleClick={() => setBad(bad+1) } />
      <Header text="statistics"> </Header>
      <Stat stat={[good,neutral,bad]}> </Stat>
    </div>
  )
}

export default App