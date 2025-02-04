import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Correct import for v6+
import Login from './components/Login/Login';
import ForgotPassword from './components/Login/ForgotPassword';
import Student from './components/Student/Student';
import JobApplication from './components/Applyjobs/JobApplication';
import AppliedJobs from './components/Applyjobs/Appliedjobs';
import RejectedJobs from './components/Applyjobs/RejectedJobs';
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


      </Routes>
    </Router>
  );
};

export default App;