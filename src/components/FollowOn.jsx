import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const FollowOn = () => {
  return (
    <div className='pt-2 faded-text'>     {/*  custom class faded-text */}
        <span>Follow on:</span>
        <div className='flex gap-4 pt-2'> 
            <a href="https://www.linkedin.com/in/dhanush-d-shetty-843bb4264/" target='_blank'>
            <FaLinkedin size={20}/>
            </a>
            <a href="https://github.com/Dhanush-D-Shetty" target="_blank">
            <FaGithub size={20}/>
            </a>
        </div>
    </div>
  )
}

export default FollowOn