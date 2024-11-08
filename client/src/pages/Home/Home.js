import React from 'react'
import Header from '../../components/Header/Header'
import LatestPost from '../../components/LatestPost/LatestPost'

function Home({user}) {
  return (
    <div className='Home'>
        <Header user={user.name}/>

        <div className='main'>
            <LatestPost/>
        </div>
      
    </div>
  )
}

export default Home
