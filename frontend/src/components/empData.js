import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Papa from 'papaparse';  
import { saveAs } from 'file-saver';  

const EmployeeDetailsTable = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

 
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8800/emp_details');
      setEmployees(response.data);
    } catch (err) {
      console.error('Error fetching employee data:', err);
      setError('Failed to fetch employee data.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:8800/delete_details/${id}`);
        alert('Employee deleted successfully!');
        fetchEmployees();
      } catch (err) {
        console.error('Error deleting employee:', err);
        setError('Failed to delete employee.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // Function to handle CSV download
  const handleDownloadCSV = () => {
    const csv = Papa.unparse(employees);  
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'employee_data.csv'); 
  };

  return (
    <>
    <NavBar/>
    <div className="min-h-auto flex items-center justify-center bg-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[90%] mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Employee Details</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4 flex justify-end">
          {/* Add a button to download CSV */}
          <button
            onClick={handleDownloadCSV}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Download CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-2 py-2">ID</th>
                <th className="border px-2 py-2">Company ID</th>
                <th className="border px-3 py-2">Last Name</th>
                <th className="border px-3 py-2">Other Names</th>
                <th className="border px-3 py-2">Username</th>
                <th className="border px-3 py-2">Sex</th>
                <th className="border px-3 py-2">Birth Date</th>
                <th className="border px-3 py-2">Monthly Salary</th>
                <th className="border px-3 py-2">Date Joined</th>
                <th className="border px-3 py-2">Birth Place</th>
                <th className="border px-3 py-2">Birth Country</th>
                <th className="border px-3 py-2">Address 1</th>
                <th className="border px-3 py-2">Address 2</th>
                <th className="border px-3 py-2">Address 3</th>
                <th className="border px-3 py-2">Address 4</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.id} className="text-center">
                    <td className="border px-2 py-2">{employee.id}</td>
                    <td className="border px-2 py-2">{employee.nCompanyID}</td>
                    <td className="border px-3 py-2">{employee.cLastName}</td>
                    <td className="border px-3 py-2">{employee.cOtherNames}</td>
                    <td className="border px-3 py-2">{employee.cUseName}</td>
                    <td className="border px-3 py-2">{employee.bSex === 1 ? 'Female' : 'Male'}</td>
                    <td className="border px-3 py-2">{employee.dDateOfBirth}</td>
                    <td className="border px-3 py-2">{employee.nPMonthSalary}</td>
                    <td className="border px-3 py-2">{employee.dDateJoined}</td>
                    <td className="border px-3 py-2">{employee.cBirthPlace}</td>
                    <td className="border px-3 py-2">{employee.cBirthCountry}</td>
                    <td className="border px-3 py-2">{employee.cPAddress1}</td>
                    <td className="border px-3 py-2">{employee.cPAddress2}</td>
                    <td className="border px-3 py-2">{employee.cPAddress3}</td>
                    <td className="border px-3 py-2">{employee.cPAddress4}</td>
                    <td className="border px-3 py-2 flex flex-col justify-center items-center space-y-2">
                      <button
                        onClick={() => handleEdit(employee.id)}
                        className="bg-yellow-500 text-white w-full py-2 rounded hover:bg-yellow-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)} 
                        className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="15" className="text-center py-4">
                    No employee data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default EmployeeDetailsTable;
