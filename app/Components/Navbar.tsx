import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav>
        <Link to={"/"}>
            <p className='text-2xl font-bold text-gradient'> SMART CV</p>
        </Link>
        <Link to="/upload" className="primary-button w-fit px-4 py-2 left-0">
            Upload Resume
        </Link>
    </nav>
  )
}

export default Navbar