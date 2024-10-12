import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import NavBar from '../components/NavBar';



const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    nCompanyID: "",
    cLastName: "",
    cOtherNames: "",
    cUseName: "",
    bSex: 0,
    nPMonthSalary: "",
    dDateOfBirth: "",
    dDateJoined: "",
    cBirthPlace: "",
    cBirthCountry: "",
    cPAddress1: "",
    cPAddress2: "",
    cPAddress3: "",
    cPAddress4: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [selectedFont, setSelectedFont] = useState('sans-serif');
  const navigate = useNavigate();

  const fontOptions = [
    { name: 'Default Sans-serif', value: 'sans-serif' },
    { name: 'Default Serif', value: 'serif' },
    { name: 'Default Monospace', value: 'monospace' },
    { name: 'AHFan', value: 'AHFan' },
  
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.cLastName) newErrors.cLastName = 'Last Name is required';
    if (!formData.cOtherNames) newErrors.cOtherNames = 'Other Names are required';
    if (!formData.nPMonthSalary) newErrors.nPMonthSalary = 'Salary is required';
    if (!formData.dDateOfBirth) newErrors.dDateOfBirth = 'Date of Birth is required';
    if (!formData.cBirthPlace) newErrors.cBirthPlace = 'Birth Place is required';
    if (!formData.cPAddress1) newErrors.cPAddress1 = 'Primary Address is required';
    return newErrors;
  };

  const handleInput = (event) => {
    setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post('http://localhost:8800/add_emp_details', formData);
        setSuccess('Employee added successfully!');
        setErrors({});
        alert('Employee added successfully!');
        navigate('/empdata'); 
      } catch (error) {
        console.error('Error adding employee:', error);
        setErrors({ form: 'Failed to add employee. Please try again.' });
      }
    }
  };

  return (
    <>
    <NavBar/>
   
    <div className="min-h-screen flex items-center justify-center bg-gray-300 py-8 mt-10">
      <div className="bg-white shadow-lg rounded-lg w-full lg:w-2/3 p-10 relative">
        <div className="absolute top-4 right-4">
          <select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className="p-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add Employee Details</h2>
        {errors.form && <p className="text-red-500 text-center mb-4">{errors.form}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company ID and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Company ID</label>
              <input
                type="text"
                name="nCompanyID"
                value={formData.nCompanyID}
                onChange={handleInput}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Company ID"
                style={{ fontFamily: selectedFont }}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Last Name</label>
              <input
                type="text"
                name="cLastName"
                value={formData.cLastName}
                onChange={handleInput}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Last Name"
                style={{ fontFamily: selectedFont }}
              />
              {errors.cLastName && <p className="text-red-500">{errors.cLastName}</p>}
            </div>
          </div>

          {/* Other Names and Username */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Other Names</label>
              <input
                type="text"
                name="cOtherNames"
                value={formData.cOtherNames}
                onChange={handleInput}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Other Names"
                style={{ fontFamily: selectedFont }}
              />
              {errors.cOtherNames && <p className="text-red-500">{errors.cOtherNames}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                name="cUseName"
                value={formData.cUseName}
                onChange={handleInput}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Username"
                style={{ fontFamily: selectedFont }}
              />
            </div>
          </div>

          {/* Sex and Monthly Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Sex</label>
              <select
                name="bSex"
                value={formData.bSex}
                onChange={handleInput}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value={0}>Male</option>
                <option value={1}>Female</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Monthly Salary</label>
              <input
                type="text"
                name="nPMonthSalary"
                value={formData.nPMonthSalary}
                onChange={handleInput}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Monthly Salary"
                style={{ fontFamily: selectedFont }}
              />
              {errors.nPMonthSalary && <p className="text-red-500">{errors.nPMonthSalary}</p>}
            </div>
          </div>

          {/* Date of Birth and Date Joined */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Date of Birth</label>
              <input
                type="date"
                name="dDateOfBirth"
                value={formData.dDateOfBirth}
                onChange={handleInput}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ fontFamily: selectedFont }}
              />
              {errors.dDateOfBirth && <p className="text-red-500">{errors.dDateOfBirth}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Date Joined</label>
              <input
                type="date"
                name="dDateJoined"
                value={formData.dDateJoined}
                onChange={handleInput}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ fontFamily: selectedFont }}
              />
            </div>
          </div>

          {/* Birth Place and Birth Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Birth Place</label>
              <input
                type="text"
                name="cBirthPlace"
                value={formData.cBirthPlace}
                onChange={handleInput}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Birth Place"
                style={{ fontFamily: selectedFont }}
              />
              {errors.cBirthPlace && <p className="text-red-500">{errors.cBirthPlace}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Birth Country</label>
              <input
                type="text"
                name="cBirthCountry"
                value={formData.cBirthCountry}
                onChange={handleInput}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Birth Country"
                style={{ fontFamily: selectedFont }}
              />
            </div>
          </div>

          {/* Address Section */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['cPAddress1', 'cPAddress2', 'cPAddress3', 'cPAddress4'].map((address, index) => (
              <div key={address}>
                <input
                  type="text"
                  name={address}
                  value={formData[address]}
                  onChange={handleInput}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Address Line ${index + 1}`}
                  style={{ fontFamily: selectedFont }}
                />
                {address === 'cPAddress1' && errors.cPAddress1 && <p className="text-red-500">{errors.cPAddress1}</p>}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default EmployeeForm;