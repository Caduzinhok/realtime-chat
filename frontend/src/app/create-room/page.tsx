"use client"
import { EyeClosedIcon, EyeIcon } from "lucide-react"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"

type FormData = {
    roomName: string,
    ownerName: string,
    havePassword: string,
    password?: string
}
export default function PageCreateNewRoom() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()
    const [isPasswordProtected, setIsPasswordProtected] = useState(false)
    const [isShowPassword, setIsShowPassword] = useState(false)
    const onSubmit: SubmitHandler<FormData> = data => {
        console.log(data)
    }

    const handleRoomTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setIsPasswordProtected(event.target.value === "protected")
    }

    const handleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }
    return (
        <div className="flex w-screen h-screen justify-center items-center md:py-24 py-2">
            <div className="max-w-2xl w-full h-full flex flex-col items-center border-2 border-red-500 rounded-lg p-4 space-y-8">
                <h1 className="text-3xl font-semibold text-red-700">
                    Create your New Room
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col justify-between h-full">
                    <div className="flex flex-col  gap-4">
                        <div className="flex flex-col w-full">
                            <label htmlFor="roomName" className="text-slate-800 font-medium">Room Name</label>
                            <input type="text" id="roomName" {...register("roomName", { required: true })} className="w-full border border-slate-600 rounded-sm p-1 outline-none" />
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="ownerName" className="text-slate-800 font-medium">Owner Name</label>
                            <input type="text" id="ownerName" {...register("ownerName", { required: true })} className="w-full border border-slate-600 rounded-sm p-1 outline-none" />
                        </div>

                        <div>
                            <label htmlFor="havePassword">Select room type:</label>
                            <select {...register("havePassword", { required: true })} id="havePassword" onChange={handleRoomTypeChange} className="w-full border border-slate-600 rounded-sm p-1 outline-none">
                                <option value=""></option>
                                <option value="public">Public Room</option>
                                <option value="protected">Protected Room</option>
                            </select>
                        </div>

                        {isPasswordProtected && (
                            <div className="flex flex-col w-full relative">
                                <label htmlFor="password" className="text-slate-800 font-medium">Password</label>
                                <input type={isShowPassword ? "text" : "password"} id="password" {...register("password", { required: isPasswordProtected })} className="w-full border border-slate-600 rounded-sm p-1 outline-none" />
                                {isShowPassword ? (
                                    <EyeIcon className="absolute z-10 right-2 top-8 transition delay-75" onClick={handleShowPassword}/>
                                ) : (
                                    <EyeClosedIcon className="absolute z-10 right-2 top-8 transition delay-75" onClick={handleShowPassword}/>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center w-full">
                    <button type="submit" className="border-2 border-green-600 w-full max-w-64 py-4 rounded-md hover:bg-green-600 hover:text-white transition delay-[25ms]">
                        Create
                    </button>
                    </div>
                </form>
            </div>
        </div>
    )
}