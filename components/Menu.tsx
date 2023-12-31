import { useRouter } from "next/router"
import { useContext } from "react"
import Link from "next/link"
import Cookies from "js-cookie"
import { UserContext } from "@/context/UserContext"

export const Menu = () => {
    const router = useRouter()
    const { name } = useContext(UserContext)

    const handleLogout = () => {
        Cookies.remove("token_admin")
        Cookies.remove("data_admin")

        router.push("/")
    }

    return (
        <div className="navbar bg-base-100 container z-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>

                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href="/admin/dashboard">Dashboard</Link></li>
                        <li tabIndex={0}>
                            <details>
                                <summary>Transaction</summary>
                                <ul className="p-2 z-10">
                                    <li><Link href="/admin/transaction">Data Transaction</Link></li>
                                    <li><Link href="/admin/addTransaction">Order</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li><Link href="/admin/items">Items</Link></li>
                        <li><Link href="/admin/customers">Customers</Link></li>
                        <li><p onClick={handleLogout}>Logout</p></li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">{ name }</a>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href="/admin/dashboard">Dashboard</Link></li>
                    <li tabIndex={0}>
                        <details>
                            <summary>Transaction</summary>
                            <ul className="p-2 z-10">
                                <li><Link href="/admin/transaction">Data Transaction</Link></li>
                                <li><Link href="/admin/addTransaction">Order</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li><Link href="/admin/items">Items</Link></li>
                    <li><Link href="/admin/customers">Customers</Link></li>
                    <li><p onClick={handleLogout}>Logout</p></li>
                </ul>
            </div>
        </div>
    )
}
