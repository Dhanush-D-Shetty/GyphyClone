import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const AppLayout = () => {
    return (
        <div className='bg-gray-950 text-white min-h-screen'>
            <div className='container px-6 py-4 mx-auto'>
                <Navbar />          {/* custom component  */}
                <main>
                    <Outlet />        {/* for renderng differnt pages */}
                </main>
            </div>
        </div>
    );
}

export default AppLayout