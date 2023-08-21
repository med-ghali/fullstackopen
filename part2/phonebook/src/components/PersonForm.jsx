const InputForm = ({updateValue,Value}) => {
	return (
		<div>
			name: <input onChange={updateValue} value={Value}/>
	  	</div>
	)
}

const PersonForm = ({addPerson,updateName,newName,updateNumber,newNumber}) =>{
	return (
		<form onSubmit={addPerson}>
		<InputForm value={newName} updateValue={updateName} />
		<InputForm value={newNumber} updateValue={updateNumber} />
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
	)
}
export default PersonForm;