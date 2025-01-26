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
import { db } from "../../firebase";
import TemporaryDrawer from "../sidebar/Sidebar";
import { useUserContext } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
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

  const userContext = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (userContext?.user) {
      const fetchStudents = async () => {
        const querySnapshot = await getDocs(collection(db, "students"));
        const studentData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentData);
      };
      fetchStudents();
    }
  }, [userContext?.user]);

  useEffect(() => {
    if (!userContext?.user) {
      navigate("/");
    }
  }, [userContext.user]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "students"), formData);
    setOpen(false);
    setFormData({
      id: "",
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
    window.location.reload();
  };

  const onEdit = (student) => {
    console.log(student, "student");
    setFormData(student);
    setOpen(true);
    setIsEdit(true);
  };

  const onView = (student) => {
    setFormData(student);
    setOpen(true);
    setIsView(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setIsView(false);
    setFormData({
      id: "",
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
  };

  return (
    <Box
      className="student-list"
      sx={{
        maxWidth: "1100px",
        padding: "20px",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Typography
        className="title"
        variant="h4"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
      >
        <TemporaryDrawer />
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
                      <Tooltip title="View" onClick={() => onView(student)}>
                        <IconButton color="primary">
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit" onClick={() => onEdit(student)}>
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

      {/* Add Student Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {isView ? "Student" : isEdit ? "Edit Student" : "Add Student"}
        </DialogTitle>
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
              disabled={isView}
            />
            <TextField
              label="Class"
              value={formData.class}
              onChange={(e) =>
                setFormData({ ...formData, class: e.target.value })
              }
              required
              disabled={isView}
            />
            <TextField
              label="Section"
              value={formData.section}
              onChange={(e) =>
                setFormData({ ...formData, section: e.target.value })
              }
              required
              disabled={isView}
            />
            <TextField
              label="Roll Number"
              value={formData.rollNumber}
              onChange={(e) =>
                setFormData({ ...formData, rollNumber: e.target.value })
              }
              required
              disabled={isView}
            />
            <TextField
              label="Age"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              required
              disabled={isView}
            />
            <TextField
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              disabled={isView}
            />
            <TextField
              label="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
              disabled={isView}
            />
            <TextField
              label="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
              disabled={isView}
            />
            <TextField
              label="Guardian Name"
              value={formData.guardianName}
              onChange={(e) =>
                setFormData({ ...formData, guardianName: e.target.value })
              }
              required
              disabled={isView}
            />
            <TextField
              label="Guardian Phone"
              value={formData.guardianPhone}
              onChange={(e) =>
                setFormData({ ...formData, guardianPhone: e.target.value })
              }
              required
              disabled={isView}
            />
            <TextField
              label="Remarks"
              value={formData.remarks}
              onChange={(e) =>
                setFormData({ ...formData, remarks: e.target.value })
              }
              multiline
              rows={3}
              disabled={isView}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {!isView && (
            <Button variant="contained" onClick={handleSubmit}>
              {isEdit ? "Edit" : "Add"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentsPage;
