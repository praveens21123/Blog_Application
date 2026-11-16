import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BASE_URL, token } from '../utils/config'
import { AuthC } from '../context/AuthContext'

const SingleBlog = () => {
  const [blog, setBlog] = useState({})
  const {id} = useParams()
  const {user} = useContext(AuthC)
  const navigate = useNavigate()
  
  useEffect(()=>{
    fetchBlog()
  }, [])

  const fetchBlog = async() => {
    const res = await fetch(`${BASE_URL}/blog/getsingleblog/${id}`)
    const {blog} = await res.json()
    setBlog(blog)
  }

  const deleteHandler = async() => {
    try{
      const res = await fetch(`${BASE_URL}/blog/deleteblog/${id}`, {
        method:"DELETE",
        headers:{
          "Content-type":"application/json",
           "authorization":`Bearer ${token}`
        }
      })
      const data = await res.json()
      console.log(data);
      navigate("/")
    }catch(err){
      console.log(err);
    }
  }
  
  return (
    <div className='container'>
      <h2>SingleBlog</h2>
      {
        blog && Object.keys(blog).length > 0 && 
        <div className="row d-flex justify-content-center">
          <img src={blog.poster} alt={blog.title} className='w-25'/>
          <h5>Title : {blog.title}</h5>
          <h6>SubTitle : {blog.subTitle}</h6>
          <p>Content : {blog.content}</p>
          <h6>Author : {blog.user.name}</h6>
        </div>
      }
      {
       user?.name == blog.user?.name && 
        <div>
            <Link to={`/editblog/${blog._id}`}>
            <button className="btn btn-info me-2">Edit</button>
            </Link>
            <button className="btn btn-danger" onClick={() => deleteHandler(blog._id)}>Delete</button>
        </div>
      }
    </div>
  )
}

export default SingleBlog