const Header = ({course}) =>{
	return (
		<>
			<h1>{course}</h1>
		</>
	)
}

const Part = ({part,exercise}) => {
	return (
		<>
			 <p>{part} {exercise} </p>
		</>
	)
}

const Content  = ({parts}) =>{
	const dataList = parts.map( data => 
		<Part key={data.id} part={data.name} exercise={data.exercises}/>	
	)
	return (
		<>
			{dataList}
		</>
	)
}

const Total = ({parts}) =>{
	const sum = parts.reduce( (a,b) => (a + b.exercises), 0);
	return (
		<>
			<p>Number of exercises {sum}</p>
		</>
	)
}

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
		  {
			id: 1,
			name: 'Fundamentals of React',
			exercises: 10
		  },
		  {
			id: 2,
			name: 'Using props to pass data',
			exercises: 7
		  },
		  {
			id: 3,
			name: 'State of a component',
			exercises: 14
		  }
		]
	  }
	  return (
		<div>
		  <Header course={course.name} />
		  <Content parts={course.parts} />
		  <Total parts={course.parts} />
		</div>
	  )
  }
  
  export default App