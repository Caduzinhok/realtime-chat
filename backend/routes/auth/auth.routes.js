import express from "express"
import insertNewUser from '../../db/auth/create-new-user.js'
import searchLoginUser from "../../db/auth/login.js"
const router = express.Router()

router.post("/login", async (req, res) => {
    console.log('Sign in...')

    const { email, password} = req.body
    const userId = await searchLoginUser(email, password)

    if(userId){
        console.log("Allowed...")
        return res.status(200).json({ message: "Permitido", userId: userId})


    }
    console.log(("Denied..."))
    res.status(200).json({ message: "Negado" })
})

router.post("/create-account", async (req, res) => {
    console.log('Creating account...')

    const {id, fullName, email, password} = req.body
    const userCreated = await insertNewUser(id, fullName, email, password)

    if(userCreated){
        console.log("Account Created!!!")
        return res.status(200).json({ message: "Login criado com sucesso!!!", isAccountCreated: userCreated})

    }
    console.log("Account already exists!!")
    return res.status(200).json({ message: "Usuário já existe!!!", isAccountCreated: userCreated})
    
})

export default router