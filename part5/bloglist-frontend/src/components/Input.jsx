
const Input = ({label,value,handleChange})=> {
	return (
		<div> 
			{label} <input value={value} onChange={handleChange} ></input>
		</div>
	)
}

export default Input