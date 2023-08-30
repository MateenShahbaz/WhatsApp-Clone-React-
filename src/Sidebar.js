import React, { useEffect, useState } from 'react'
import "./Sidebar.css";
import {Avatar, IconButton} from "@mui/material";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SideBarChat from './SideBarChat';
import db from './firebase';
import { onSnapshot, collection, query,} from "firebase/firestore";
import { useStateValue } from './StateProvider';


function Sidebar() {

  const [rooms, setRooms] = useState([]);
  const [{user}, dispatch] = useStateValue();
    useEffect(() => {
        const q = query(collection(db, "rooms"))
        const unsub = onSnapshot(q, (QuerySnapshot) =>{
          // console.log("Data", QuerySnapshot.docs.map(doc => doc.data()));
          setRooms(
            QuerySnapshot.docs.map((doc)=> ({
              id : doc.id,
              data :doc.data(),
            }))
          )
        });

        return () => unsub();

    }, [])



  return (
    <div className='sidebar'>
        <div className='sidebar__header'>
            <Avatar src={user?.photoURL}/>
            <div className='sidebar__headerRight'>
              <IconButton>
                <DonutLargeIcon />
              </IconButton>
              <IconButton>
                <ChatIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
        </div>

        <div className='sidebar__search'>
          <div className='sidebar__searchConatiner'>
          <SearchIcon />
          <input placeholder='Search or start a new chat' type='text'  />
          </div>
        </div>

        <div className='sidebar__chats'>
          <SideBarChat addNewChat/>
          {
            rooms.map(room =>(
              <SideBarChat key={room.id} id = {room.id} name= {room.data.name}/>
            ))
          }

        </div>
    </div>
  )
}

export default Sidebar