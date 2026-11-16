import React, { useEffect, useState } from 'react'
import { BASE_URL, token } from '../utils/config'
import { toast } from 'react-toastify'

const Users = () => {
  const [users, setUsers] = useState([])
  const [deleted, setDeleted] = useState(false)

  useEffect(()=>{
    fetchUsers()
  }, [deleted])

  const fetchUsers = async() => {
    const res = await fetch(`${BASE_URL}/user/getallusers`, {
      method:"GET",
      headers:{
        "Content-type":"application/json",
        "authorization":`Bearer ${token}`
      }
    })
    const {users} = await res.json()
    setUsers(users)
  }

  const deleteUsers = async(userId) => {

    try{
      const res = await fetch(`${BASE_URL}/user/deleteuser/${userId}`, {
        method:"DELETE",
        headers:{
        "Content-type":"application/json",
        "authorization":`Bearer ${token}`
      }
      })
      const data = await res.json()
      toast.success(data.message)
      setDeleted(!deleted)
      // setTimeout(()=>{
      //   setDeleted(false)
      // }, 1000)
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className='container'>
      {
        console.log("Rendered!")
      }
      <h2>Users</h2>
      {
        users && users.length > 0 ? users.map((user, _i)=>(
          user.role == "user" && <div className="row border border-black m-2 p-2" key={_i}>
            <div className="col-lg-4">
              <h5>id : {user._id}</h5>
              <h6>UserName: {user.name}</h6>
            </div>
            <div className="col-lg-4">
              <h5>E-mail : {user.email}</h5>
              <h6>Phone No: {user.phoneNumber}</h6>
            </div>
            <div className='col-lg-4'>
              <button className='btn btn-danger' onClick={() => deleteUsers(user._id)}>Delete</button>
            </div>
          </div>
        )) : <h6>No Users Found</h6>
      }
    </div>
  )
}

export default Users