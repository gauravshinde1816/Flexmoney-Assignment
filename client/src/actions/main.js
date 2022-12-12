import axios from "axios";

export const axiosInstance = axios.create({
    headers :{
        post :{
            "Content-Type" : "application/json"
        }
    },
    baseURL:"http://localhost:5000/api/"
})


export const registerForClass = async(data) =>{
    try {
        const res = await axios.post(`register` , data)
        console.log(res.data)
    } catch (error) {
        console.log(error.message)
    }
}


export const GetUsers = async() =>{
    try {
        const res = await axios.get(`users` )
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error.message)
    }
}