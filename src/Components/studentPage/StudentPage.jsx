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
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
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

  const [errors, setErrors] = useState({});
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

  const validate = (name, value) => {
    switch (name) {
      case "name":
        return value ? "" : "Name is required";
      case "class":
        return value ? "" : "Class is required";
      case "section":
        return value ? "" : "Section is required";
      case "rollNumber":
        return value && !isNaN(value) ? "" : "Valid Roll Number is required";
      case "age":
        return value && !isNaN(value) && value > 0
          ? ""
          : "Valid Age is required";
      case "email":
        return value && /\S+@\S+\.\S+/.test(value)
          ? ""
          : "Invalid email address";
      case "phone":
        return value && /^\d{10}$/.test(value)
          ? ""
          : "Phone must be a 10-digit number";
      case "guardianName":
        return value ? "" : "Guardian Name is required";
      case "guardianPhone":
        return value && /^\d{10}$/.test(value)
          ? ""
          : "Guardian Phone must be a 10-digit number";
      default:
        return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key]);
      if (error) validationErrors[key] = error;
    });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (isEdit) {
        const studentRef = doc(db, "students", formData.id);
        await updateDoc(studentRef, formData);
      } else {
        await addDoc(collection(db, "students"), formData);
      }
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
    }
  };

  const onEdit = (student) => {
    setFormData(student);
    setOpen(true);
    setIsEdit(true);
    setIsView(false);
  };

  const onView = (student) => {
    setFormData(student);
    setOpen(true);
    setIsView(true);
    setIsEdit(false);
  };

  const onDelete = async (id) => {
    const studentRef = doc(db, "students", id);
    await deleteDoc(studentRef);
    setStudents(students.filter((student) => student.id !== id));
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
                      <Tooltip
                        title="Delete"
                        onClick={() => onDelete(student.id)}
                      >
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
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Class"
              value={formData.class}
              onChange={(e) =>
                setFormData({ ...formData, class: e.target.value })
              }
              required
              disabled={isView}
              error={!!errors.class}
              helperText={errors.class}
            />
            <TextField
              label="Section"
              value={formData.section}
              onChange={(e) =>
                setFormData({ ...formData, section: e.target.value })
              }
              required
              disabled={isView}
              error={!!errors.section}
              helperText={errors.section}
            />
            <TextField
              label="Roll Number"
              value={formData.rollNumber}
              onChange={(e) =>
                setFormData({ ...formData, rollNumber: e.target.value })
              }
              required
              disabled={isView}
              error={!!errors.rollNumber}
              helperText={errors.rollNumber}
            />
            <TextField
              label="Age"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              required
              disabled={isView}
              error={!!errors.age}
              helperText={errors.age}
            />
            <TextField
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              disabled={isView}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
              disabled={isView}
              error={!!errors.phone}
              helperText={errors.phone}
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
              error={!!errors.guardianName}
              helperText={errors.guardianName}
            />
            <TextField
              label="Guardian Phone"
              value={formData.guardianPhone}
              onChange={(e) =>
                setFormData({ ...formData, guardianPhone: e.target.value })
              }
              required
              disabled={isView}
              error={!!errors.guardianPhone}
              helperText={errors.guardianPhone}
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
