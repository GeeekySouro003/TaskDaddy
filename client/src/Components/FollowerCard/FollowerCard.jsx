import React, { useEffect, useState } from 'react'
import './FollowerCard.css'
import User from '../User/User.jsx'
import { useSelector } from 'react-redux'
import { getAllUser } from '../../Api/UserRequests.js'
const FollowerCard = () => {
    const[persons,setPersons] =useState([]);
    const {user}=useSelector((state)=> state.AuthReducer.authData);

    useEffect(()=> {
        const fetchPersons = async () => {
            const {data} =await getAllUser();
            setPersons(data);
            console.log(data)
        };
        fetchPersons()
    },[]);
  return (
   <div className="FollowerCard">
    <h2>People you may Know ?</h2>
     {persons.map((person,id) =>{
        if(person._id !== user._id)
        {
            return(
                <User person ={person} key={id}/>
             )

        }
       
     })}
   
   </div>
  )
}

export default FollowerCard