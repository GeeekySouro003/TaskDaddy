import React from 'react';
import { Link } from 'react-router-dom';
import { BiHomeSmile, BiSolidMessageSquareDots } from 'react-icons/bi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { GrUserSettings } from 'react-icons/gr';

const NavIcons = () => {
  return (
    <div className="navIcons">
      <Link to="/home">
        <BiHomeSmile size={28} color='#3a0ca3' />
      </Link>
      <IoIosNotificationsOutline size={30} color='#ff7900' />
      <Link to="/chat">
        <BiSolidMessageSquareDots size={28} color='#d55d92' />
      </Link>
      <GrUserSettings size={28} color='#2c0735' />
    </div>
  );
};

export default NavIcons;
