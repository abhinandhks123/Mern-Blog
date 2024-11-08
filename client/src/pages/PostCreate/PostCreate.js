import React, { useState ,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostCreate({ user}) {
  const [formData,setFormData] = useState({ title:"",content:"",author:user.userId,imageUrl:""});
  const [message, setMessage] = useState('');
  const Navigate=useNavigate();
  useEffect(() => {
    if (user) {
      setFormData(prevFormData => ({
        ...prevFormData,
        author: user.userId
      }));
    }
  }, [user]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try {
      const response =await axios.post('http://localhost:5000/api/post/create',formData);
      console.log('Response:', response.data);
      setMessage('Post created successfully!');
      setFormData({ title: '', content: '', author: user.userId || '', imageUrl: '' });
      Navigate('/')
    } catch (error) {
      setMessage(`Error: ${error.response?.data.error || error.message}`);
    }
  }

  return (
    <div className='PostCreate'>
       <h2>Create a New Post</h2>
       {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required/>
                </div>
                <div>
                    <label>Content:</label>
                    <input type='text' name="content" value={formData.content} onChange={handleChange} required/>
                </div>
                
                <div>
                    <label>Image URL:</label>
                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange}/>
                </div>
                <button type="submit">Create Post</button>
            </form>
    </div>
  )
};

export default PostCreate
