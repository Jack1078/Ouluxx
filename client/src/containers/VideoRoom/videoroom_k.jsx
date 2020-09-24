import React, {useEffect, useRef, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {FaVideo, FaMicrophone, FaHeadphonesAlt} from 'react-icons/fa';
import {GiExitDoor} from 'react-icons/gi';
import CopyToClipboard from 'react-copy-to-clipboard';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import Video from '../../components/video_c';
import classes from './videoroom_k.module.css';

const VideoRoom = (props) => {
  const [peers, setPeers] = useState([]); // stores all the peers
  const peers_ref = useRef([]);
  const socket_ref = useRef(); // reference to the user socket
  const link_ref = useRef();
  const screen_stream = useRef();
  const user_video = useRef(); // reference to the user video
  const roomID = props.match.params.roomID; // current room id

  const [canHear, setCanHear] = useState(true);
  const [canSpeak, setCanSpeak] = useState(true);
  const [canSee, setCanSee] = useState(true);

  /* -------------------- */
  /* Runs at first render */
  /* -------------------- */

  useEffect(() => {
    console.log('useEffect ... first');
    // connect to server
    socket_ref.current = io.connect();

    // get your camera video and audio
    navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
        // set current user video and audio stream
          user_video.current.srcObject = stream;
        });

    // get screenshare stream
    navigator.mediaDevices
        .getDisplayMedia({
          cursor: true,
          audio: false,
        })
        .then((display_stream) => {
        // get shared screen video
          const [video_track] = display_stream.getVideoTracks();

          navigator.mediaDevices
              .getUserMedia({
                audio: true,
              })
              .then((audio_stream) => {
                // get sound from mic
                const [audio_track] = audio_stream.getAudioTracks();
                const stream = new MediaStream([video_track, audio_track]);

                screen_stream.current = display_stream;
                // signals server current user has joined the room with roomID
                socket_ref.current.emit('join_room', {roomID, isHost: true});

                // signals server to check if there is already host in the room with roomID
                socket_ref.current.emit('check_host', roomID);
                /** ----------------------------------------
             * HANDLES: (socket_ref.current.on)
             *                      (Helper functions)
             *  host_exist
             *  create_peers        create_peer
             *  room_full           add_peer
             *  back_offer
             *  back_answer
             *  user_disconnected
             *  host_left
             *  is_host
             * ---------------------------------------- */

                socket_ref.current.on('host_exist', () => {
                  document.write('host already exist');
                });

                /* ********************  */
                socket_ref.current.on('create_peers', (users) => {
                  console.log('create_peers: ' + socket_ref.current.id);
                  const ps = [];
                  // for each user, create a peer and
                  //  send offer to their client to establish connections
                  users.forEach((peerID) => {
                    const peer = create_peer(peerID, stream);
                    console.log(peers_ref.current);
                    peers_ref.current.push({
                      peerID,
                      peer,
                    });
                    ps.push({peerID, peer});
                  });
                  setPeers(ps);
                });

                /* ********************  */
                socket_ref.current.on('room_full', () => {
                  document.write('Room full, please come back later');
                });

                /* ********************  */
                socket_ref.current.on('back_offer', (payload) => {
                  console.log('back_offer: ' + socket_ref.current.id);

                  const peer = add_peer(payload.signal, payload.callerID, stream);
                  peers_ref.current.push({
                    peerID: payload.callerID,
                    peer,
                  });

                  // update this client's peers list
                  setPeers((users) => [
                    ...users,
                    {
                      peerID: payload.callerID,
                      peer,
                    },
                  ]);
                });

                /* ********************  */
                socket_ref.current.on('back_answer', (payload) => {
                  console.log('back_answer: ' + socket_ref.current.id);
                  const item = peers_ref.current.find((p) => p.peerID === payload.id);
                  item.peer.signal(payload.signal);
                });

                /* ********************  */
                socket_ref.current.on('user_disconnected', (peerID) => {
                  console.log('user_disconnected: ' + socket_ref.current.id);
                  document.getElementById(peerID).remove();
                  peers_ref.current
                      .find((item) => {
                        return item.peerID === peerID;
                      })
                      .peer.destroy();
                  peers_ref.current = peers_ref.current.filter((item) => {
                    return item.peerID !== peerID;
                  });
                });

                /* ********************  */
                socket_ref.current.on('host_left', () => {
                  document.write('host has left the room');
                });
              });
        });
    return () => {
      if (screen_stream.current) {
        screen_stream.current.getTracks().forEach((track) => track.stop());
      }
      socket_ref.current.disconnect();
    };
  }, [roomID]);

  /* ---------------------------------------- */
  /* Helper Functions */
  /**
   *  create_peer     @param {receiverID, stream}
   *  add_peer        @param {incoming_signal, callerID, stream}
   */
  /* ---------------------------------------- */

  const create_peer = (receiverID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket_ref.current.emit('offer', {
        callerID: socket_ref.current.id,
        receiverID,
        signal,
      });
    });

    return peer;
  };

  const add_peer = (incoming_signal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket_ref.current.emit('answer', {signal, callerID});
    });

    peer.signal(incoming_signal);

    return peer;
  };

  /* --------------------------- */
  /* UseEffect for buttons       */
  /* [canHear, canSpeak, canSee] */
  /* --------------------------- */

  useEffect(() => {
    // for each peers, turn down their video's volume
    peers.forEach((item) => {
      document.getElementById(item.peerID).volume = canHear ? 1 : 0;
    });
  }, [canHear, peers]);

  useEffect(() => {
    if (user_video.current.srcObject !== null) {
      // if can speak, then turn on the audio track
      // if not then diable them
      if (canSpeak) {
        user_video.current.srcObject.getTracks().forEach((track) => {
          if (track.readyState === 'live' && track.kind === 'audio') {
            track.enabled = true;
          }
        });
      } else {
        user_video.current.srcObject.getTracks().forEach((track) => {
          if (track.readyState === 'live' && track.kind === 'audio') {
            track.enabled = false;
          }
        });
      }
    }
  }, [canSpeak]);

  useEffect(() => {
    if (user_video.current.srcObject !== null) {
      // if can see, then turn on the video track
      // if not then diable them
      if (canSee) {
        user_video.current.srcObject.getTracks().forEach((track) => {
          if (track.readyState === 'live' && track.kind === 'video') {
            track.enabled = true;
          }
        });
      } else {
        user_video.current.srcObject.getTracks().forEach((track) => {
          if (track.readyState === 'live' && track.kind === 'video') {
            track.enabled = false;
          }
        });
      }
    }
  }, [canSee]);

  /* ----------------------------- */
  /* Function for leave video room */
  /* ----------------------------- */
  const leave_room = () => {
    if (screen_stream.current) {
      screen_stream.current.getTracks().forEach((track) => track.stop());
    }
    socket_ref.current.disconnect();
    props.history.push(`/stores/${props.match.params.store}`);
  };

  return (
    <div className={classes.container}>
      <CopyToClipboard
        text={`localhost:3000/room/${props.match.params.roomID}`}
      >
        <div className={classes.btn_copy}>Copy invitation link</div>
      </CopyToClipboard>
      <div className={classes.inner_container}>
        <div className={classes.btn_container}>
          <div
            className={canSpeak ? classes.btn : classes.btn_disabled}
            onClick={() => setCanSpeak(!canSpeak)}
          >
            <FaMicrophone />
          </div>
          <div
            className={canHear ? classes.btn : classes.btn_disabled}
            onClick={() => setCanHear(!canHear)}
          >
            <FaHeadphonesAlt />
          </div>
          <div
            className={canSee ? classes.btn : classes.btn_disabled}
            onClick={() => setCanSee(!canSee)}
          >
            <FaVideo />
          </div>
          <div className={classes.btn_exit} onClick={leave_room}>
            <GiExitDoor />
          </div>
        </div>
        <div className={classes.videos}>
          <video
            className={classes.video}
            muted
            ref={user_video}
            autoPlay
            playsInline
          />
          {peers.map((item) => {
            return (
              <Video
                className={classes.video}
                key={item.peerID}
                peer={item.peer}
                id={item.peerID}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default withRouter(VideoRoom);
