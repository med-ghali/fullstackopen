import Input from "./Input";

const PersonForm = ({addPerson,updateName,newName,updateNumber,newNumber}) =>{
	return (
		<form onSubmit={addPerson}>
		<Input label="name" value={newName} updateValue={updateName} />
		<Input label="number" value={newNumber} updateValue={updateNumber} />
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
	)
}
export default PersonForm;