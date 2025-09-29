import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home" 
import {About} from "./pages/About" 
import {Contact} from "./pages/Contact" 
import {Service} from "./pages/Service" 
import {Register} from "./pages/Register" 
import {Login} from "./pages/Login" 
import { Navbar } from "./pages/Navbar";
import { Error } from "./pages/Error";
import { Logout } from "./pages/Logout";
import { Admin } from "./layout/adminlayout";
import { Admincontact } from "./layout/admincontact";
import { Adminuser } from "./layout/adminuser";
import { Adminupdate } from "./layout/admin-update";
import Dr from "./pages/Dr";
import PatientSocket from "./pages/Patientsocket";
import { Drdata } from "./pages/Drdata";
import { Drbyid } from "./pages/Drbyid";
import { Approve } from "./pages/Approve";
import Problem from "./pages/Problem";
import { PatientSelect } from "./pages/Patientselect";
import { Visualize} from "./pages/Visualize";
import { SubmitReport } from "./pages/Submitreport";
import {PatientDashboard} from "./pages/PatientDashboard";
import { FeedbackPage } from "./pages/Feedbackdr";
import ScheduleRequest from "./pages/ScheduleRequest";
import { Scheduleapproval } from "./pages/Scheduleapproval";

export const App = () => {
  return(
    <BrowserRouter>
    <Navbar />
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="service" element={<Service/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="dr" element={<Dr/>}/>
      <Route path="logout" element={<Logout/>}/>
      <Route path="Patientsocket" element={<PatientSocket/>}/>
      <Route path="drapprove" element={<Approve/>}/>
      <Route path="doctorsforpatient" element={<Drdata/>}/>
      <Route path="doctorsforpatient/drdata/:id" element={<Drbyid/>}/>
      <Route path="Problem" element={<Problem/>}/>
      <Route path="Patientdash" element={<PatientDashboard/>}/>
      <Route path="schedulereq" element={<ScheduleRequest/>}/>
      <Route path="scheduleapp" element={<Scheduleapproval/>}/>
      <Route path="view" element={<PatientSelect />} />
        <Route path="/visualize/:id" element={<Visualize />} />
        <Route path="/submit-report/:id" element={<SubmitReport />} />
        <Route path="/feedback/:id" element={<FeedbackPage />} />
      <Route path="*" element={<Error/>}/>
      <Route path="/admin" element={<Admin />}>
        <Route path="users" element={<Adminuser />} />
        <Route path="user/:id/edit" element={<Adminupdate />} />
        <Route path="contacts" element={<Admincontact />} />
      </Route>

     </Routes>
    </BrowserRouter>
  )
}

