import React, {useState, useEffect} from 'react'
import {Avatar} from "@mui/material";
import db from './firebase';
import {collection} from "firebase/firestore";
import { addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { doc, onSnapshot, orderBy, query } from 'firebase/firestore';


import "./SideBarChat.css"
function SideBarChat({id ,name, addNewChat}) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState("");

    useEffect(()=>{
      if (id) {
        const roomRef = doc(db, 'rooms', id); // Reference to the specific room document
        const messagesCollectionRef = collection(roomRef, 'messages'); // Reference to the messages collection within the room document

        const messagesQuery = query(messagesCollectionRef, orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
          const messagesData = snapshot.docs.map((doc) => doc.data());
          setMessages(messagesData);
        });

          }
    }, [id])

    useEffect(() => {
      setSeed(Math.floor(Math.random() * 5000));
    }, []);
    

    const createChat = async () => {
        const roomName = prompt("Please Enter name for chat");

        if(roomName){
            // do some clever  database stuff...
            const docRef = await addDoc(collection(db, "rooms"), {
              name: roomName,
          });
        }
    }

    
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
    <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className='sidebarChat__info'>
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
        </div>
    </div>
     </Link>
  ) : (
    <div onClick={createChat} className='sidebarChat'>
        <h2>Add New Chat</h2>
    </div>
  )
}

export default SideBarChat