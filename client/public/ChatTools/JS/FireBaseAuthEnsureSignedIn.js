var user = null;
function ensureLoggedIn()
{
	firebase.auth().onAuthStateChanged((Doesuser) => {
		if (Doesuser) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			var uid = Doesuser.uid;
			user = Doesuser;
			console.log(uid);
			console.log(user);
		} else {
			window.location.replace("./Login.html");
		}
	});
}
ensureLoggedIn();