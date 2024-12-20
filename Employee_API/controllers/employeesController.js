const data = require("../models/employees.json");
const getEmployees = (req, res) => {
  res.json(data);
};

const createEmployee = (req, res) => {
  const newEmployee = req.body;
  newEmployee.emp_id = Number(newEmployee.emp_id);
  if (
    !newEmployee.emp_id ||
    !newEmployee.name ||
    !newEmployee.company_name ||
    !newEmployee.email
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const exists = data.some((emp) => emp.emp_id === newEmployee.emp_id);
  if (exists) {
    return res.status(400).json({ message: "Employee ID already exists" });
  }

  data.push(newEmployee);
  res.status(201).json({ message: "Employee added successfully", newEmployee });
};

const getEmployeeById = (req, res) => {
  const { id } = req.params;
  const employee = data.find((emp) => emp.emp_id === parseInt(id));
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
};

const updateEmployee = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  updatedData.emp_id = Number(updatedData.emp_id);
  const employeeIndex = data.findIndex((emp) => emp.emp_id === parseInt(id));

  if (employeeIndex !== -1) {
    data[employeeIndex] = { ...data[employeeIndex], ...updatedData };
    res.json({
      message: "Employee updated successfully",
      updatedEmployee: data[employeeIndex],
    });
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
};

const deleteEmployee = (req, res) => {
  const { id } = req.params;
  const employeeIndex = data.findIndex((emp) => emp.emp_id === parseInt(id));

  if (employeeIndex !== -1) {
    const removedEmployee = data.splice(employeeIndex, 1);
    res.json({ message: "Employee deleted successfully", removedEmployee });
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
};
module.exports = {
  getEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
