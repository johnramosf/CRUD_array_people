import PropTypes from "prop-types";
import { Person } from "./Person";
import { useState } from "react";

export const People = ({ people, setPeople }) => {

  //Estado para gestionar el Id de la persona que se está editando
  const [editingId, setEditingId] = useState(null)

  //Estado para establecer si se esta editando una persona
  const [isEditing, setIsEditing] = useState(false)
  
  const [editedPerson, setEditedPerson] = useState({
    name: '',
    role: '',
    img: ''
  })

  //Estado para gestionar la persona que se va a eliminar
  const [personToDelete, setPersonToDelete] = useState({
    name: '',
    role: '',
    img: ''
  })
  //Metodo para gestionar los campos del formulario
  const handleChange = (e) => {
    const {name, value } = e.target
    setEditedPerson(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  //Metodo para crear una anueva persona en el Team
  const handleCreate =  (e) => {
    e.preventDefault()
    //agregar una persona al array
    setPeople([...people, {id: people.length +1, ...editedPerson}])

    //reiniciar el estado del formulario
    setEditedPerson({name:'', role:'', img:''})
  }
  //Metodo para editar a una persona
  const handleEdit = (id) => {
    setEditingId(id)
    setIsEditing(true)
    const personToEdit = people.find(person => person.id===id)
    setEditedPerson({...personToEdit})
  }

  //Metodo para guardar los cambios despues de editar una persona 
  const handleSave = (e) => {
    //prevenir recarga automatica del navegador
    e.preventDefault()
    
    //Crea un arreglo nuevo con la persona editada actualizada
    const updatedPeople = people.map(person => person.id === editingId? editedPerson : person )
    
    //actualizar el estado de la persona editada en el arreglo 
      setPeople(updatedPeople)
      setIsEditing(false)
      setEditingId(null)
        setEditedPerson({
          name: '',
          role: '',
          img: ''
        })
    }

   //Metodos para eliminar una Persona del array
   
   //Metodo #1 guardar el id de la persona a eliminar
   const handleDelete = (id) => {
     setPersonToDelete(id)

   }

   //Metodo #2: confirmar la eliminacion
   const confirmDelete = () => {
     //filtro personas
     setPeople(people.filter(person => person.id !== personToDelete)) 
     setPersonToDelete(null)
     
   }

   //Metodo 3 cancelar eliminacion en modal de confirmacion
   const cancelDelete = () => {
     setPersonToDelete(null)
   } 
 


  return (
    <div className='scrollable-container'>
      <h2 className="text-center my-4">IT Team</h2>
      <div className="container">
        <div className="row d-flex flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3">
          {people.map((people) => {
            return (
              <div key = {people.id}>
                <Person
                  id = {people.id}
                  name = {people.name}
                  role = {people.role}
                  img = {people.img}
                  handleEdit = {() => handleEdit(people.id)}
                  handleDelete = {handleDelete}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Formulario */}
    <div className="container row mt-4 p-2">
      <h2 className='text-center' >{isEditing ? 'Editar Integrante' : 'Crear nuevo Integrante' }</h2>
      <form>
        <div>
          <label htmlFor="name">Nombres:</label>
          <input type="text" name="name" className="form-control" value={editedPerson.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="name">Rol:</label>
          <input type="text" name="role" className="form-control" value={editedPerson.role} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="name">Avatar:</label>
          <input type="text" name="img" className="form-control" value={editedPerson.img} onChange={handleChange} required />
        </div>
        <div className="mt-2 text-center">
          <button type="submit" className="btn btn-primary" onClick={ isEditing? handleSave : handleCreate } >{isEditing? 'Modificar' : 'Crear' }</button>
        </div>
      </form>
      </div>
      {/* Modal de confirmacion */} 
      <div id="deleteModal" className="modal fade" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
           <div className="modal-header">
            <h4 className="modal-title">Confirmar Eiminación</h4>
            <button type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    onClick={cancelDelete}>   
            </button>

            </div>
            <div className="modal-body"> 
              <p>Estás seguro de eliminar a: {people.find(person => person.id=== personToDelete)?.name} ?! </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={cancelDelete}>Cancelar</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={confirmDelete}>Eliminar</button>
            </div>

          </div>

        </div>
      </div> 
    </div>
  )
}

People.propTypes = {
  people: PropTypes.array,
  setPeople: PropTypes.func,
};