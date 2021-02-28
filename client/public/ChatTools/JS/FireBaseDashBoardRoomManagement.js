mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));
const configuration = {
	iceServers: [
		{
			urls: [
				'stun:stun1.l.google.com:19302',
				'stun:stun2.l.google.com:19302',
			],
		},
	],
	iceCandidatePoolSize: 10,
};
let peerConnection = null;
let roomId = null;
async function CreateARoom(){
	var radio = document.getElementsByName('ChatMethod');
	var ChatMethod = null;
	for (var i = radio.length - 1; i >= 0; i--) {
		if(radio[i].checked)
		{
			ChatMethod = radio[i].value;
		}
	}
	const db = firebase.firestore();
	const roomRef = await db.collection('rooms').doc();

	// Code for creating a room below
	const room = {
		"uid": user.uid, 
		"roomType": ChatMethod,
		"RoomSize": 2,
	};
	await roomRef.set(room);
	roomId = roomRef.id;
	
	if(ChatMethod==="VideoChat")
	{
		window.location.replace("./VChatRoom.html?RoomID="+roomId);
	}
	else if(ChatMethod==="TextChat")
	{
		window.location.replace("./TChatRoom.html?RoomID="+roomId);
	}
	else if(ChatMethod==="ScreenShare")
	{
		window.location.replace("./ScreenShareChatRoom.html?RoomID="+roomId);
	}

	/*window.location.replace("./ChatRoom.html?RoomID="+roomId);*/
}

const RoomList = document.querySelector("#OwnedRooms");

async function renderOwnedChatRooms()
{
	const db = firebase.firestore();
	var user = await firebase.auth().currentUser;
	db.collection("rooms").where("uid", "==", user.uid).get().then((snapshot)=>{
		snapshot.docs.forEach(doc=>{
			renderDoc(doc);
		})
	});
}

function renderDoc(doc){
	/*console.log(doc.data());
	console.log(doc.id);*/
	let OverSpan = document.createElement("span");
	let li = document.createElement("li");
	let span = document.createElement("span");
	let name = document.createElement("span");
	let roomType = document.createElement("span");
	let formGo = document.createElement("form");
	let formDelete = document.createElement("form");
	let ButtonGoTo = document.createElement("button");
	let ButtonDelete = document.createElement("button");

	formGo.action="javascript:GoToRoom(\""+doc.data().roomType+"\", \""+doc.id+"\")";
	formDelete.action="javascript:DeleteRoom(\""+doc.id+"\")";

	ButtonGoTo.setAttribute("type", "submit");
	ButtonGoTo.textContent = "Enter Room";
	ButtonDelete.setAttribute("type", "submit");
	ButtonDelete.textContent = "Delete Room";
	name.textContent = doc.id;
	roomType.textContent = " "+doc.data().roomType;
	formGo.appendChild(ButtonGoTo);
	formDelete.appendChild(ButtonDelete);
	span.appendChild(name);
	span.appendChild(roomType);
	span.appendChild(formGo);
	span.appendChild(formDelete);
	OverSpan.id = "RoomID"+doc.id;
	li.appendChild(span);
	OverSpan.appendChild(li);
	RoomList.appendChild(OverSpan);
}

function GoToRoom(roomtype, docid){
	if(roomtype==="VideoChat")
	{
		window.location.replace("./VChatRoom.html?RoomID="+docid);
	}
	else if(roomtype==="TextChat")
	{
		window.location.replace("./TChatRoom.html?RoomID="+docid);
	}
	else if(roomtype==="ScreenShare")
	{
		window.location.replace("./ScreenShareChatRoom.html?RoomID="+docid);
	}
}

async function DeleteRoom(roomId){
	console.log("Deleting " + roomId);
	var confirmation = confirm("Are you certain you want to delete the room " + roomId);
	if(confirmation)
	{
		if (roomId) {
			const db = firebase.firestore();
			const roomRef = db.collection('rooms').doc(roomId);
			const calleeCandidates = await roomRef.collection('calleeCandidates').get();
			calleeCandidates.forEach(async candidate => {
				await candidate.ref.delete();
			});
			const callerCandidates = await roomRef.collection('callerCandidates').get();
			callerCandidates.forEach(async candidate => {
				await candidate.ref.delete();
			});
			await roomRef.delete();
			var myList = document.getElementById('RoomID'+roomId);
			myList.innerHTML = '';
		}
	}
	else
	{
		// do nothing
	}
	
}
var user = null
firebase.auth().onAuthStateChanged(function(UserArg) {
	if (UserArg) {
		user = UserArg;
		renderOwnedChatRooms();
	} else {
		window.location.replace("./Login.html");
	}
});
