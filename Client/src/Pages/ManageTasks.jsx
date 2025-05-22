import axios from "axios";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { message } from 'antd';
import '../css/ManageTasks.css';

const ManageTasks = () => {

  const [mydata, setMydata] = useState([]);
  const [show, setShow] = useState(false);
  const [updateTask, setUpdateTask] = useState({});
  const [selectedId, setSelectedId] = useState(null);


  const [showdel, setShowdel] = useState(false);
  const [deleteid, setDeleteid] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (task) => {
    setUpdateTask({
      tasktitle: task.tasktitle,
      taskdescription: task.taskdescription,
      completiondays: task.completiondays
    });
    setSelectedId(task._id);
    setShow(true);
  };

  const loadData = async () => {
    let api = "http://localhost:8080/admin/viewtask";
    try {
      const response = await axios.get(api);
      setMydata(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const myDel = async (id) => {
    let api = "http://localhost:8080/admin/deltask";
    try {
      let response = await axios.post(api, { id: id });
      console.log(response);
      loadData();
      message.success("Task Deleted");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateTask({ ...updateTask, [name]: value });
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.post("http://localhost:8080/admin/updatetask", {
        id: selectedId,
        ...updateTask,
      });
      loadData();
      handleClose();
      message.success("Task Updated");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  let sno = 0;
  const ans = mydata.map((key) => {
    sno++;
    return (
      <tr key={key._id}>
        <td>{sno}</td>
        <td>{key.empid.empname}</td>
        <td>{key.empid.emptype}</td>
        <td>{key.empid.email}</td>
        <td>{key.tasktitle}</td>
        <td>{key.taskdescription}</td>
        <td>{new Date(key.completiondays).toLocaleDateString()}</td>
        <td>
          <button onClick={() => {
            setDeleteid(key._id);
            setShowdel(true);
          }}>
            DELETE
          </button>
        </td>
        <td>
          <button style={{ backgroundColor: "blue" }} onClick={() => handleShow(key)}>
            UPDATE
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h2 className="view-title">Manage Task</h2>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Employee Name</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Task Title</th>
              <th>Task Description</th>
              <th>Due Date</th>
              <th>DELETE</th>
              <th>UPDATE</th>
            </tr>
          </thead>
          <tbody>{ans}</tbody>
        </table>
      </div>

     
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                name="tasktitle"
                value={updateTask.tasktitle || ""}
                onChange={handleUpdateChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="taskdescription"
                value={updateTask.taskdescription || ""}
                onChange={handleUpdateChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="completiondays"
                value={updateTask.completiondays || ""}
                onChange={handleUpdateChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>Update</Button>
        </Modal.Footer>
      </Modal>

     
      <Modal show={showdel} onHide={() => setShowdel(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowdel(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => {
            myDel(deleteid);
            setShowdel(false);
          }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ManageTasks;
