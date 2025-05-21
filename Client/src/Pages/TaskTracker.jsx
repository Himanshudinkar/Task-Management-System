import axios from "axios";
import { useEffect, useState } from "react";
import '../css/ViewTask.css';

const TaskTracker = () => {
  const [mydata, setMydata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const loadData = async () => {
    let api = "http://localhost:8080/admin/viewtask";
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

  
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = mydata.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(mydata.length / tasksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <h2 className="view-title">Task Tracker</h2>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Task Title</th>
              <th>Due Date</th>
              <th>Task Status</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task, index) => (
              <tr key={task._id}>
                <td>{indexOfFirstTask + index + 1}</td>
                <td>{task.tasktitle}</td>
                <td>{task.completiondays}</td>
                <td>
                  <span className={`badge ${task.taskstatus === "completed" ? "success" : "pending"}`}>
                    {task.taskstatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

       
        <div className="pagination">
          <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? 'active-page' : ''}
            >
              {i + 1}
            </button>
          ))}

          <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </>
  )
}

export default TaskTracker;
