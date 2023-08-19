import { useState } from 'react'

const StatisticLine = ({text,value}) => {
	return (
		<tbody>
			<tr>
				<td>{text}</td>
				<td>{value}</td>
			</tr>
		</tbody>
	)
}

const Statistics = ({good,neutral,bad}) => {
	const all = good + bad + neutral;
	if (all === 0)
		return (<p>no feedback given</p>)
	const positive = (good/all) * 100;
	const average = (good - bad) / all;
	return (
		<>
			<h1> Statistics</h1>
			<table>
				<StatisticLine text="good" value={good}/>
				<StatisticLine text="neutral" value={neutral}/>
				<StatisticLine text="bad" value={bad}/>
				<StatisticLine text="all" value={all}/>
				<StatisticLine text="average" value={average}/>
				<StatisticLine text="positive" value={positive + " %"}/>
			</table>
		</>
	)
}

const Button = ({handleClick,text}) => {
	return (
		<button onClick={handleClick}> {text} </button>
	)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
		<h1>give feedback</h1>
		<div>
			<Button text="good" handleClick={() => setGood(good + 1) } />
			<Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
			<Button text="bad" handleClick={() => setBad(bad + 1) } />
		</div>
		<Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App