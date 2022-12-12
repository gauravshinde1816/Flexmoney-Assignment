import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../actions/main'
import Alerts from './Alerts'


const UserDetails = () => {
    let user = useParams()
    const [userDetails, setuserDetails] = useState({})
    const [batch, setBatch] = useState("")
    const [alert, setAlert] = useState({ msg: " ", status: "" })

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axiosInstance.post(`/payments/${user["userid"]}`)
            console.log("Status Text : ", res.statusText)
            setAlert({ status: "success", msg: res.data.SuccessMessage })

        } catch (error) {
            console.log(error.response.data.msg)
            setAlert({ status: "danger", msg: error.response.data.msg })

        }

    }
    useEffect(() => {
        const getUserDetails = async () => {

            const res = await axiosInstance.get(`users/${user["userid"]}`)
            console.log("USer res : ", res.data)


            setuserDetails(res.data)
        }
        getUserDetails()
        
    }, [])


    // // set Batch
    // if (userDetails) {
    //     setBatch(userDetails?.YogaClass?.Batch)
    // }

    if (alert.msg !== "" && alert.status !== "") {
        setTimeout(() => {
            setAlert({ msg: "", status: "" })
        }, 5000)
    }


    const ChangeBatch = async (e) => {
        try {
            const res = await axiosInstance.post(`changeBatch/${user["userid"]}`, { batch })
            setAlert({ status: "success", msg: res.data.SuccessMessage })
        } catch (error) {
            console.log(error.response.data.msg)
            setAlert({ status: "danger", msg: error.response.data.msg })
        }
    }

    return (
        <div>
            {alert && <Alerts msg={alert.msg} status={alert.status} />}
            <form onSubmit={onSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="email">Email</label>
                        <input value={userDetails && userDetails.Email} type="email" name='email' className="form-control" placeholder="Email" />
                    </div>

                </div>
                <div className="form-group">
                    <label htmlFor="inputName">Name</label>
                    <input type="text" value={userDetails && userDetails.Name} name='name' className="form-control" placeholder="Name" />
                </div>


                <div className="form-group">
                    <label htmlFor="inputName">Age</label>
                    <input type="number" value={userDetails && userDetails.Age} name='age' className="form-control" placeholder="Age" />
                </div>


                <div className="form-group">
                    <label htmlFor="inputName">Current Batch</label>
                    <input readOnly type="text" value={userDetails && userDetails?.YogaClass?.Batch} name='batch' className="form-control" />
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="inputState">Batch</label>
                        <select name="batch" id="inputState" onChange={(e) => setBatch(e.target.value)} value={batch} className="form-control">
                            <option defaultValue={"6-7(AM)"}>Choose...</option>
                            <option value="6-7(AM)">6-7(AM)</option>
                            <option value="7-8(AM)">7-8(AM)</option>
                            <option value="8-9(AM)">8-9(AM)</option>
                            <option value="5-6(PM)">5-6(PM)</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Pay</button>
                <a className="btn btn-warning" onClick={ChangeBatch}>Change Batch</a>
            </form></div>
    )
}

export default UserDetails