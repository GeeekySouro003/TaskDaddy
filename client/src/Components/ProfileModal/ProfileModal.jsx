import { Modal, useMantineTheme } from '@mantine/core';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../Actions/uploadAction.js';
import { updateUser } from '../../Actions/userAction.js';

const ProfileModal = ({ modalOpened, setModalOpened, data }) => { // Fixed function definition syntax
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
  
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("image", profileImage);
      UserData.profilePicture = fileName;
  
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
  
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("image", coverImage);
      UserData.coverPicture = fileName;
  
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
  
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  // Define overlay styles
  const overlayStyles = {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
    opacity: 0.55,
    blur: 3,
    backdropFilter: 'blur(3px)'
  };

  // Define modal styles
  const modalStyles = {
    width: '60%', // Set width to 60% of viewport
    margin: 'auto', // Center the modal horizontally
    padding: '20px', // Add padding for spacing
    borderRadius: '8px', // Add border radius for rounded corners
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white, // Set background color
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black // Set text color
  };

  // Define form styles
  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  return (
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      styles={{ modal: modalStyles }} // Apply modal styles
    >
      <div style={overlayStyles}> {/* Apply overlay styles */}
        <form className='infoForm' style={formStyles} onSubmit={handleSubmit}>
          <h3>Your Info!</h3>
          <input
            type='text'
            className='infoInput'
            name='firstname'
            placeholder='First Name'
            onChange={handleChange}
            value={formData.firstname || ''} // Use lowercase 'formData' here
          />

          <input
            type='text'
            className='infoInput'
            name='middlename'
            placeholder='Middle Name'
            onChange={handleChange}
            value={formData.middlename || ''} // Use lowercase 'formData' here
          />

          <input
            type='text'
            className='infoInput'
            name='lastname'
            placeholder='Last Name'
            onChange={handleChange}
            value={formData.lastname || ''} // Use lowercase 'formData' here
          />

          <input
            type='text'
            className='infoInput'
            name='workplace'
            placeholder='Recently worked on'
            onChange={handleChange}
            value={formData.workplace || ''} // Use lowercase 'formData' here
          />

          <input
            type='text'
            className='infoInput'
            name='livesin'
            placeholder='Where do you stay?'
            onChange={handleChange}
            value={formData.livesin || ''} // Use lowercase 'formData' here
          />

          <input
            type='text'
            className='infoInput'
            name='specializes'
            placeholder='Expertise in'
            onChange={handleChange}
            value={formData.specializes || ''} // Use lowercase 'formData' here
          />

          <div>
            <label htmlFor='profileImg'>Profile Image</label>
            <input type='file' name='profileImage' id='profileImg' onChange={onImageChange} />
          </div>

          <div>
            <label htmlFor='coverImg'>Cover Picture</label>
            <input type='file' name='coverImage' id='coverImg' onChange={onImageChange} />
          </div>

          <button className='button' onClick={handleSubmit}>Update</button>
        </form>
      </div>
    </Modal>
  );
}

export default ProfileModal;
