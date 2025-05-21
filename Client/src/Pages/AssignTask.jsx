import { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { message } from 'antd'

const AssignTask = () => {
  const [mydata, setMydata] = useState([]);
  const [show, setShow] = useState(false);
  const [input, setInput] = useState({});
  const [empId, setEmpId] = useState("");

  const handleClose = () => {
    setShow(false);
    setInput({}); // Clear form on close
  };

  const handleShow = (empid) => {
    setEmpId(empid);
    setShow(true);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async () => {
    let api = "http://localhost:8080/admin/assigntask";
    try {
      await axios.post(api, { empid: empId, ...input });
      message.success("Task Assigned Successfully!");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const loadData = async () => {
    let api = "http://localhost:8080/admin/assigntaskdisplay";
    try {
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const ans = mydata.map((emp) => (
    <tr key={emp._id}>
      <td>{emp.empname}</td>
      <td>{emp.email}</td>
      <td>{emp.emptype}</td>
      <td>
        <Button variant="outline-primary" onClick={() => handleShow(emp._id)}>
          Assign Task
        </Button>
      </td>
    </tr>
  ));

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">📋 Assign Task to Employee</h2>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Emp Name</th>
            <th>Emp Email</th>
            <th>Emp Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{ans}</tbody>
      </Table>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Assign Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                name="tasktitle"
                value={input.tasktitle || ""}
                onChange={handleInput}
                placeholder="Enter task title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="taskdescription"
                value={input.taskdescription || ""}
                onChange={handleInput}
                placeholder="Enter detailed description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="completiondays"
                value={input.completiondays || ""}
                onChange={handleInput}
                placeholder="e.g., 5"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            ✅ Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AssignTask;
