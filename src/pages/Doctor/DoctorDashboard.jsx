import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { dToken, getDashData, dashData, setDashData , completeAppointment , cancelAppointment } = useContext(DoctorContext);
  const { ruppes, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="Doctors" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{ruppes} {dashData.earnings}</p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="Appointments"/>
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="Patients" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img className="w-5" src={assets.list_icon} alt="" />
            <h2 className="font-semibold text-gray-700">Latest Bookings</h2>
          </div>
        </div>

        <div className="pt-4 border border-t-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {dashData.latestAppointments.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 shadow hover:shadow-md transition-shadow flex flex-col items-center text-center gap-3">
              <img className="rounded-full w-16 h-16 object-cover border" src={item.userData.image} alt={item.userData.name}/>

              <div className="flex-1 text-sm w-full">
                <p className="text-gray-800 font-medium truncate">{item.userData.name}</p>
                <p className="text-gray-500 text-xs">{slotDateFormat(item.slotDate)}</p>

                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">Completed</p>
                ) : (
                  <div className="flex gap-3 justify-center">
                    <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="cancel" className="w-10 h-10 cursor-pointer hover:scale-110 transition"/>
                    <img onClick={() => completeAppointment(item._id)} src={assets.tick_icon} alt="confirm" className="w-10 h-10 cursor-pointer hover:scale-110 transition"/>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
