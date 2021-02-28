var user = null;
function CheckLoggedIn()
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
			user = {uid:null};
		}
	});
}
CheckLoggedIn();