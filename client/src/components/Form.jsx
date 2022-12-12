import React from 'react'
import { useState } from 'react'
import {registerForClass} from "../actions/main"

const Form = () => {

    const [formData, setFormData] = useState({})
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        registerForClass(formData)
    }
    return (
        <div><form onSubmit={onSubmit}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => onChange(e)} type="email" name='email' className="form-control" placeholder="Email" />
                </div>

            </div>
            <div className="form-group">
                <label htmlFor="inputName">Name</label>
                <input type="text" onChange={(e) => onChange(e)} name='name' className="form-control" placeholder="Name" />
            </div>


            <div className="form-group">
                <label htmlFor="inputName">Age</label>
                <input type="number" onChange={(e) => onChange(e)} name='age' className="form-control" placeholder="Age" />
            </div>


            <div className="form-row">
                <div className="form-group col-md-4">
                    <label htmlFor="inputState">Batch</label>
                    <select onChange={(e) => onChange(e)} name="batch" id="inputState" className="form-control">
                        <option defaultValue={"6-7(AM)"}>Choose...</option>
                        <option value="6-7(AM)">6-7(AM)</option>
                        <option value="7-8(AM)">7-8(AM)</option>
                        <option value="8-9(AM)">8-9(AM)</option>
                        <option value="5-6(PM)">5-6(PM)</option>
                    </select>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
        </form></div>
    )
}

export default Form