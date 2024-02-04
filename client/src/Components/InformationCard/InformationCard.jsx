// InformationCard.jsx

import React, { useEffect, useState } from 'react';
import { FaUserEdit } from "react-icons/fa";
import './InformationCard.css';
import ProfileModal from '../ProfileModal/ProfileModal.jsx';
import Profile from '../../Pages/Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../../Api/UserRequests.js'
import { logOut } from '../../Actions/AuthAction.js';

const InformationCard = () => {
  const[modalOpened,setModalOpened] =useState(false);

  const dispatch=useDispatch();
  const params=useParams();

  const profileUserId= params.id
  const [profileUser,setProfileUser]=useState({})

  const {user} =useSelector((state)=>state.AuthReducer.authData)

  console.log("modalOpened in InformationCard:", modalOpened);

  const handleLogOut = () => {
    dispatch(logOut())
  }

  useEffect(()=>{
    const fetchProfileUser = async() =>{
      if(profileUserId === user._id)
      {
        setProfileUser(user)
        
        
      }
      else{
        const profileUser =await UserApi.getUser(profileUserId)
        setProfileUser(profileUser)
        
        
      }
    }
    fetchProfileUser();
  },[user])

  return (
    <div className="InformationCard">
      <div className="infoHeader">
        <h3>Profile Info!</h3>
        {user._id === profileUserId ? (<div>
          <FaUserEdit size={25} onClick={()=>setModalOpened(true)} />
          <ProfileModal 
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          data={user}
          />
        </div>) :(
          ""
          )}
        
      </div>

      <div className="info">
        <span><b>Recent Work: </b></span>
        <span>{profileUser.workplace}</span>
      </div>

      <div className="info">
        <span><b>Resides at: </b></span>
        <span>{profileUser.livesin}</span>
      </div>

      <div className="info">
        <span><b>Specializes in: </b></span>
        <span>{profileUser.specializes}</span>
      </div>

      <button className="Btn" onClick={handleLogOut} >
        <div className="sign">
          <svg viewBox="0 0 512 512">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
          </svg>
        </div>
        <div className="text">Logout</div>
      </button>
    </div>
  );
}

export default InformationCard;
