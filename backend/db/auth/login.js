import db from "../config.js";

const searchLoginUser = async (email, password) => {
    try {
        const query = `
        SELECT
            email, password, id
        FROM users
        WHERE email = $1
        `
        const result = await db.query(query, [email])
    
        if (result.rows[0].password == password) {
           return result.rows[0].id
        }
    } catch (e) {
        return null
    }
    return null
}

export default searchLoginUser