import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../css/Home.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const Home = () => {
  const [input,setInput] = useState({})
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("Employee");
  const navigate = useNavigate()

  const handleClose = () => setShow(false)


  const handleShow = (userType) => {
    setRole(userType);
    setShow(true);
  }

  const handleInput = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setInput((values)=>({...values,[name]:value}))
    console.log(input)
  }

  const handleSubmit = async (userType) =>{

    if(userType== "Admin")
    {
        try {
            let api = "http://localhost:8080/admin/adminlogin";
            const response = await axios.post(api,input);
            console.log(response.data);
            message.success(response.data.msg1)
            navigate("/admindasboard")
        } catch (error) {
            message.error(error.response.data.msg)
        }
    }

    if(userType== "Employee")
        {
            try {
                let api = "http://localhost:8080/employee/employeelogin";
                const response = await axios.post(api, input);
                console.log(response.data);
                localStorage.setItem("empname", response.data.empname);
               localStorage.setItem("empemail",response.data.email);
               localStorage.setItem("empid",response.data._id);
                message.success(response.data.msg1)
                navigate("/empdasboard")
            } catch (error) {
                message.error(error.response.data.msg)
            }
        }

  }


  return (
    <>
      <div className="home-container">
        <div className="home-content">
          <h1>Welcome to Task Management System</h1>
          <h3>Login as a...</h3>
          <div className="button-group">
            <button className="login-btn" onClick={() => handleShow("Employee")}>Employee</button>
            <button className="login-btn" onClick={() => handleShow("Admin")}>Admin</button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login as {role}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter User ID</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name='userid' onChange={handleInput} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name='password' onChange={handleInput} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit(role)}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Home;
