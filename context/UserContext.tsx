import { createContext, useState, useEffect } from "react"
import Cookies from "js-cookie"

interface DataContract {
  id?: number
  email: string
  name: string
  password: string
  created_at?: string
  updated_at?: string
}

export const UserContext = createContext<DataContract>({
  id: 0,
  email: "",
  name: "",
  password: "",
  created_at: "",
  updated_at: "",
})

export default function UserProvider(props: any) {
  type typeDataUser = {
    id: number
    email: string
    name: string
    password: string
    created_at: string
    updated_at: string
  }

  const [data, setData] = useState<typeDataUser>({
    id: 0,
    email: "",
    name: "",
    password: "",
    created_at: "",
    updated_at: "",
  })
  const [isAuth, setAuth] = useState<boolean>(false)

  const dataUser = Cookies.get("data_admin")
  const dt = JSON.parse(dataUser || "{}")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData(dt)
      setAuth(true)
    }
  }, [isAuth, setAuth])

  return (
    <UserContext.Provider value={data}>
      {props.children}
    </UserContext.Provider>
  )
}
