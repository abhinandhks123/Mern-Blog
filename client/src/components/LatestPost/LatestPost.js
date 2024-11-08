import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LatestPost.css';

function LatestPost() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const latestResponse = await axios.get('http://localhost:5000/api/post/latest');
        setLatestPosts(latestResponse.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPost();
  }, []);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const popularResponse = await axios.get('http://localhost:5000/api/post/popular');
        setPopularPosts(popularResponse.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPost();
  }, []);
  const toggleMenu = (id) => {
    console.log(`Menu toggled for post ${id}`);
    // Additional logic for toggling menu can be added here
  };

  const toggleLike = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/post/${id}/like`);
      
      // Update the state to reflect the new like count
      setLatestPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id ? { ...post, likes: response.data.likes } : post
        )
      );
      setPopularPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id ? { ...post, likes: response.data.likes } : post
        )
      );
      console.log(`Like toggled for post ${id}`, response.data);

    } catch (error) {
      console.error(`Error toggling like for post ${id}:`, error);
    }
  };

  return (
    <div className='LatestPost'>
       <div className="latest-post-h">
        <h2>Latest post</h2>
      </div>
      <div className="row3">
     
        {latestPosts.map((post) => (
          <div className="card3" key={post._id}>
            <div className="card-header">
              <div className="ac-post">
                <i className="fas fa-user-circle"></i>
                <p>{post.author?.name || 'user'}</p>
              </div>
              <div className="dot-menu" onClick={() => toggleMenu(post._id)}>
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
              <div className="like-button" onClick={() => toggleLike(post._id)}>
                <i className="fas fa-thumbs-up" id="likeIcon"></i>
                <span className="like-count" id="likeCount">{post.likes || 'Like'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="popular-post-h">
        <h2>Popular post</h2>
      </div>
      <div className="row3">
        {popularPosts.map((post) => (
                    <div className="card3" key={post._id}>
                    <div className="card-header">
                      <div className="ac-post">
                        <i className="fas fa-user-circle"></i>
                        <p>{post.author && post.author.name ? post.author.name : 'user'}</p>
                      </div>
                      <div className="dot-menu" onClick={() => toggleMenu(post._id)}>
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
                      <div className="like-button" onClick={() => toggleLike(post._id)}>
                        <i className="fas fa-thumbs-up" id="likeIcon"></i>
                        <span className="like-count" id="likeCount">{post.likes || 'Like'}</span>
                      </div>
                    </div>
                  </div>
          
        ))}
      </div>
    </div>
  );
};
export default LatestPost;
