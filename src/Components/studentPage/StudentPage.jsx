import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Tooltip,
} from "@mui/material";
import { Add, Edit, Delete, Visibility } from "@mui/icons-material";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Ensure the firebase config file is in the correct directory.

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    section: "",
    rollNumber: "",
    age: "",
    email: "",
    phone: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
    remarks: "",
  });

  // Fetch students from Firestore on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const studentData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentData);
      } catch (error) {
        console.error("Error fetching students:", error.message);
      }
    };
    fetchStudents();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add new student to Firestore
      const docRef = await addDoc(collection(db, "students"), formData);

      // Update UI with the new student
      setStudents((prevStudents) => [
        ...prevStudents,
        { id: docRef.id, ...formData },
      ]);

      // Close dialog and reset form
      setOpen(false);
      setFormData({
        name: "",
        class: "",
        section: "",
        rollNumber: "",
        age: "",
        email: "",
        phone: "",
        address: "",
        guardianName: "",
        guardianPhone: "",
        remarks: "",
      });

      alert("Student added successfully!");
    } catch (error) {
      console.error("Error adding student:", error.message);
      alert(`Failed to add student: ${error.message}`);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "1100px",
        padding: "20px",
        margin: "0 auto",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Students Management
      </Typography>

      <Card sx={{ marginTop: 3, padding: 2 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography variant="h5">Students List</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpen(true)}
              sx={{
                backgroundColor: "#4caf50",
                "&:hover": { backgroundColor: "#45a049" },
              }}
            >
              Add Student
            </Button>
          </Box>

          {/* Students Table */}
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Section</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.section}</TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="View">
                        <IconButton color="primary">
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton color="secondary">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error">
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add Student Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              marginTop: 2,
            }}
          >
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <TextField
              label="Class"
              value={formData.class}
              onChange={(e) =>
                setFormData({ ...formData, class: e.target.value })
              }
              required
            />
            <TextField
              label="Section"
              value={formData.section}
              onChange={(e) =>
                setFormData({ ...formData, section: e.target.value })
              }
              required
            />
            <TextField
              label="Roll Number"
              value={formData.rollNumber}
              onChange={(e) =>
                setFormData({ ...formData, rollNumber: e.target.value })
              }
              required
            />
            <TextField
              label="Age"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              required
            />
            <TextField
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <TextField
              label="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
            <TextField
              label="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
            <TextField
              label="Guardian Name"
              value={formData.guardianName}
              onChange={(e) =>
                setFormData({ ...formData, guardianName: e.target.value })
              }
              required
            />
            <TextField
              label="Guardian Phone"
              value={formData.guardianPhone}
              onChange={(e) =>
                setFormData({ ...formData, guardianPhone: e.target.value })
              }
              required
            />
            <TextField
              label="Remarks"
              value={formData.remarks}
              onChange={(e) =>
                setFormData({ ...formData, remarks: e.target.value })
              }
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentsPage;
