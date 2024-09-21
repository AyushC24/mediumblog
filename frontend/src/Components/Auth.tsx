import { SignupInput } from "@ayushc24/medium-common";
import {ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type}:{type: "signup" | "signin"})=>{
    const navigate = useNavigate();
    const [postInputs,setPostInputs] = useState<SignupInput>({
        name:"",
        username:"",
        password:"",
    });

    async function sendRequest() {
        try{
            const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"?"signup":"signin"}`,postInputs);
            const jwt= response.data;
            localStorage.setItem("token",jwt); 
            navigate("/blogs")
        }
        catch(err){
            console.log(err);
        }

    }

    console.log(postInputs);
    return <div className="h-screen flex justify-center flex-col">
        {/* {JSON.stringify(postInputs)} */}
        <div className="flex justify-center">
            <div>

                <div className="px-10">
                    <div className="text-3xl font-bold">
                        Create an Account
                    </div>
                    <div className="text-slate-400">
                        {type==="signin"?"Don't have an account?":"Already have an account?"}

                        <Link className="pl-2 underline" to={type==="signup"?"/signin":"/signup"}>
                        {type==="signin"?"Sign up":"Sign in"}</Link>
                    </div>
                </div>

                <div className="pt-8">

                    {type==='signup'?<LabelledInput label="Name" placeholder="Ayush Chandra..." onChange={(e)=>{
                        setPostInputs(c => ({
                            ...c,
                            name: e.target.value
                        }))
                    }}/>:null}

                    <LabelledInput label="Username" placeholder="ayush@gmail.com" onChange={(e)=>{
                        setPostInputs(c => ({
                            ...c,
                            username: e.target.value
                        }))
                    }}/>    

                    <LabelledInput label="Password" type="password" placeholder="" onChange={(e)=>{
                        setPostInputs(c => ({
                            ...c,
                            password: e.target.value
                        }))
                    }}/>

                </div>

                <div className=""> 
                    <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mt-8" >{type=== "signup"?"Sign Up": "Sign In"}</button>
                </div>

            </div>
            
        </div>
        
    </div>
}

interface LabelledInputType{ 
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void; 
    type?:string;
}

function LabelledInput({label, placeholder, onChange,type}: LabelledInputType){
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-5">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />        
    </div>
}