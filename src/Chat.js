import React, {useState, useEffect} from 'react'
import "./Chat.css";
import {Avatar, IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';
import {collection, doc, onSnapshot, orderBy, query , serverTimestamp, addDoc} from "firebase/firestore";
import { useStateValue } from './StateProvider';
// import firebase from "firebase";



function Chat() {

    const [seed, setSeed] = useState('');
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(()=>{
        if (roomId) {
            const q = doc(collection(db, "rooms"), roomId);
            const sideChat = onSnapshot(q, (docSnapshot) => {
              if (docSnapshot.exists()) {
                setRoomName(docSnapshot.data().name);
              }
            });

        const roomRef = doc(db, "rooms", roomId); // Reference to the room document
        const messagesCollectionRef = collection(roomRef, "messages"); // Reference to the messages collection within the room

        const messagesQuery = query(messagesCollectionRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => doc.data());
        setMessages(messagesData);
        });
            
          }
    }, [roomId])

    useEffect(() => {
      setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) =>{
        e.preventDefault();
        console.log("You type >>>", input);

        const roomRef = doc(collection(db, "rooms"), roomId); // Reference to the specific room document
        const messagesCollectionRef = collection(roomRef, "messages"); // Reference to the messages collection within the room document

        addDoc(messagesCollectionRef, {
        message: input,
        name: user.displayName,
        timestamp: serverTimestamp()
    })

        setInput("");

    }

  return (
    <div className='chat'>
        <div className='chat__header'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className='chat__headerInfo'>
                <h3>{roomName}</h3>
                <p>
                    last seen {""}
                    {
                        new Date(
                            messages[messages.length - 1]?. timestamp?.toDate()
                        ).toUTCString()
                    }
                </p>
            </div>

            <div className='chat__headerRight'>
                <IconButton>
                    <SearchIcon/>
                </IconButton>
                <IconButton>
                    <AttachFileIcon />    
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>

        <div className='chat__body'>

            {messages.map(message => (
                <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                <span className='chat__name'>
                    {message.name}
                </span>
                {message.message}
                <span className='chat__timestamp'>
                    {
                        new Date(message.timestamp?.toDate()).toUTCString()
                    }
                </span>
            </p>
            ))}

            {/* <p className={`chat__message ${true && "chat__reciever"}`}>
                <span className='chat__name'>
                    Helo
                </span>
                hey guys
                <span className='chat__timestamp'>
                    3: 53pm
                </span>
            </p> */}

            
        </div>

        <div className='chat__footer'>
            <InsertEmoticonIcon/>
            <form>
                <input type='text' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message...'/>
                <button type='submit' onClick={sendMessage}>Send a Message</button>
            </form>
            <MicIcon />
        </div>
    </div>
  )
}

export default Chat