import React, { useEffect } from 'react'
import Posting from '../Posting/Posting'
import {useDispatch,useSelector} from  'react-redux';
import './Posts.css';
import { getTimelinePosts } from '../../Actions/postAction';
import {useParams} from 'react-router-dom';
const Posts = () => {
  const params =useParams();
const dispatch =useDispatch();
const {user} =useSelector((state)=>state.AuthReducer.authData)
let {posts,loading}=useSelector((state)=>state.PostReducer)

useEffect(()=>{
  dispatch(getTimelinePosts(user._id))
},[]);


if(!posts) return "No Posts"
if(params.id) posts =posts.filter((post)=> post.userId === params.id)
  return (
    <div className="Posts">
        { loading ? "Fetching Posts..." : 
        posts.map((post,id)=>{
            return <Posting data={post}  id={id}/>
        })}

    </div>
  )
}

export default Posts