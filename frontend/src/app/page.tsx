"use client"
import FormsLogin from "@/components/formsLogin";
import FormsCreateNewAccount from "@/components/formsNewAccount";
import { useState } from "react";

export default function Page() {
    const [isCreateNewAccountSelected, setIsCreateNewAccountSelected] = useState(false)

    function handleChangeLoginForms() {
        setIsCreateNewAccountSelected(!isCreateNewAccountSelected)
    }

    return (
        <div className="grid grid-cols-2 w-screen h-screen">
            <div className="flex flex-col items-center justify-center ">

                <div className="max-w-80">
                    <h1 className="text-3xl font-semibold text-slate-700">
                        Welcome to Chat APP
                    </h1>
                    {!isCreateNewAccountSelected ?
                        (
                            <FormsLogin
                            handleChangeLoginForms={handleChangeLoginForms} 
                            />
                        )
                        : (
                            <FormsCreateNewAccount
                            handleChangeLoginForms={handleChangeLoginForms}
                            />
                        )}

                </div>

            </div>
            <div className="flex items-center justify-center w-full h-full">
                <div className="w-full h-full bg-background-login bg-no-repeat bg-contain" />
            </div>
        </div>
    )
}