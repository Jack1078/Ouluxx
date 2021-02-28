function logout(){
	firebase.auth().signOut().then(() => {
		// Sign-out successful.
		window.location.replace('./Login.html');
	}).catch((error) => {
		console.log(error);
	});
}
logout();