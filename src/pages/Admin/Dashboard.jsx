import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const Dashboard = () => {
  const { aToken, dashData, getDashData, cancelAppointment } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return dashData && (
    <div className="w-full max-w-7xl mx-auto px-5 py-10 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Doctors', count: dashData.doctors, icon: assets.doctor_icon },
          { label: 'Appointments', count: dashData.appointments, icon: assets.appointments_icon },
          { label: 'Patients', count: dashData.patients, icon: assets.patients_icon },
        ].map((card, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow hover:shadow-md transition-all"
          >
            <img src={card.icon} alt={card.label} className="w-14" />
            <div>
              <p className="text-2xl font-bold text-gray-700">{card.count}</p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Bookings Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white border border-b-0 rounded-t-lg">
        <img className="w-5" src={assets.list_icon} alt="List" />
        <h2 className="text-lg font-semibold text-gray-700">Latest Bookings</h2>
      </div>

      {/* Latest Bookings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white border rounded-b-lg p-6">
        {dashData.lastestAppointments.map((item, index) => (
          <div key={index} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 shadow hover:shadow-md transition-all">
            <img
              className="w-16 h-16 rounded-full border object-cover"
              src={item.docData.image}
              alt={item.docData.name}
            />
            <div className="flex-1">
              <p className="text-gray-800 font-medium text-sm">{item.docData.name}</p>
              <p className="text-gray-500 text-xs">{slotDateFormat(item.slotDate)}</p>

              {item.cancelled ? (
                <p className="text-red-500 text-xs mt-1 font-semibold">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-600 text-xs mt-1 font-semibold">Completed</p>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="mt-2 inline-flex items-center gap-1 text-sm px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-600 font-semibold rounded transition"
                >
                  <img src={assets.cancel_icon} alt="Cancel" className="w-4" />
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
