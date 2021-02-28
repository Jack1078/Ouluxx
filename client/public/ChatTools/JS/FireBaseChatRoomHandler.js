function get(name){
	 if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
			return decodeURIComponent(name[1]);
}

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
let localStream = null;
let remoteStream = null; // TODO fix remote streams
let roomHost = null;
let roomId = get("RoomID");
let RoomOwner = false;
let RoomSize = 1;
let RemoteStreams = [];
let RemoteStreamIDS = [];
console.log("roomID = "+roomId);

function renderVideoChat()
{
	var videosid = document.getElementById("videos");
	let UserVideo = document.createElement("video");
	UserVideo.setAttribute("id", "localVideo");
	UserVideo.muted = true;
	UserVideo.autoplay = true;
	UserVideo.playsinline = true;
	videosid.appendChild(UserVideo);
	for(var i = 0; i<RoomSize-1; i++)
	{
		let remoteVideo = document.createElement("video");
		remoteVideo.setAttribute("id", "remoteVideo"+i);
		/*UserVideo.play();*/
		remoteVideo.autoplay = true;
		remoteVideo.playsinline = true;
		videosid.appendChild(remoteVideo);
		RemoteStreamIDS.push("remoteVideo"+i);
	}
}

async function init(LoggedIn) {
	/*console.log("INIT");*/
	console.log("initialize local stream");
	

	// determine if host
	await getRoom();
	await renderVideoChat()
	await openUserMedia();

	if(LoggedIn && roomHost === user.uid)
	{
		console.log("You are the owner of this room. ");
		RoomOwner = true;
		CreateVideoRoom();
	}
	else
	{
		console.log("You are a guest in this room. ");
		joinVideoRoom();
	}
}

async function getRoom()
{
	const db = firebase.firestore();
	const roomRef = await db.collection('rooms').doc(roomId);
	console.log("roomRef id "+ roomRef.id);
	await roomRef.get().then((snapshot)=>{
		roomHost = snapshot.data().uid;
		RoomSize = snapshot.data().RoomSize;
		console.log("roomRef uid "+ roomHost);
	})
}

async function CreateVideoRoom() {
	const db = firebase.firestore();
	const roomRef = await db.collection('rooms').doc(roomId);

	console.log('Create PeerConnection with configuration: ', configuration);
	peerConnection = new RTCPeerConnection(configuration);

	registerPeerConnectionListeners();

	localStream.getTracks().forEach(track => {
		peerConnection.addTrack(track, localStream);
	});

	// Code for collecting ICE candidates below
	const callerCandidatesCollection = roomRef.collection('callerCandidates');

	peerConnection.addEventListener('icecandidate', event => {
		if (!event.candidate) {
			console.log('Got final candidate!');
			return;
		}
		console.log('Got candidate: ', event.candidate);
		callerCandidatesCollection.add(event.candidate.toJSON());
	});
	// Code for collecting ICE candidates above

	// Code for creating a room below
	const offer = await peerConnection.createOffer();
	await peerConnection.setLocalDescription(offer);
	console.log('Created offer:', offer);
	const roomWithOffer = {
		'offer': {
			type: offer.type,
			sdp: offer.sdp,
		},
	};
	await roomRef.update(roomWithOffer);
	roomId = roomRef.id;
	console.log(`Room instantiated with SDP offer. Room ID: ${roomRef.id}`);
	// Code for creating a room above

	peerConnection.addEventListener('track', event => {
		console.log('Got remote track:', event.streams[0]);
		event.streams[0].getTracks().forEach(track => {
			console.log('Add a track to the remoteStream:', track);
			let num = 0;
			remoteStream.addTrack(track);
		});
	});

	// Listening for remote session description below
	roomRef.onSnapshot(async snapshot => {
		const data = snapshot.data();
		if (!peerConnection.currentRemoteDescription && data && data.answer) {
			console.log('Got remote description: ', data.answer);
			const rtcSessionDescription = new RTCSessionDescription(data.answer);
			await peerConnection.setRemoteDescription(rtcSessionDescription);
		}
	});
	// Listening for remote session description above

	// Listen for remote ICE candidates below
	roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
		snapshot.docChanges().forEach(async change => {
			if (change.type === 'added') {
				let data = change.doc.data();
				console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
				await peerConnection.addIceCandidate(new RTCIceCandidate(data));
			}
		});
	});
	// Listen for remote ICE candidates above
}

