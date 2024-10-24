import { useState } from 'react'
import './App.css'
import { People } from './components/People'
function App() {

  const [people, setPeople ] = useState ([
    {id:1,
     name: 'John',
     role: 'Backend Developer',
     img: 'https://bootdey.com/img/Content/avatar/avatar7.png'},
    {id:2,
      name: 'Luisa',
      role: 'QA  Tester',
      img: 'https://bootdey.com/img/Content/avatar/avatar3.png'},
    {id:3,
      name: 'George',
      role: 'Backend Developer',
      img: 'https://bootdey.com/img/Content/avatar/avatar5.png'}
  ])     


  
  return (
    <div>
     <People
      people = {people}     
      setPeople = {setPeople}
     />
    </div>
  )
}

export default App
