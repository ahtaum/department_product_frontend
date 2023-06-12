import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Cookies from "js-cookie"
import type { LayoutProps } from "../types/PageWithLayouts"
import { Menu } from "@/components/Menu"

let AdminLayout: LayoutProps = ({ children }: any) => {
  let [key, setKey] = useState(0);
  let userAuth = Cookies.get("token_admin")
  let router = useRouter()

  useEffect(() => {
    if(!userAuth) {
      router.push("/")
      alert("anda harus login")
    } else {
      setKey(key + 1);
    }
  }, [userAuth])

  return (
    <>
      <Menu />

      {children}
    </>
  )
}

export default AdminLayout