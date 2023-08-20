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
			<h2>Total of {sum} exercises </h2>
		</>
	)
}

const Course = ({course}) => {
	
	return (
		<>
		  <Header course={course.name} />
		  <Content parts={course.parts} />
		  <Total parts={course.parts} />
		</>
	)
}

export default Course