import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosInstance } from '../actions/main'

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const getUser = async () => {
            const res = await axiosInstance.get("users/")
            console.log(res)
            setUsers(res.data)
        }
        getUser()
    }, [])


   
    return (

        <table className='table'>
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Batch</th>
                    <th scope="col">Date of Registration</th>
                    <th scope="col">Details</th>
                </tr>
            </thead>
            <tbody>
                {users.map(u => (
                    <tr key={u.Email}>

                        <td>{u.Name}</td>
                        <td>{u.Email}</td>
                        <td>{u.YogaClass.Batch}</td>
                        <td>{u.YogaClass.DateOfRegistration}</td>
                        <td><Link to={`/users/${u._id}`} className='btn btn-sm btn-warning' >View Details</Link></td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}



export default Users