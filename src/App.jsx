import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import ForgotPassword from './components/Login/ForgotPassword';
import Student from './components/Student/Student';
import JobApplication from './components/Applyjobs/JobApplication';
import TempleateNew from './components/ResumeBuilder/TempleateNew';
import Mainpage from './components/ResumeBuilder/Mainpage';
import ResumeBuilder from './components/ResumeBuilder/ResumeBuider';
import HomePage from './components/Recruiter/HomePage';
import Jobposting from './components/Recruiter/Jobposting';
import JobPosted from './components/Recruiter/SuccessPage';
import FAQ from './components/Student/FAQ';
import HomepageStaff from './components/Staff/HomepageStaff';
import JobDetail from './components/Applyjobs/JobDetail';
import UserAccount from './components/Staff/UserAccount';
import ReceivedJobs from './components/Staff/ReceivedJobs';


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        <Route path="/student" element={<Student />} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path="/applyjobs" element={<JobApplication />} />
        <Route path="/resume" element={<Mainpage/>}/>
        <Route path="/template1" element={<ResumeBuilder/>} />
        <Route path="/template2" element={<TempleateNew/>} />
        
        <Route path="/recruiter" element={<HomePage/>} />
        <Route path="/jobpost" element={<Jobposting/>} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/success" element={<JobPosted/>} />

        <Route path="/staff" element={<HomepageStaff/>} />
        <Route path="/receivedjobs" element={<ReceivedJobs/>} />
        <Route path="/useraccount" element={<UserAccount/>} />




      </Routes>
    </Router>
  );
};

export default App;