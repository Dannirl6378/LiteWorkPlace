import { Routes, Route } from "react-router-dom";
import React from 'react'
import Sing from "./SingUpIn/Sing";
import WorkingPage from "./WorkingPage";
import MyProfile from "./myProfile/MyProfile";
import Profile from "./Profile/Profile";
//import TestComponent from "./testacess"
import './i18n';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Sing />} />
        <Route path="/workingPage" element={<WorkingPage />} />
        <Route path="/MyProfile" element={<MyProfile />}/>
        <Route path="/Profile"  element={<Profile/>}/>
      </Routes>
    </div>
  );
}
