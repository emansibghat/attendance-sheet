import React, { useState } from 'react';

const AttendanceSheetPreview = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', present: false },
    { id: 2, name: 'Jane Smith', present: true },
    { id: 3, name: 'Bob Johnson', present: false },
    { id: 4, name: 'Alice Brown', present: true },
  ]);

  const toggleAttendance = (id) => {
    setStudents(students.map(student =>
      student.id === id ? { ...student, present: !student.present } : student
    ));
  };

  return (
    <div className="attendance-container">
      <h1 className="attendance-title">Attendance Sheet</h1>
      <div className="attendance-date">
        <span>Date:</span> September 30, 2024
      </div>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={student.present}
                  onChange={() => toggleAttendance(student.id)}
                  className="attendance-checkbox"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceSheetPreview;