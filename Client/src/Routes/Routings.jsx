import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Home'
import SingleBlog from '../Components/SingleBlog'
import Register from '../Components/Register'
import Login from '../Components/Login'
import CreateBlog from '../Components/CreateBlog'
import EditBlog from '../Components/EditBlog'
import Users from '../Components/Users'

const Routings = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/blog/:id' element={<SingleBlog />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/createblog' element={<CreateBlog />}/>
      <Route path='/editblog/:id' element={<EditBlog />}/>

      {/* Admin routes */}
      <Route path='/users' element={<Users />}/>

      {/* 404 Route */}
      <Route path='/*' element={<h6>Page Not Found!</h6>}/>
    </Routes>
  )
}

export default Routings