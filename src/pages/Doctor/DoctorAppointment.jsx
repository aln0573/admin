import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments , completeAppointment , cancelAppointment} = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, ruppes } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-auto my-5 p-4">
      <p className="text-xl font-semibold mb-4">All Appointments</p>

      <div className="bg-white border rounded shadow max-h-[80vh] min-h-[50vh] overflow-y-auto">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-3 px-6 py-3 border-b bg-gray-100 text-sm font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div key={index} className="grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] grid-cols-1 sm:gap-3 gap-2 px-6 py-4 border-b text-sm items-center">
              <p className="font-medium">{index + 1}</p>

              <div className="flex items-center gap-3">
                <img src={item.userData.image} alt="user" className="w-10 h-10 rounded-full object-cover border"/>
                <p className="font-medium">{item.userData.name}</p>
              </div>
              <p>{item.payment ? 'Online' : 'Cash'}</p>
              <p>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p>{ruppes} {item.amount}</p>

              {
                item.cancelled 
                ? <p className='text-red-500 text-xs font-medium'>Cancelled</p>
                : item.isCompleted 
                ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                : <div className="flex gap-3 justify-center">
                <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="cancel" className="w-10 h-10 cursor-pointer hover:scale-110 transition"/>
                <img onClick={() => completeAppointment(item._id)} src={assets.tick_icon} alt="confirm" className="w-10 h-10 cursor-pointer hover:scale-110 transition"/>
              </div>
              }
            </div>
          ))
        ) : (
          <p className="text-center py-10 text-gray-500">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointment;
