

function signupusingemailpassword(email, password)
{
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((user) => {
			firebase.auth().currentUser.sendEmailVerification()
		    	.then(() => {
					// Email verification sent!
					// ...
					window.location.replace('./DashBoard.html');
		    	});
	})
	.catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode+": "+errorMessage);
	});

}