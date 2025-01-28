'use client'
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"
import { redirect } from "next/dist/server/api-utils";
type FormLogin = {
    fullName: string,
    email: string,
    password: string
}

interface FormsNewAccountProps {
    handleChangeLoginForms: VoidFunction
}

export default function FormsCreateNewAccount({ handleChangeLoginForms }: FormsNewAccountProps) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormLogin>()
    const [accountExists, setAccountExists] = useState(false)

    const onSubmit: SubmitHandler<FormLogin> = async data => {
        const id = uuidv4()
        const body = {
            id: id,
            fullName: data.fullName,
            email: data.email,
            password: data.password
        }
        // Envia uma requisição post
        const response = await axios({
            method: "post",
            url: "http://localhost:3333/api/auth/create-account",
            data: body,
        });

        if(response.data.isAccountCreated){
        }else{
            setAccountExists(true)
        }

    }


    return (

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6 h-full">
            <p className="text-slate-500">Create you account now!</p>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col w-full">
                    <label htmlFor="fullName" className="text-slate-800 font-medium">Full Name</label>
                    <input type="text" id="fullName" {...register("fullName", { required: true })} className="w-full border border-slate-600 rounded-sm p-1 outline-none" />
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="email" className="text-slate-800 font-medium">E-mail</label>
                    <input type="email" id="email" {...register("email", { required: true })} className="w-full border border-slate-600 rounded-sm p-1 outline-none" />
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="password" className="text-slate-800 font-medium">Password</label>
                    <input type="password" id="password" {...register("password", { required: true })} className="w-full border border-slate-600 rounded-sm p-1 outline-none" />
                </div>
            </div>
            {accountExists && (
                <p className="text-red-700 text-sm"> 
                    Account Already Exists! Change the e-mail.
                </p>
            )}
            <div className="flex justify-between w-full">
                <button
                    onClick={handleChangeLoginForms}
                    type="button"
                    className="border-2 border-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-500 hover:text-white transition delay-[25ms]">
                    Already Have Account
                </button>
                <button type="submit" className="border-2 border-green-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white transition delay-[25ms]">
                    Sign Up
                </button>
            </div>
            
        </form>
    )
}