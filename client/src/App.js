import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Account from './pages/Acount/Account';
import Home from './pages/Home/Home';
import PostCreate from './pages/PostCreate/PostCreate';
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/SignUp';
import { useState } from 'react';


function App() {
  const [userInfo, setUserInfo] = useState({name: localStorage.getItem('name') || '',email: localStorage.getItem('email') || '',userId: localStorage.getItem('userId') || ''});
  return (

    <Router>
      <div className="App">
        
        <Routes>
        <Route path="/" element={<Home user={userInfo}/>} />

          <Route path="/account" element={<Account  user={userInfo} />} />
          <Route path="/write" element={<PostCreate user={userInfo} />}/>
          <Route path='/login' element={<Login setUserInfo={setUserInfo}/>}/>
          <Route path='/signup' element={<SignUp/>}/>

         </Routes>
      </div>
    </Router>
  );
}

export default App;
