import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {setAToken , backendUrl} = useContext(AdminContext)
  const {dToken , setDToken} = useContext(DoctorContext)

  const sumbitHandler = async (e) => {
    e.preventDefault()
    
    try {
      if(state === 'Admin'){
        const {data} = await axios.post(backendUrl + '/api/admin/login', {email ,password})
        if(data.success){
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
        } else {
          toast.error(data.message)
        }
      }else {
        const {data} = await axios.post('https://serenocare.onrender.com/api/doctor/login', {email , password})
        if(data.success){
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
          console.log(data.token)
        }else 
        toast.error(data.message)
      }
    } catch (error) {
      
    }
  }

  return (
    <form onSubmit={sumbitHandler} className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-red-700 mb-2">{state} Login</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Welcome back! Please enter your credentials</p>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"/>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"/>
        </div>

        <button type="submit" className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition duration-200">Login</button>

        <p className="text-center text-sm text-gray-600 mt-4">
          {state === 'Admin' ? (
            <>
              Doctor Login?{' '}
              <span onClick={() => setState('Doctor')} className="text-red-600 cursor-pointer hover:underline">Click here</span>
            </>
          ) : (
            <>
              Admin Login?{' '}
              <span onClick={() => setState('Admin')} className="text-red-600 cursor-pointer hover:underline">Click here</span>
            </>
          )}
        </p>
      </div>
    </form>
  )
}

export default Login
