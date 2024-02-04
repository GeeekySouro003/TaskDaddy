import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../Actions/userAction';

const User = ({ person }) => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const[following,setFollowing]=useState(person.followers.includes(user._id))
  const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();

  const handleFollow = () => {
      following ? 
      dispatch(unfollowUser(person._id, user)):
      dispatch(followUser(person._id, user))
      setFollowing((prev)=>!prev)
    
  };

  return (
    <div className="follower">
      <div>
        <img
          src={person.CoverPicture ? `${serverPublic}${person.ProfilePicture}` : `${serverPublic}defaultProfile.png`}
          className="followerimg"
          alt=""
        />
        <div className="followername">
          <span>{person.firstname}</span>
          <span>#{person.username}</span>
        </div>
      </div>
      <button className={following? "followbtn UnfollowButton" : "followbtn"} onClick={handleFollow}>
       {following? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
