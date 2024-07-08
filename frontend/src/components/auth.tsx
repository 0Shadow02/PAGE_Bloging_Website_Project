import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";

export const Auth = ({type}:{type:"signup" | "signin"})=>{  
    const navigate = useNavigate() 
    const [postInputs,setPostInputs] = useState({
    name: "",
    email: "",
    password: ""
   })
  async function sendRequest(){
    try {
         const response= await axios.post(`${BACKEND_URL}/api/v1/user/${type ==="signup"?"signup" : "signin"}`, postInputs)
         const jwt = response.data.token
         localStorage.setItem('token',jwt)
         
         navigate("/blog/1")
         
    } catch (error) {
        return error
    }
      
  }
    return <div className="h-screen  flex justify-center flex-col">
         <div className="flex justify-center ">
            <div className="w-full max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <div className="text-3xl font-bold mt-4 px-8 mb-4">
                    Create an account
                </div>
                <div className="text-slate-500 text-center">
                   { type === "signin" ? "Don't have an account?" : "Already have an account?"}
                    <Link className="pl-2 underline" to={type==="signup" ? "/signin" : "/signup"}> {type ==="signup" ? "Login":"Signup"}</Link>
                </div>
                <div className="mt-1">
               {type === "signup"? <LabeledInput label="Name" placeholder="Shadow..." onChange={(e)=>{setPostInputs(c=>({...c,name:e.target.value}))}}/> :null}
                <LabeledInput label="Username" placeholder="shadow@gmail.com" onChange={(e)=>{setPostInputs(c=>({...c,email:e.target.value}))}} />
                <LabeledInput label="Password" type={"password"} placeholder="Pass@123" onChange={(e)=>{setPostInputs(c=>({...c,password:e.target.value}))}} />
                </div>
              
                   <button onClick={sendRequest} type="button" className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 mt-6">{type=== "signup"?"Sign up":"Sign in " }</button>
              
            </div>
        </div>
    </div>
}
interface LabeledInpuType {
    label:string;
    placeholder:string;
    onChange:(e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}
function LabeledInput({label ,placeholder ,onChange,type}:LabeledInpuType){
    return <div>
    <label className="block mb-2 text-sm font-semibold text-black pt-4 ">{label}</label>
    <input onChange={onChange} type={type||'text'} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
</div>
}