import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('test'));

const buttonStyle = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textDecoration: 'none',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '4px',
  transition: 'background-color 0.3s ease',
  margin: '10px 0'
};

const backgroundStyle = {
  backgroundImage: 'url("./image.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  fontFamily: 'Arial, sans-serif'
};

const contentStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '90%',
  maxWidth: '800px'
};

const tableStyle = {
  border: '1px solid #ddd',
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px'
};

const thStyle = {
  border: '1px solid white',
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '12px',
  textAlign: 'left'
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  textAlign: 'left'
};

const dropdownStyle = {
  width: '100%',
  padding: '5px'
};

const inputStyle = {
  width: '70%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '4px',
  border: '1px solid #ddd'
};

const Page = () => {
  const navigate = useNavigate();

  return (
    <div style={backgroundStyle}>
      <div style={contentStyle}>
        <h1 style={{
          color: '#333',
          marginBottom: '20px'
        }}>ATTENDANCE SHEET</h1>
        <button
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
          onClick={() => navigate('/add-students')}
        >
          Add Students
        </button>
      </div>
    </div>
  );
};

const AddStudentsPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents)); 
    }
  }, []);
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('students', JSON.stringify(students));
    }
  }, [students]);

  const addNewStudent = () => {
    const newStudent = {
      id: students.length + 1,
      name: '',
      agNumber: '',
      status: 'Present'
    };
    setStudents([...students, newStudent]);
  };


  const handleInputChange = (id, field, value) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, [field]: value } : student
    );
    setStudents(updatedStudents);
  };

 
  const handleStatusChange = (id, newStatus) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, status: newStatus } : student
    );
    setStudents(updatedStudents);
  };

  return (
    <div style={{ ...backgroundStyle, backgroundImage: 'url("./image.png")' }}>
      <div style={contentStyle}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Attendance Result</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>AG Number</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td style={tdStyle}>
                  <input
                    style={inputStyle}
                    type="text"
                    value={student.name}
                    onChange={(e) => handleInputChange(student.id, 'name', e.target.value)}
                    placeholder="Enter name"
                  />
                </td>
                <td style={tdStyle}>
                  <input
                    style={inputStyle}
                    type="text"
                    value={student.agNumber}
                    onChange={(e) => handleInputChange(student.id, 'agNumber', e.target.value)}
                    placeholder="Enter AG number"
                  />
                </td>
                <td style={tdStyle}>
                  <select
                    style={dropdownStyle}
                    value={student.status}
                    onChange={(e) => handleStatusChange(student.id, e.target.value)}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
          onClick={addNewStudent}
        >
          New Student
        </button>
      </div>
    </div>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/Page" element={<Page />} />
    <Route path="/add-students" element={<AddStudentsPage />} />
  </Routes>
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
