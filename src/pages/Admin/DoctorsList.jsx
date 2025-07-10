import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors , changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4">All Doctors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {doctors.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer group bg-white">
            <div className="w-full h-48 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-red-600 transition">{item.name}</h2>
              <p className="text-sm text-gray-600 mb-4">{item.speciality}</p>

              <div className="flex items-center gap-2">
                <input onChange={()=> changeAvailability(item._id)} type="checkbox" checked={item.available} className="accent-green-400 w-5 h-5 cursor-default"/>
                <p className="text-sm text-gray-700">{item.available ? 'Available' : 'Unavailable'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
