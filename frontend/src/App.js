
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import DataAdd from './components/DataAdd';
import EmployeeDetailsTable from "./components/empData";
import EditEmployee from "./components/EditData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<DataAdd/>}/>
          <Route path="signup" element={<SignUp />}/>
          <Route path="signin" element={<SignIn />} />
          <Route path="dataadd" element={<DataAdd />} />
          <Route path="empdata" element={<EmployeeDetailsTable />} />
          <Route path="edit/:id" element={<EditEmployee/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

