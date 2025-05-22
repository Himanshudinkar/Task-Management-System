import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './Pages/Home'
import AdminDashboard from './Pages/AdminDashboard'
import EmpDashboard from './Pages/EmpDashboard'
import CreateEmployee from './Pages/CreateEmployee'
import AssignTask from './Pages/AssignTask'
import ViewTask from './Pages/ViewTask'
import TaskTracker from './Pages/TaskTracker'
import ManageTasks from './Pages/ManageTasks'
import DisplayEmpTask from './Pages/DisplayEmpTask'
import ChangePassword from './Pages/ChangePassword'
function App() {
 

  return (
    <>

    <Routes>
      <Route path='/' element = {<Layout/>}>
      <Route index element = {<Home/>} />
      <Route path='/home' element = {<Home/>}/>

      <Route path='/admindasboard' element = {<AdminDashboard/>}>
        <Route path='/admindasboard/createemp' element = {<CreateEmployee/>}/>
        <Route path='/admindasboard/assigntask' element = {<AssignTask/>}/>
        <Route path='/admindasboard/viewtask' element = {<ViewTask/>}/>
        <Route path='/admindasboard/tasktracker' element = {<TaskTracker/>}  />
        <Route path='/admindasboard/managetask' element = {<ManageTasks/>}  />
      
      </Route>

      <Route path='/empdasboard' element = {<EmpDashboard/>}>
       <Route index element = {<DisplayEmpTask/>}/>
        <Route path='/empdasboard/displaytask' element = {<DisplayEmpTask/>}/>
        <Route path='/empdasboard/changepassword' element = {<ChangePassword/>}/>
      </Route>


      </Route>
    </Routes>
      
    </>
  )
}

export default App
