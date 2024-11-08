import React, { useState } from 'react'
import './Header.css'

function Header({user}) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.reload();

  };

  return (
    <div className='header'>
        <div className="left">
            <div className="logo">
              <h2 >Qoutes4U</h2>
            </div>
            <div className="nav">
            <a href="/"><h2>Stories</h2></a>
            <a href="/"><h2>Creator</h2></a>
            <a href="/"><h2>Premium</h2></a>
            {user ?(
              <a href="/account"><h2>My posts</h2></a>

            ):(
              ''
            )

            }

            </div>
            


        </div>
        <div className="right">
          <div className="write">
           {user?(

              <a href="/write">
                <i className='fas fa-edit'></i>
                <h2>Write</h2>
              </a>
              ):(
                ''
               )
               }
            </div>
            <div className="notif">
              <i className='far fa-bell'></i>
              <h2>21</h2>
            </div>
           
              
            
           
          

          <div className="ac">
             
            <button onClick={toggleDropdown} className="dropdown-btn">
              <i className='fas fa-user-circle'></i>
              
            </button>
            {user ? (
            <p className='user-name'>{user}</p>
            ) : (
            <p>Guest</p>
            )}

{user ? (
  isOpen && (
    <div className="dropdown-menu">
      <a href="/account">Profile</a>
      <a href='/' onClick={handleLogout}>Logout</a>
    </div>
  )
) : (
  isOpen && (
    <div className="dropdown-menu">
      <a href="/login">Login</a>
      <a href='/signup'>Signup</a>
    </div>
  )
)}

          </div>
        </div>
    </div>
  )
}     

export default Header
