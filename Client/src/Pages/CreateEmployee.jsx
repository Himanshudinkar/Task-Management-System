import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { message } from 'antd';

const CreateEmployee = () => {
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput(values => ({ ...values, [name]:value }));
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = "http://localhost:8080/admin/addemp";
    try {
      const response = await axios.post(api, input);
      console.log(response.data);
      message.success(response.data.msg1);
    } catch (error) {
      console.log(error);
      message.error(response.data.msg);
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
      <Card style={{ width: '100%', maxWidth: '500px', padding: '30px', boxShadow: '0 0 15px rgba(0,0,0,0.2)', borderRadius: '15px' }}>
        <h3 className="text-center mb-4" style={{ color: "#098196" }}>Add New Employee</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Employee Name</Form.Label>
            <Form.Control type="text" name="empname" placeholder="Enter full name" onChange={handleInput} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Designation</Form.Label>
            <Form.Select name="emptype" onChange={handleInput} required>
              <option value="">-- Select Designation --</option>
              <option value="Front-End Developer">Front-End Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Team Manager">Team Manager</option>
              <option value="Team Lead">Team Lead</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" name="email" placeholder="name@example.com" onChange={handleInput} required />
          </Form.Group>

          <div className="d-grid">
            <Button type="submit" style={{ backgroundColor: "#098196", border: "none" }}>
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  )
}

export default CreateEmployee
