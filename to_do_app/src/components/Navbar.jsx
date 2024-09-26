import React from 'react'

const Navbar = () => {
  return (
    // mx is margin py is padding curson-pointer to make the cursor pointer
    <nav className="flex justify-between text-white bg-sky-700 py-4">
      <div className="logo">
        <span className='font-bold text-2xl  mx-10'>TodoTrek</span>
         <br />
        <span className='mx-3'>Your Daily ToDo Tracker</span>
      </div>
      <div>
        
      </div>
      <ul className="flex gap-5  mx-5">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
