import axios from "axios";
import { useEffect, useState } from "react";
import '../css/ViewTask.css'; 

const ViewTask = () => {
  const [mydata, setMydata] = useState([]);

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
        <td>{key.completiondays}</td>
        <td>
          <span className={`badge ${key.taskstatus === "completed" ? "success" : "pending"}`}>
            {key.taskstatus}
          </span>
        </td>
        <td>
          <span className={`badge ${key.empreport === "submitted" ? "success" : "pending"}`}>
            {key.empreport}
          </span>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h2 className="view-title">Employee Task Report</h2>
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
              <th>Task Status</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>{ans}</tbody>
        </table>
      </div>
    </>
  )
}

export default ViewTask;
