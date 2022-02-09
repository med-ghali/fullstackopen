import React, { useState } from 'react'

const Header = ({text}) => (<h1>text</h1>) ;

const Button = ({text,handleClick}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback"> </Header>
   
    </div>
  )
}

export default Ap