async function joinVideoRoom() {
	const db = firebase.firestore();
	const roomRef = db.collection('rooms').doc(`${roomId}`);
	const roomSnapshot = await roomRef.get();
	console.log('Got room: ', roomSnapshot.exists);

	if (roomSnapshot.exists) {
		console.log('Create PeerConnection with configuration: ', configuration);
		peerConnection = new RTCPeerConnection(configuration);
		registerPeerConnectionListeners();
		localStream.getTracks().forEach(track => {
			peerConnection.addTrack(track, localStream);
		});

		// Code for collecting ICE candidates below
		const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
		peerConnection.addEventListener('icecandidate', event => {
			if (!event.candidate) {
				console.log('Got final candidate!');
				return;
			}
			console.log('Got candidate: ', event.candidate);
			calleeCandidatesCollection.add(event.candidate.toJSON());
		});
		// Code for collecting ICE candidates above

		peerConnection.addEventListener('track', event => {
			console.log('Got remote track:', event.streams[0]);
			event.streams[0].getTracks().forEach(track => {
				console.log('Add a track to the remoteStream:', track);
				let num = 0;
				remoteStream.addTrack(track);
			});
		});

		// Code for creating SDP answer below
		const offer = roomSnapshot.data().offer;
		console.log('Got offer:', offer);
		await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
		const answer = await peerConnection.createAnswer();
		console.log('Created answer:', answer);
		await peerConnection.setLocalDescription(answer);

		const roomWithAnswer = {
			answer: {
				type: answer.type,
				sdp: answer.sdp,
			},
		};
		await roomRef.update(roomWithAnswer);
		// Code for creating SDP answer above

		// Listening for remote ICE candidates below
		roomRef.collection('callerCandidates').onSnapshot(snapshot => {
			snapshot.docChanges().forEach(async change => {
				if (change.type === 'added') {
					let data = change.doc.data();
					console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
					await peerConnection.addIceCandidate(new RTCIceCandidate(data));
				}
			});
		});
		// Listening for remote ICE candidates above
	}
}

async function openUserMedia() {
	const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
	document.querySelector('#localVideo').srcObject = stream;
	localStream = stream;
	remoteStream = new MediaStream();
	/*for (var i = 0; i < RoomSize-1; i++) {
		RemoteStreams.push(new MediaStream());
	}*/
	for (var i = 0; i < RoomSize-1; i++) {
		console.log(RemoteStreamIDS[i]);
		document.querySelector("#"+RemoteStreamIDS[i]).srcObject = remoteStream;
	}
}

function registerPeerConnectionListeners() {
	peerConnection.addEventListener('icegatheringstatechange', () => {
		console.log(
				`ICE gathering state changed: ${peerConnection.iceGatheringState}`);
	});

	peerConnection.addEventListener('connectionstatechange', () => {
		console.log(`Connection state change: ${peerConnection.connectionState}`);
	});

	peerConnection.addEventListener('signalingstatechange', () => {
		console.log(`Signaling state change: ${peerConnection.signalingState}`);
	});

	peerConnection.addEventListener('iceconnectionstatechange ', () => {
		console.log(
				`ICE connection state change: ${peerConnection.iceConnectionState}`);
	});
}

async function LeaveRoom()
{
	const tracks = document.querySelector('#localVideo').srcObject.getTracks();
	tracks.forEach(track => {
		track.stop();
	});

	if(anonlogin)
	{
		firebase.auth().currentUser.delete()
		firebase.auth().currentUser.delete()
	}
	
	if (remoteStream) {
		remoteStream.getTracks().forEach(track => track.stop());
	}

	if (peerConnection) {
		peerConnection.close();
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
				init(true);
			}
			else
			{
				console.log("Is not room owner");
				init(false);
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
				init(false);
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
