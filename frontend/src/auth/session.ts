'use server'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 10 * 1000)
    const session = await encrypt({ userId, expiresAt })
    const cookieStore = await cookies()
   
    cookieStore.set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      path: '/home',
    })
  }

export async function getSession(){
  const session = (await cookies()).get('session')?.value
  if(!session){
    return null
  }

  return await decrypt(session)

}
export async function updateSession(request: NextRequest){
  const session = request.cookies.get('session')?.value

  if(!session){
    return
  }
  const parsed = await decrypt(session)

  if(parsed){
    const expiresAt = new Date(Date.now() + 10 * 1000)
    const res = NextResponse.next()

    res.cookies.set({
      name: 'session',
      value: await encrypt(parsed),
      httpOnly: true,
      expires: expiresAt
    })
  }
}

export async function login(userID: string) {
  await createSession(userID)
  
  // 5. Redirect user
  redirect('/home')
}