import React, { useEffect, useState } from 'react'
import { BASE_URL, token } from '../utils/config.js'
import { useNavigate, useParams } from 'react-router-dom'

const EditBlog = () => {
  const [blog, setBlog] = useState({
    title:undefined,
    subTitle:undefined,
    poster:undefined,
    content:undefined,
  })
  const {id} = useParams()
  const navigate = useNavigate()

  
  useEffect(()=>{
    fetchCurrBlog()
  }, [])

  const fetchCurrBlog = async() => {
    const res = await fetch(`${BASE_URL}/blog/getsingleblog/${id}`)
    const {blog} = await res.json()
    setBlog({
    title:blog.title,
    subTitle:blog.subTitle,
    poster:blog.poster,
    content:blog.content
    })
  }

  const changeHandler = (event) => {
    const {id, value} = event.target
    setBlog(preState => ({...preState, [id]:value}))
  }

  const submitHandler = async(event) => {
    event.preventDefault()

    try{      
      const response = await fetch(`${BASE_URL}/blog/editblog/${id}`, {
        method:"PUT",
        headers:{
          "Content-type":"application/json",
          "authorization":`Bearer ${token}`
        }, 
        body: JSON.stringify(blog)
      })
      const data = await response.json()
      console.log(data);
      navigate(`/blog/${id}`)
      
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className='container'>
      <h4>Edit your Blog here!</h4>
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <form action="" onSubmit={submitHandler}>
            <input type="text" className='form-control mb-2' placeholder='Enter your Title' id="title" onChange={changeHandler} value={blog.title}/>
            <input type="text" className='form-control mb-2' placeholder='Enter your SubTitle' id="subTitle" onChange={changeHandler} value={blog.subTitle}/>
            <input type="text" className='form-control mb-2' placeholder='Enter your Poster' id="poster" onChange={changeHandler} value={blog.poster}/>
            <textarea className='form-control mb-2' id="content" name="content" cols="3" rows="5" placeholder='Enter your content' onChange={changeHandler} value={blog.content}></textarea>
            <button className='btn btn-primary' type="submit">Edit Blog</button>
          </form>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  )
}

export default EditBlog