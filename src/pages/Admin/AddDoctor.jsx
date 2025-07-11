import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

   const [docImg , setDocImg] = useState(false)
   const [name , setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [experience, setExperience] = useState('1 Year')
   const [fees, setFees] = useState('')
   const [about, setAbout] = useState('')
   const [speciality , setSpeciality] = useState('General physician')
   const [degree, setDegree] = useState('')
   const [address1 , setAddress1] = useState('')
   const [address2 , setAddress2] = useState('')

   const {backendUrl , aToken} = useContext(AdminContext)

   const onSubmitHandler = async (e) => {
      e.preventDefault()

      try {

        if(!docImg){
          return toast.error('Image Not Selected')
        }

        const formData = new FormData()
        formData.append('image', docImg)
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password',password)
        formData.append('experience', experience);
        formData.append('fees', Number(fees))
        formData.append('about',about)
        formData.append('speciality', speciality)
        formData.append('degree', degree)
        formData.append('address', JSON.stringify({line1: address1, line2: address2}))

        formData.forEach((value , key) => {
          console.log(`${key}: ${value}`)
        })

        const {data} = await axios.post('https://serenocare-backend.onrender.com/api/admin/add-doctors', formData, {
          headers: {aToken}
        })

        if(data.success){
          toast.success(data.message)
          setDocImg(false)
          setName('')
          setEmail('')
          setPassword('')
          setFees('')
          setAbout('')
          setDegree('')
          setAddress1('')
          setAddress2('')
        } else{
          toast.error(data.message)
        }


      } catch (error) {
        toast.error(error.message)
        console.log(error)
      }
   }

 
  return (
    <form onSubmit={onSubmitHandler} className='p-6 w-full flex flex-col items-center'>

      <div className='bg-white p-8 border rounded-lg w-full max-w-5xl shadow-md max-h-[85vh] overflow-y-auto'>
              <h1 className='mb-6 text-2xl font-bold text-gray-800'>Add Doctor</h1>
        <div className='flex items-center gap-4 mb-10'>
          <label htmlFor="doc-img" className="cursor-pointer flex items-center gap-3">
            <img className='w-20 h-20 bg-gray-100 rounded-full object-cover' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Upload" />
            <p className="text-gray-600">Upload doctor<br />picture</p>
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-700'>
          <div className='flex flex-col gap-4'>

            <div className='flex flex-col'>
              <label className='mb-1 font-medium'>Doctor name</label>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="text" placeholder='Full name' required />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-medium'>Doctor Email</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="email" placeholder='Email address' required />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-medium'>Doctor Password</label>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="password" placeholder='Password' required />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-medium'>Experience</label>
              <select onChange={(e)=> setExperience(e.target.value)} value={experience} className='border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400'>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>{`${i + 1} Year`}</option>
                ))}
              </select>
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-medium'>Fees</label>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="number" placeholder='Consultation fee' required />
            </div>
          </div>

          <div className='flex flex-col gap-4'>

            <div className='flex flex-col'>
              <label className='mb-1 font-medium'>Speciality</label>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400'>
                <option value={'General physician'}>General physician</option>
                <option value={'Gynecologist'}>Gynecologist</option>
                <option value={'Dermatologist'}>Dermatologist</option>
                <option value={'Pediatricians'}>Pediatricians</option>
                <option value={'Neurologist'}>Neurologist</option>
                <option value={'Gastroenterologist'}>Gastroenterologist</option>
              </select>
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-medium'>Education</label>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="text" placeholder='Degree/Qualification' required />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-medium'>Address Line 1</label>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="text" placeholder='Address 1' required />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-medium'>Address Line 2</label>
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="text" placeholder='Address 2' />
            </div>
          </div>
        </div>

        <div className='mt-8'>
          <label className='block mb-2 font-medium text-gray-700'>About Doctor</label>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400' placeholder='Write something about the doctor...' rows={5}></textarea>
        </div>

        <button type="submit" className='mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded transition-colors duration-200'>
          Add Doctor
        </button>
      </div>
    </form>
  )
}

export default AddDoctor
