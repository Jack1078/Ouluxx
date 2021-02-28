function LogInUsingEmailPassword(email, password)
{
	firebase.auth().signInWithEmailAndPassword(email, password)
	.then((user) => {
		window.location.replace('./DashBoard.html');
	})
	.catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode+": "+errorMessage);
	});
}