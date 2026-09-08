import Note from './components/Note'

const Header =({name}) => <h1>{name}</h1>

const Course = ({course}) => {
  console.log('Course',course)
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}

const Part = ({part}) =>
  <p>{part.name} {part.exercises}</p>


const Content = (props) => {
  console.log("Content",props)
  const {parts} = props

  return (
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part} />
      
    )}
    </div>
  )
}


const App = (prop) => {
  


  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  console.log(course)

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App