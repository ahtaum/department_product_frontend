import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Cookies from "js-cookie"
import axios from "axios"
import { MainLayout } from '@/layouts/MainLayout'

Login.layout = MainLayout

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [status, setStatus] = useState<Boolean>(false)
  const [authFail, setAuthFail] = useState<Boolean>(false)
  const [loading, setLoading] = useState<Boolean>(false)

  let handleLogin = async (e: any) => {
      e.preventDefault()

      await axios.post(``, {
          email: email,
          password: password
      }).then((res) => {
          setStatus(false)
          setAuthFail(false)
          setLoading(true)
          Cookies.set('token_admin', res.data.token.token, { expires: 1 })
          Cookies.set("data_admin", JSON.stringify(res.data.data))
          // router.push('/admin/dashboard')
      }).catch((error) => {
          setStatus(true)
          setAuthFail(true)
          setLoading(false)
      })
  }

  return (
    <>

    <Head>
      <title>Login</title>
    </Head>

    <section id="login-page" className="container flex items-center justify-center my-8 p-3">

        <div className="card bg-base-100 shadow-xl lg:p-8">
          <div className="card-body">
            <form>
              <h1 className="text-center font-bold mb-4 text-2xl">Login</h1>

              { authFail && (
                <div className="alert alert-error shadow-lg my-3">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Login Failed!, make sure <span className="font-bold">Username</span> and <span className="font-bold">Passoword</span> is Correct!</span>
                    </div>
                </div>
              ) }

              <div className="form-control mb-4">
                  <label className="label">
                      <span className="label-text">Email</span>
                  </label>

                  <input type="email" placeholder="Type Your Email" className="input input-bordered" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                  { status && !email ? <span className="text-red-500">Email Must be Filled!</span> : "" }
              </div>

              <div className="form-control mb-4">
                  <label className="label">
                      <span className="label-text">Password</span>
                  </label>

                  <input type="password" placeholder="Your Password" className="input input-bordered" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                  { status && !password ? <span className="text-red-500">Password Must be Filled!</span> : "" }
              </div>

              { loading && (
                  <div className="text-center mt-8">
                      <h1>Loading...</h1>
                  </div>
              ) }

              { !loading && (
                <div className="flex justify-between mt-8">
                  <Link href="/register" className="btn btn-success">Register</Link>

                  <button className="btn btn-primary" type="submit">Login</button>
                </div>
              ) }

            </form>
          </div>
        </div>

    </section>

    </>
  )
}
