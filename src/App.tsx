import { Routes, Route } from "react-router-dom";
import React from 'react'
import Sing from "./SingUpIn/Sing";
import WorkingPage from "./WorkingPage";
import TestComponent from "./testacess"

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Sing />} />
        <Route path="workingPage" element={<WorkingPage />} />
        <Route path="test" element={<TestComponent/>}/>
      </Routes>
    </div>
  );
}
