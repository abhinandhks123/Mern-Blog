import { useNavigate } from 'react-router-dom';
import './Account.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Account({ user}) {
  const navigate=useNavigate()

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const handleLogout = () => {
    localStorage.removeItem('name'); // Remove name from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email')
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    const fetchPostsByAuthor = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/post/posts/${user.userId}`);
        setPosts(response.data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsByAuthor();
  }, [user.userId]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts: {error}</p>;


  return (
    <div className='Account'>
      
      <div className='prof-top'>
          <h1>Welcome, {user.name || 'name'}!</h1>
          <div className="btn">
          {!user ? (
          <>
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
          </>
          ) : (
            <a href="/" onClick={handleLogout}>Logout</a>
          )}
          </div>
      </div>


      <div className='prof-bottom'>
        <div className='row'>
        {posts.length > 0 ? (
        posts.map(post => (
          <div className="card3"  key={post._id}>
            <div className="card-header">
              <div className="ac-post">
                <i className="fas fa-user-circle"></i>
                <p>{user.name || 'user'}</p>
              </div>
              <div className="dot-menu" >
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
            <img className="card-img-body" src={post.imageUrl || "images/img.png"} alt='' />
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
            </div>
            <div className="author">
              <div className="like-button" >
                <i className="fas fa-thumbs-up" id="likeIcon"></i>
                <span className="like-count" id="likeCount">{post.likes || 'Like'}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No posts found for this author.</p>
      )}

        </div>

      </div>



    </div>
  );
}

export default Account;