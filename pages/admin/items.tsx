import { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import AdminLayout from '@/layouts/AdminLayout'
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import UrlApi from '@/config/urlApi'
import Cookies from 'js-cookie'

Items.layout = AdminLayout

export default function Items() {
    const [data, setData] = useState<any>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [sc, setSc] = useState("")

    const userAuth = Cookies.get("token_admin")

    useEffect(() => {
        setLoading(true)

        axios.get(`${UrlApi.data_api}items`, { headers: { "Authorization" : "Bearer "+ userAuth } }).then((res: any) => {
            setData(res.data.items)
            setLoading(false)
        }).catch((error) => {
            alert(error.messsage)
        })

    }, [])

    let searchItems = () => {
        let searchParam = ["name"]

        return data?.filter((dt: any) => {
            return searchParam.some((newData) => {
                return (
                    dt[newData].toString().toLowerCase().indexOf(sc.toLowerCase()) > -1
                )
            })
        })
    }

    return (
        <>
        
        <Head>
            <title>Items</title>
        </Head>

        <section id="items-admin-page" className="container my-4 p-3">
            
            <div className="mb-4 flex justify-between">
                <button className="btn btn-primary">Add</button>

                <input type="text" placeholder="Search Items ..." className="input input-bordered lg:w-96 md:w-96" name="search-items" />
            </div>

            <h1 className="my-4 text-center font-bold text-2xl">Items</h1>

            <div className="overflow-x-auto my-8">
                <table className="table">
                    <thead>
                    <tr>
                        <th></th> 
                        <th>Code</th> 
                        <th>Name</th> 
                        <th>Price</th> 
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                    </thead> 
                    <tbody>
                        { data && searchItems().map((item: any, index: number) => (
                            <tr key={index}>
                                <th>{ index + 1 }</th> 
                                <td>{ item.code }</td> 
                                <td>{ item.name }</td> 
                                <td>{ item.price }</td> 
                                <td>{ formatDistanceToNow(new Date(item.updated_at), { addSuffix: true }) }</td>
                                <td className="flex gap-4">
                                    <span className="badge badge-success">Edit</span>
                                    <span className="badge badge-error cursor-pointer">Delete</span>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>

        </section>

        </>
    )
}
