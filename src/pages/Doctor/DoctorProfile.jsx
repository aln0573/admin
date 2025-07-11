import React, { useEffect, useContext, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, setProfileData } = useContext(DoctorContext);
  const { ruppes } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  // Save profile changes to backend
  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
        about: profileData.about,
      };

      const response = await axios.post(
        'https://serenocare-backend.onrender.com/api/doctor/update-doctor',
        updateData,
        { headers: { dToken } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  const handleChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  return profileData && (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={profileData.image}
            alt="Doctor"
            className="w-48 h-48 rounded-full object-cover border-4 border-[#FFBA00]"
          />
        </div>

        {/* Profile Details */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            {profileData.name}
          </h2>

          <p className="text-gray-600 mt-1">
            {profileData.degree} - {profileData.speciality}
          </p>

          <button className="mt-2 px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            {profileData.experience} Year{profileData.experience > 1 ? 's' : ''} experience
          </button>

          {/* About */}
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-700">About</h3>
            {isEdit ? (
              <textarea
                value={profileData.about}
                onChange={e => handleChange('about', e.target.value)}
                className="w-full resize-none bg-transparent text-gray-800 text-sm leading-relaxed outline-none border-b border-gray-200"
              />
            ) : (
              <p className="text-gray-600 mt-1 leading-relaxed">
                {profileData.about}
              </p>
            )}
          </div>

          {/* Fees */}
          <p className="mt-4 text-gray-700 font-medium">
            Appointment Fees:
            <span className="ml-2 text-black">
              {isEdit ? (
                <input
                  type="number"
                  value={profileData.fees}
                  onChange={e => handleChange('fees', e.target.value)}
                  className="bg-transparent border-none text-sm text-gray-800 px-1 outline-none w-20"
                />
              ) : (
                `${ruppes} ${profileData.fees}`
              )}
            </span>
          </p>

          {/* Address */}
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-700">Address</h3>
            <div className="mt-1 space-y-1">
              {isEdit ? (
                <>
                  <input
                    type="text"
                    value={profileData.address.line1}
                    onChange={e => handleAddressChange('line1', e.target.value)}
                    className="w-full bg-transparent border-none text-sm text-gray-800 outline-none"
                  />
                  <input
                    type="text"
                    value={profileData.address.line2}
                    onChange={e => handleAddressChange('line2', e.target.value)}
                    className="w-full bg-transparent border-none text-sm text-gray-800 outline-none"
                  />
                </>
              ) : (
                <>
                  <p className="text-gray-600">{profileData.address.line1}</p>
                  <p className="text-gray-600">{profileData.address.line2}</p>
                </>
              )}
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="available"
              className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
              checked={profileData.available}
              disabled={!isEdit}
              onChange={e => handleChange('available', e.target.checked)}
            />
            <label htmlFor="available" className="text-gray-700">Available</label>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            {isEdit ? (
              <>
                <button
                  onClick={updateProfile}
                  className="px-6 py-2 bg-[#FFBA00] hover:bg-[#ff9f00] text-white rounded-lg shadow"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    getProfileData();
                    setIsEdit(false);
                  }}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded-lg shadow"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-6 py-2 bg-red-800 hover:bg-red-600 text-white rounded-lg shadow"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
