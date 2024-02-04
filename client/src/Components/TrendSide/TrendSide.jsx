import React, { useState } from 'react';
import { BiHomeSmile } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { GrUserSettings } from "react-icons/gr";
import './TrendSide.css';
import { Link } from 'react-router-dom';
import TrendingCard from '../TrendingCard/TrendingCard';
import ProfileModal from '../ProfileModal/ProfileModal'; // Assuming you have this component
import ShareModal from '../ShareModal/ShareModal'; // Assuming you have this component

const TrendSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="TrendSide">
      <div className="navIcon">
        <Link to="/home"> {/* Corrected the Link path */}
          <BiHomeSmile size={28} color='#3a0ca3' />
        </Link>
        <IoIosNotificationsOutline size={30} color='#ff7900' />
        
        <Link to = "/chat">
        <BiSolidMessageSquareDots size={28} color='#d55d92' />
        </Link>
        <GrUserSettings size={28} color='#2c0735' />
      </div>
      <TrendingCard />

      <button className='button r-button' onClick={() => setModalOpened(true)}>
        Share Now
      </button>
      <ShareModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
}

export default TrendSide;
