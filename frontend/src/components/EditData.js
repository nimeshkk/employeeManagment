import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        nCompanyID: '',
        cLastName: '',
        cOtherNames: '',
        cUseName: '',
        bSex: '',
        nPMonthSalary: '',
        dDateOfBirth: '',
        dDateJoined: '',
        cBirthPlace: '',
        cBirthCountry: '',
        cPAddress1: '',
        cPAddress2: '',
        cPAddress3: '',
        cPAddress4: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/emp_details/${id}`);
                setEmployee(response.data);
            } catch (err) {
                console.error('Error fetching employee data:', err);
                setError('Failed to fetch employee data.');
            }
        };

        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/update_emp_details/${id}`, employee);
            alert('Employee updated successfully!');
            navigate('/empdata'); // Navigate back to employee data page after successful update
        } catch (err) {
            console.error('Error updating employee:', err);
            setError('Failed to update employee.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300 py-8">
            <div className="bg-white shadow-lg rounded-lg w-full lg:w-2/3 p-10">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit Employee</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Company ID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Company ID</label>
                            <input
                                type="text"
                                name="nCompanyID"
                                value={employee.nCompanyID}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        {/* Last Name */}
                        <div>
                            <label className="block text-gray-700 font-medium">Last Name</label>
                            <input
                                type="text"
                                name="cLastName"
                                value={employee.cLastName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    </div>

                    {/* Other Names and Username */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Other Names</label>
                            <input
                                type="text"
                                name="cOtherNames"
                                value={employee.cOtherNames}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Username</label>
                            <input
                                type="text"
                                name="cUseName"
                                value={employee.cUseName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    </div>

                    {/* Sex and Monthly Salary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Sex</label>
                            <select
                                name="bSex"
                                value={employee.bSex}
                                onChange={handleChange}
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
                                value={employee.nPMonthSalary}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    </div>

                    {/* Date of Birth and Date Joined */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Date of Birth</label>
                            <input
                                type="date"
                                name="dDateOfBirth"
                                value={employee.dDateOfBirth}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Date Joined</label>
                            <input
                                type="date"
                                name="dDateJoined"
                                value={employee.dDateJoined}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
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
                                value={employee.cBirthPlace}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Birth Country</label>
                            <input
                                type="text"
                                name="cBirthCountry"
                                value={employee.cBirthCountry}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    </div>

                    {/* Address Section */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                name="cPAddress1"
                                value={employee.cPAddress1}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Address Line 1"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="cPAddress2"
                                value={employee.cPAddress2}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Address Line 2"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="cPAddress3"
                                value={employee.cPAddress3}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Address Line 3"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="cPAddress4"
                                value={employee.cPAddress4}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Address Line 4"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300">
                        Update Employee
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;
