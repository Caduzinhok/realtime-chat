"use client"
import { login } from "@/auth/session"
import axios from "axios"
import { redirect } from "next/navigation"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"

type FormLogin = {
    email: string,
    password: string
}

interface FormsLoginProps{
    handleChangeLoginForms: VoidFunction
}

export default function FormsLogin({handleChangeLoginForms} : FormsLoginProps) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormLogin>()

    const onSubmit: SubmitHandler<FormLogin> = async data => {
        const body = {
            email: data.email,
            password: data.password
        }
        // Envia uma requisição post
        const response = await axios({
            method: "post",
            url: "http://localhost:3333/api/auth/login",
            data: body,
        });
        console.log(response.data)
        if(response.data.message === "Permitido"){
            login(response.data.id)
            redirect('/home')
        }
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6 h-full">
            <p className="text-slate-500">Please enter your account</p>
            <div className="flex flex-col  gap-4">
                <div className="flex flex-col w-full">
                    <label htmlFor="email" className="text-slate-800 font-medium">E-mail</label>
                    <input type="email" id="email" {...register("email", { required: true })} className="w-full border border-slate-600 rounded-sm p-1 outline-none" />
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="password" className="text-slate-800 font-medium">Password</label>
                    <input type="password" id="password" {...register("password", { required: true })} className="w-full border border-slate-600 rounded-sm p-1 outline-none" />
                </div>
            </div>

            <div className="flex justify-between w-full">
                <button 
                onClick={handleChangeLoginForms}
                type="button" 
                className="border-2 border-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-500 hover:text-white transition delay-[25ms]">
                    Create Account
                </button>
                <button type="submit" className="border-2 border-green-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition delay-[25ms]">
                    Sign In
                </button>
            </div>
        </form>
    )
}