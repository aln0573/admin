import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments , cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, ruppes } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Appointments</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-4 px-6 border-b bg-gray-50">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">#</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">Patient</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">Age</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">Date & Time</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">Doctor</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">Fees</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">Actions</p>
        </div>

        {appointments.map((item, index) => (
          <div key={index} className={`sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-4 px-6 border-b hover:bg-gray-100 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <p className="text-gray-700 font-medium max-sm:hidden">{index + 1}</p>

            <div className="flex items-center gap-3">
              <img className="w-10 h-10 object-cover rounded-full border" src={item.userData.image} alt="Patient"/>
              <p className="text-gray-800 font-medium">{item.userData.name}</p>
            </div>

            <p className="text-gray-600 font-medium max-sm:hidden">{calculateAge(item.userData.dob)}</p>

            <p className="text-gray-600">{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            <div className="flex items-center gap-3">
              <img className="w-10 h-10 object-cover rounded-full border" src={item.docData.image} alt="Doctor"/>
              <p className="text-gray-800 font-medium">{item.docData.name}</p>
            </div>

            <p className="text-gray-700 font-semibold">{ruppes} {item.amount}</p>

            {
              item.cancelled 
              ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : item.isCompleted
              ? <p className='text-green-600'>Completed</p>
              : <button  onClick={()=> cancelAppointment(item._id)} className="flex items-center justify-center w-10 h-10 rounded-full bg-red-400 hover:bg-red-200 transition-colors duration-200">
              <img className="w-11 pt-2" src={assets.cancel_icon} alt="Cancel" />
            </button>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
