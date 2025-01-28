import db from "../config.js";

const insertNewUser = async (id, fullName, email, password) => {
    const length = await searchUser(email)

    const userAlreadyExists = length & length > 0 ? true : false 
    if(userAlreadyExists === false) {
        try {
            const query = `
            INSERT INTO
                users (id, fullName, email, password)
                VALUES ($1, $2, $3, $4)
        
            RETURNING *
            `
        
            const result = await db.query(query, [id, fullName, email, password])

            return true
        }catch(e){
            return false
        }
        
        
    }else{
        return false
    }
}

const searchUser = async (email) => {
    try{ 
        const query = `
        SELECT email FROM users WHERE users.email = $1
    `;

    const result = await db.query(query, [email]); // Passando o valor como parâmetro
    return result.rowCount;

    }catch{
        console.log(`Erro na consulta`)
        return 0
    }


}

export default insertNewUser