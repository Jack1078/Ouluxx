function get(name){
	 if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
			return decodeURIComponent(name[1]);
}

var roomRef;
let roomId = get("RoomID");
let roomHost = null;
let RoomMessages = null;
async function getRoom()
{
	const db = firebase.firestore();
	roomRef = await db.collection('rooms').doc(roomId);
	await roomRef.get().then((snapshot)=>{
		roomHost = snapshot.data().uid;
	})
	RoomMessages = roomRef.collection("Messages");
}

async function SendMessage(Message)
{
	const newMessage = {
		"Message" : {
			"Uid":user.uid,
			"Text":Message, 
			"TimeSent":new Date(),
		}
	}
	RoomMessages.add(newMessage);
}

function init()
{
	AwaitNewMessage();
}

async function AwaitNewMessage()
{
	roomRef.collection('Messages').onSnapshot(snapshot => {
		snapshot.docChanges().forEach(async change => {
			if (change.type === 'added') {
				let Message = change.doc.data();
				renderMessage(Message);
			}
		});
	});
}

function renderMessage(Message)
{
	let MainSpan = document.querySelector("#MessageSpan");
	let OverSpan = document.createElement("span"); // span containing the message
	let span = document.createElement("span");
	let name = document.createElement("span");
	let MessageText = document.createElement("span");
	let TimeText = document.createElement("span");
	let li = document.createElement("li");


	name.textContent = Message.Message.Uid;
	MessageText.textContent = " "+Message.Message.Text;
	TimeText.textContent = " "+Message.Message.TimeSent.toDate();
	span.appendChild(name);
	span.appendChild(TimeText);
	span.appendChild(MessageText);
	OverSpan.id = "RoomID"+Message.id;
	li.appendChild(span);
	OverSpan.appendChild(li);
	MainSpan.appendChild(OverSpan);
}

async function LeaveRoom()
{
	if(anonlogin)
	{
		firebase.auth().currentUser.delete()
		firebase.auth().currentUser.delete()
	}

	if(RoomOwner)
	{
		// reset the caller and callees. 
		window.location.replace("./DashBoard.html");
	}
	else
	{
		window.location.replace("./index.html");
	}
}

var user = null;
let anonlogin = false;
firebase.auth().onAuthStateChanged(async function(funcuser) {
	if(anonlogin)
	{
		
	}
	else
	{
		if (funcuser) {
			user = funcuser;
			await getRoom();
			if(roomHost === user.uid)
			{
				console.log("Is room owner");
				RoomOwner = true;
				init();
			}
			else
			{
				console.log("Is not room owner");
				RoomOwner = false;
				init();
			}
		}
		else
		{
			firebase.auth().signInAnonymously()
			.then(async () => {
				// Signed in..
				console.log("Signed in anonymously. ");
				anonlogin = true;
				user = firebase.auth().currentUser;
				await getRoom();
				RoomOwner = false;
				init();
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				// ...
				console.log(errorCode+"\n"+errorMessage);
			});
		}
	}
});
