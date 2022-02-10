const Part = (props) => {
  
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  const Content = ({ course }) => {
    let parts = course.parts ;
    return (
      <div>
        { parts.map( (part) =>( 
          <Part key={part.id} part={part}></Part>
        ) ) }
      </div>
    )
  }
  const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  const Total = ({ course }) => {
    let arr = course.parts.map( (a) => a.exercises) ;
    const sum = arr.reduce((a,b) =>a+b );
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }
  
  const Course = ({course}) => {
      
    return(
      <>
      <Header course={course}></Header>
      <Content course={course}></Content>
      <Total course={course}></Total>
      </>
    )
  }

export default Course