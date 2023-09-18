import { Routes, Route } from "react-router-dom";
import Sing from "./SingUpIn/Sing";
import WorkingPage from "./WorkingPage";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Sing />} />
        <Route path="workingPage" element={<WorkingPage />} />
      </Routes>
    </div>
  );
}
