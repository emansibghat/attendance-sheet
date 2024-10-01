import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';  


export default function BasicTable() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    agNumber: '',
    section: '',
    status: '',
  });

  const handleAddStudent = () => {
    setStudents(prevStudents => [...prevStudents, { ...newStudent, isEditing: true }]);
    setNewStudent({ name: '', agNumber: '', section: '', status: '' });
  };

  const handleInputChange = (event, field, index) => {
    setStudents(prevStudents => prevStudents.map((student, i) =>
      i === index ? { ...student, [field]: event.target.value } : student
    ));
  };

  const handleSaveStudent = (index) => {
    setStudents(prevStudents => prevStudents.map((student, i) =>
      i === index ? { ...student, isEditing: false } : student
    ));
    const updatedStudents = [...students];
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };
  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, []);
  return (
    <div className="body">
      <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name of student</TableCell>
          <TableCell align="right">Ag number</TableCell>
          <TableCell align="right">Section</TableCell>
          <TableCell align="right">Status</TableCell>
          <TableCell align="right">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students.map((student, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              {student.isEditing   
? (
                <TextField value={student.name} onChange={(e) => handleInputChange(e, 'name', index)} />
              ) : (
                student.name
              )}
            </TableCell>
            <TableCell align="right">
              {student.isEditing ? (
                <TextField value={student.agNumber} onChange={(e) => handleInputChange(e, 'agNumber', index)} />
              ) : (
                student.agNumber
              )}
            </TableCell>
            <TableCell align="right">
              {student.isEditing ? (
                <TextField value={student.section} onChange={(e) => handleInputChange(e, 'section', index)} />
              ) : (
                student.section
              )}
            </TableCell>
            <TableCell align="right">
              {student.isEditing ? (
                <Select
                  value={student.status}
                  onChange={(e) => handleInputChange(e, 'status', index)}
                >
                  <MenuItem value="absent">Absent</MenuItem>
                  <MenuItem value="present">Present</MenuItem>
                </Select>
              ) : (
                student.status
              )}
            </TableCell>
            <TableCell align="right">
              {student.isEditing && (
                <Button variant="contained" onClick={() => handleSaveStudent(index)}>
                  Save
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
      <Stack spacing={2} paddingLeft={70} paddingTop={7} direction="row">
        <Button variant="contained" onClick={handleAddStudent}>
          Add Students
        </Button>
      </Stack>
    </div>
  );
}