import Table from 'react-bootstrap/Table';
import axios from "axios";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../css/DisplayEmp.css"
const DisplayEmpTask = () => {

  const empid = localStorage.getItem("empid");
  const [mydata, setMydata] = useState([]);
  const [taskStatus, setTaskStatus] = useState("");

  const loadData = async () => {
    try {
      let api = "http://localhost:8080/employee/emptaskdisplay";
      const response = await axios.post(api, { empid: empid });
      setMydata(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const taskSubmit = async (taskid) => {
    try {
      let api = "http://localhost:8080/employee/emptasksubmit";
      const response = await axios.post(api, { taskid: taskid, taskstatus: taskStatus });
      alert(response.data);
      loadData();
    } catch (error) {
      console.log(error);
    }
  }

  let sno = 0;
  const ans = mydata.map((key) => {
    sno++;
    return (
      <tr key={key._id}>
        <td>{sno}</td>
        <td>{key.tasktitle}</td>
        <td>{key.taskdescription}</td>
        <td>{key.completiondays}</td>
        <td>
          <Form.Select
            size="sm"
            name="taskStatus"
            value={taskStatus}
            className="task-select"
            onChange={(e) => { setTaskStatus(e.target.value) }}
          >
            <option>--Select Option--</option>
            <option value="completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
          </Form.Select>
        </td>
        <td>
          {key.empreport === "submitted" ? (
            <Button className="submit-btn" disabled>Submitted</Button>
          ) : (
            <Button className="submit-btn" onClick={() => { taskSubmit(key._id) }}>Send</Button>
          )}
        </td>
      </tr>
    )
  })

  return (
    <div className="task-container">
      <h1>Your Task/ Assignment</h1>
      <Table bordered hover className="custom-table">
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Task Title</th>
            <th>Task Description</th>
            <th>Total Days</th>
            <th>Status</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {ans}
        </tbody>
      </Table>
    </div>
  )
}

export default DisplayEmpTask;
