import React from 'react'

const Navbar = () => {
    return (
        <div className="navbar bg-primary shadow-sm rounded-box mb-4">
            <div className="navbar-start">
                <h2 className="text-xl font-medium text-white">Task Dashboard</h2>
            </div>
            <div className="navbar-end">
                <a className="btn">+ Add</a>
            </div>
        </div>
    )
}

export default Navbar