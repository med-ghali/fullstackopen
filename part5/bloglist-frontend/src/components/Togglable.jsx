import { useState } from "react"
import PropTypes from 'prop-types'

const Togglable = (props) => {
	const [visible,setVisible] = useState(false)

	const showWhenVisible = {display : visible ? "" : "none"}
	const hideWhenVisible = {display : + visible ?  "none" : ""}
	const toggleVisibilty = () => setVisible(!visible)

	return (
		<>
			<div style={hideWhenVisible}>	
				<button onClick={toggleVisibilty}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibilty}>cancel</button>
			</div>
		</>
	)
}


Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}  

export default Togglable