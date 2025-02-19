import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Correct import for v6+
import Login from './components/Login/Login';
import ForgotPassword from './components/Login/ForgotPassword';
import Student from './components/Student/Student';
import JobApplication from './components/Applyjobs/JobApplication';
import AppliedJobs from './components/Applyjobs/Appliedjobs';
import RejectedJobs from './components/Applyjobs/RejectedJobs';
import TempleateNew from './components/ResumeBuilder/TempleateNew';
import Mainpage from './components/ResumeBuilder/Mainpage';
import ResumeBuilder from './components/ResumeBuilder/ResumeBuider';
import HomePage from './components/Recruiter/HomePage';
import Jobposting from './components/Recruiter/Jobposting';
import Applications from './components/Recruiter/Applications';
import JobPosted from './components/Recruiter/SuccessPage';
import JobDetail from './components/Recruiter/JobDetail'; // Detailed job view


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/student" element={<Student />} />
        <Route path="/applyjobs" element={<JobApplication />} />
        <Route path="/appliedjobs" element={<AppliedJobs />} />
        <Route path="/rejectedjobs" element={<RejectedJobs />} />
        <Route path="/resume" element={<Mainpage/>}/>
        <Route path="/template2" element={<TempleateNew/>} />
        <Route path="/template1" element={<ResumeBuilder/>} />
        <Route path="/recruiter" element={<HomePage/>} />
        <Route path="/jobpost" element={<Jobposting/>} />
        <Route path="/applications" element={<Applications/>} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/success" element={<JobPosted/>} />


      </Routes>
    </Router>
  );
};

export default App;