const Notification = ({notif}) => {
	if (!notif.msg)
	return null;
	return (
		<p className={notif.isSuccess ? "successNotif" : "failureNotif"}> {notif.msg} </p>
	)
}

export default Notification;