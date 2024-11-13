import { useState, useEffect } from 'react';
import axios from 'axios';
const BASE_URL = 'http://localhost:8000';

export default function SettingsPage() {
  const [isResignationModalOpen, setIsResignationModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [test, setTest] = useState({
    user: {
      username: "",
      email: "",
      first_name: "",
      last_name: ""
    },
    bio: "",
    phone_number: "",
    birth_date: null,
    emp_status: "",
    department: {
      id: 0,
      department_name: "",
      department_location: ""
    },
    role: {
      id: 0,
      role: ""
    },
    bank_details: {
      account_holder_name: "",
      account_num: "",
      branch_code: "",
      bank_name: ""
    },
    img: null,
    gender: "",
    nic: "",
    salary: 0,
    bonus: 0,
    employee_benefits: {
      id: 0,
      benefit: [],
      employee: 0
    }
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/emp/profile/`, {
          headers: { Authorization: `Token ${token}` },
        });
        const data = response.data;
        setTest({
          ...data,
          img: data.img ? `${BASE_URL}${data.img}` : '',
          bank_details: { ...data.bank_details },
          employee_benefits: data.employee_benefits || { benefit: [...data.employee_benefits.benefit] }
        });
        setImagePreview(data.img ? `${BASE_URL}${data.img}` : '');
        console.log(response.data);
        
      } catch (error) { 
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleSaveChanges = async () => {
    try {
      const formdata = new FormData();

      Object.entries(test).forEach(([key, value]) => {
        if (key === 'bank_details' || key === 'employee_benefits') {
          Object.entries(value).forEach(([innerKey, innerValue]) => {
            if (Array.isArray(innerValue)) {
              innerValue.forEach(benefit => {
                formdata.append(`${key}[benefit][]`, benefit.benefit); // Adjust this according to your backend
                formdata.append(`${key}[benefit_evaluate][]`, benefit.benefit_evaluate);
              });
            } else {
              formdata.append(`${key}[${innerKey}]`, innerValue);
            }
          });
        } else if (key === 'birth_date') {
          const formattedBirthDate = value ? new Date(value).toISOString().split('T')[0] : '';
          formdata.append(key, formattedBirthDate);
        }else if (key !== 'img') { // Skip img here to check its type
          formdata.append(key, value); 
        }
      });

      // Ensure the image file itself (not base64) is appended
      if (test.img instanceof File) {
        formdata.append('img', test.img);
      }

      await axios.put(`${BASE_URL}/emp/profile/`, formdata, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error.response ? error.response.data : error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    setTest((prevData) => {
      let dataCopy = { ...prevData };
      let temp = dataCopy;
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          temp[key] = value;
        } else {
          temp = temp[key];
        }
      });
      return dataCopy;
    });
  };

  // Handle image change
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setTest({ ...test, img: file });
  //   }
  // };



  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setTest({ ...test, img: file });
  //   }
  // };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTest({ ...test, img: file });
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl); // Set preview URL
      // Clean up the object URL when the component unmounts or image changes
      return () => URL.revokeObjectURL(imageUrl);
    }
  };


  return (
    <>
      <div className='flex justify-between pr-9'>
        <h1 className="text-3xl font-bold pl-8 pb-4 selected-efect-3d">Settings</h1>
        <button
          onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md mb-4 font-semibold hover:shadow-inner hover:shadow-slate-700 effect-3d"
        >
          {isEditing ? 'Save Changes' : 'Edit'}
        </button>
      </div>
      <div className="p-8 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-xl font-semibold">User Information</h3>
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-32 h-32 mb-2">
            <img
                src={imagePreview || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-2 border-gray-300"
              />
              {isEditing && (
                <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
                title="Upload a profile picture"
              />
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => document.querySelector('input[type="file"]').click()}
                className="text-blue-600 underline"
              >
                Change Picture
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className='flex justify-between rounded col-span-2'>
            <input
              type="text"
              name="user.first_name"
              placeholder="First Name"
              value={test.user.first_name || ''}
              onChange={handleInputChange}
              className="border p-2 rounded col-span-2"
              disabled={!isEditing}
            />
            <input
              type="text"
              name="user.last_name"
              placeholder="Last Name"
              value={test.user.last_name || ''}
              onChange={handleInputChange}
              className="border p-2 rounded"
              disabled={!isEditing}
            />
            <input
              type="email"
              name="user.email"
              placeholder="Last Name"
              value={test.user.email || ''}
              onChange={handleInputChange}
              className="border p-2 rounded col-span-2"
              disabled={!isEditing}
            />
            </div>
            <textarea
              name="bio"
              placeholder="Bio"
              value={test.bio || ''}
              onChange={handleInputChange}
              className="border p-2 rounded col-span-2"
              disabled={!isEditing}
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={test.phone_number|| ''}
              onChange={handleInputChange}
              className="border p-2 rounded"
              disabled={!isEditing}
            />
            <select
              name="gender"
              value={test.gender ||  ''}

              onChange={handleInputChange}
              className="border p-2 rounded"
              disabled={!isEditing}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="text"
              name="nic"
              placeholder="NIC"
              value={test.nic}
              onChange={handleInputChange || ''}
              className="border p-2 rounded"
              disabled={!isEditing}
            />
            <input
              type="date"
              name="birth_date" // Ensure this matches the backend field name
              placeholder="Birth Date"
              value={test.birth_date || ""}
              onChange={handleInputChange}
              className="border p-2 rounded"
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-xl font-semibold">Bank Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="bank_details.account_holder_name"
              placeholder="Account Holder Name"
              value={test.bank_details.account_holder_name || ''}
              onChange={handleInputChange}
              className="border p-2 rounded"
              disabled={!isEditing}
            />
            <input
              type="text"
              name="bank_details.account_num"
              placeholder="Account Number"
              value={test.bank_details.account_num || ''}
              onChange={handleInputChange}
              className="border p-2 rounded"
              disabled={!isEditing}
            />
            <input
              type="text"
              name="bank_details.branch_code"
              placeholder="Branch Code"
              value={test.bank_details.branch_code || ''}
              onChange={handleInputChange}
              className="border p-2 rounded"
              disabled={!isEditing}
            />
            <input
              type="text"
              name="bank_details.bank_name"
              placeholder="Bank Name"
              value={test.bank_details.bank_name || ''}
              onChange={handleInputChange}
              className="border p-2 rounded"
              disabled={!isEditing}
            />
          </div>
        </div>

      {/* View-Only Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-2">
        <h3 className="text-xl font-semibold">Employment Details</h3>
        <p><strong>Salary:</strong> PKR.{test.salary}</p>
        <p><strong>Bonus:</strong> PKR.{test.bonus}</p>
        <p>
          <strong>Benefits:</strong> 
          {test.employee_benefits.benefit && test.employee_benefits.benefit.length > 0 ? (
            test.employee_benefits.benefit.map((benefit, index) => (
              <span key={index}>{benefit.benefit}{index < test.employee_benefits.benefit.length - 1 ? ', ' : ''}</span>
            ))
          ) : (
            <span>No benefits</span>
          )}
        </p>
        <p><strong>Employment Status:</strong> {test.emp_status}</p>
        <p><strong>Department Name:</strong> {test.department?.department_name || 'Not Assigned'}</p>
        <p><strong>Department Location:</strong> {test.department?.department_location || 'Not Assigned'}</p>
      </div>  

      {/* Resignation Button */}
      <button onClick={() => setIsResignationModalOpen(true)} className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md">
        Resignation
      </button>

      {/* Resignation Modal */}
      {isResignationModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-2">Resignation Form</h3>
            <div className="grid gap-4">
              <input type="text" name="resignation.firstName" placeholder="First Name" className="border p-2 rounded" />
              <input type="text" name="resignation.lastName" placeholder="Last Name" className="border p-2 rounded" />
              <textarea name="resignation.reason" placeholder="Reason for Resignation" className="border p-2 rounded"></textarea>
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button onClick={() => setIsResignationModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md">Submit Resignation</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
