
const Input = ({label,updateValue,value}) => {
	return (
		<div>
			{label}: <input onChange={updateValue} value={value}/>
	  	</div>
	)
}

export default Input;