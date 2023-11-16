import React  from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomeScreen from './Screens/HomeScreen';
import AdminScreen from './Screens/Admin';
import ProfileUpdate from './Screens/Admin/ProfileUpdate';
import PortfolioChange from './Screens/Admin/PortfolioChange';
import SkillsChange from './Screens/Admin/SkillsChange'
import AboutChange from './Screens/Admin/AboutChange';
import Inbox from './Screens/Admin/Inbox';
import Social from './Screens/Admin/Social';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path='/admin' element={<AdminScreen />}>
          <Route path='/admin/profileUpdate' element={<ProfileUpdate />} />
          <Route path='/admin/portfolioChange' element={<PortfolioChange />} />
          <Route path='/admin/skillsChange' element={<SkillsChange />} />
          <Route path='/admin/aboutChange' element={<AboutChange />} />
          <Route path='/admin/inbox' element={<Inbox />} />
          <Route path='/admin/socialChange' element={<Social />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
