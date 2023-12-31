import { useState, useEffect } from 'react'
import { FiTrash, FiPlus, FiEdit } from 'react-icons/fi'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import AdminLayout from '@/layouts/AdminLayout'
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import UrlApi from '@/config/urlApi'
import Cookies from 'js-cookie'

Items.layout = AdminLayout

export default function Items() {
    const [data, setData] = useState<any>("")
    const [loading, setLoading] = useState<boolean>(true)
    const [sc, setSc] = useState("")
    const [error, setError] = useState<string>("")
    const [id, setId] = useState<number>()
    const [notif, setNotif] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const userAuth = Cookies.get("token_admin")

    // Fetch Items
    useEffect(() => {
        setLoading(true)

        axios.get(`${UrlApi.data_api}items`, { headers: { "Authorization" : "Bearer "+ userAuth } }).then((res: any) => {
            setData(res.data.items)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
            alert(error.messsage)
            setError("An error occurred while fetching the items.")
        })

    }, [notif])

    // Delete Item
    const deletePost = async (e: any) => {
        e.preventDefault()

        await axios.delete(`${UrlApi.data_api}items/delete/${id}`, { headers: { "Authorization" : "Bearer "+ userAuth } }).then((response) => {
            setNotif(true)
        }).catch((error: any) => {
            alert(error.message)
            setNotif(false)
        })

        setIsModalOpen(false)
    }

    // Search Items
    const searchItems = () => {
        const searchParam = ["name", "code"]
      
        return data?.filter((dt: any) => {
          return searchParam.some((newData) => {
            return (
              dt[newData]?.toString().toLowerCase().indexOf(sc.toLowerCase()) > -1
            )
          })
        })
    }

    // Notification Component
    const Notification = ({ message }: any) => {
        setTimeout(() => {
            setNotif(false)
        }, 10000)

        return (
            <div className="toast z-10">
                <div className="alert alert-success">
                    <div>
                        <span>{ message }</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
        
        <Head>
            <title>Items</title>
        </Head>

        {/* Notification */}
        { notif && <Notification message="Item Deleted Successfuly!" /> }

        {/* Delete Modal */}
        <input type="checkbox" id="delete-modal" className="modal-toggle" checked={isModalOpen} onChange={() => setIsModalOpen(!isModalOpen)} />
        <div className="modal">
            <div className="modal-box flex flex-col gap-8">
                <h3 className="font-bold text-lg text-center">Are You Sure to DELETED this Post?</h3>

                <div className="modal-action flex justify-between">
                    <label htmlFor="delete-modal" className="btn btn-error">close</label>

                    <label htmlFor="delete-modal" className="btn btn-warning" onClick={deletePost}>Delete</label>
                </div>
            </div>
        </div>

        <section id="items-admin-page" className="container my-4 p-3">
            
            <div className="mb-4 flex justify-between">
                <Link href="/admin/addItem" className="btn btn-primary text-xl"><FiPlus /></Link>

                <input type="text" placeholder="Search Items ..." className="input input-bordered lg:w-96 md:w-96" name="search-items" onChange={(e) => setSc(e.target.value)} value={sc} />
            </div>

            <h1 className="my-4 text-center font-bold text-2xl">Items</h1>

            { loading && <p className="text-current font-light">Loading...</p> }
            { error && <p className="text-red-500">{error}</p> }
            { !loading && !error && (
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
                                        <Link href={`/admin/item/${item.id}`} className="badge badge-success gap-2 p-3 hover:text-white"><FiEdit /></Link>
                                         <label htmlFor="delete-modal" className="badge badge-error gap-2 p-3 cursor-pointer hover:text-white" onClick={ () => setId(item.id) }><FiTrash /></label>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
            ) }

        </section>

        </>
    )
}
