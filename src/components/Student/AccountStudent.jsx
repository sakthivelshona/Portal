import React from 'react'
import Sidebar from './Sidebar'

function AccountStudent() {
    return (
        <div>
            <Sidebar />
            <div className="student-account-container">
                <div className="student-details">
                    <label htmlFor="">Name</label>
                    <input type="text" />
                </div>
                <div className="student-details">

                    <label htmlFor="">Email</label>
                    <input type="email" />
                </div>

                <div className="student-details">

                    <label htmlFor="">Phone Number</label>
                    <input type="number" />
                </div>
                <div className="student-details">
                    <label htmlFor="">Upload your resume</label>
                    <input type="file" name="" id="" />
                </div>

                <button>Save</button>
            </div>
        </div>
    )
}

export default AccountStudent
