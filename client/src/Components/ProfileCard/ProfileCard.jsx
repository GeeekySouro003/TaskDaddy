import React from 'react';
import Cover from '../../images/cover.png';
import ProfilePic from '../../images/profile pic.png';
import CountUp from 'react-countup';
import './ProfileCard.css';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileCard = ({location}) => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const posts=useSelector((state)=>state.PostReducer.posts);
  const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;




  return (
    <div className="ProfileCard">
      <div className="ProfileImg">
        <img src={user.coverPicture? `${serverPublic}${user.coverPicture}` : `${serverPublic}defaultCoverPicture.jpg`} alt='Cover Picture'  />
        <img src={user.ProfilePicture? `${serverPublic}${user.ProfilePicture}` : `${serverPublic}defaultProfile.png`} alt='Profile Picture' />
      </div>
      <div className="ProfileName">
        <span>{user.firstname} {user.middlename} {user.lastname}</span>
        <span>{user.worksAt? user.worksAt:"Write about yourself"}</span>
      </div>
 
      <div className="follow">
        <hr />
        <div>
          <div className="followers">
            <span>
              { /*<CountUp start={0} end={568} duration={5} /> */}
              {user.followers.length}
            </span>
            <span>Followers</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="post">
                <span>{posts.filter((post)=>post.userId === user._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}

          <div className="vl"></div>
          <div className="following">
            <span>
              { /*<CountUp end={56} duration={4} />*/}
              {user.following.length}
              </span> 
            <span>Following</span>
          </div>
        </div>
        <hr />
      </div>
      {location === "profilePage" ? (
              ""
      )  : ( <span>
        <Link  style={{textDecoration:"none",color:"inherit"}}to={`/profile/${user._id}`}> My Profile</Link>
       </span>
       )}
    </div>
  );
};

export default ProfileCard;
