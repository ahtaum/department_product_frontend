import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { FiTrash, FiPlus, FiEdit } from 'react-icons/fi'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import AdminLayout from '@/layouts/AdminLayout'
import UrlApi from '@/config/urlApi'
import Cookies from 'js-cookie'

Transaction.layout = AdminLayout

export default function Transaction() {
    const [data, setData] = useState<any>("")
    const [grandTotal, setGrandTotal] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const [sc, setSc] = useState("")
    const [error, setError] = useState<string>("")
    const [id, setId] = useState<number>()
    const [notif, setNotif] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const userAuth = Cookies.get("token_admin")

    useEffect(() => {
        setLoading(true)

        axios.get(`${UrlApi.data_api}sales/get/transaction`, { headers: { "Authorization" : "Bearer "+ userAuth } }).then((res) => {
            setData(res.data.tableData)
            setGrandTotal(res.data.grandTotal)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
            alert(error.messsage)
        })
    }, [notif])

    // Search Items
    const searchItems = () => {
        const searchParam = ["transaction_no", "customer_name"]
        
        return data?.filter((dt: any) => {
            return searchParam.some((newData) => {
                return (
                    dt[newData]?.toString().toLowerCase().indexOf(sc.toLowerCase()) > -1
                )
            })
        })
    }

    return (
        <>
        
        <Head>
            <title>Data Transaction</title>
        </Head>

        <section id="transaction-page" className="container my-4 p-3">

            <div className="mb-4 flex justify-between">
                <Link href="/admin/addTransaction" className="btn btn-primary text-xl"><FiPlus /></Link>

                <input type="text" placeholder="Search Items ..." className="input input-bordered lg:w-96 md:w-96" name="search-items" onChange={(e) => setSc(e.target.value)} value={sc} />
            </div>

            <h1 className="my-4 text-center font-bold text-2xl">Data Transaction</h1>

            { loading && <p className="text-current font-light">Loading...</p> }
            { error && <p className="text-red-500">{error}</p> }
            { !loading && !error && (
                <div className="overflow-x-auto my-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th> 
                                <th>Transaction Number</th> 
                                <th>Date</th> 
                                <th>Customer Name</th> 
                                <th>Quantity</th>
                                <th>Sub Total</th>
                                <th>Discount</th>
                                <th>Shipping Cost</th>
                                <th>Total Cost</th>
                            </tr>
                        </thead> 
                        <tbody>
                            { data && searchItems().map((transaction: any, index: number) => (
                                <tr key={index}>
                                    <th>{ index + 1 }</th> 
                                    <td>{ transaction.transaction_no }</td> 
                                    <td>{ transaction.date }</td> 
                                    <td>{ transaction.customer_name }</td> 
                                    <td>{ transaction.quantity }</td> 
                                    <td>{ transaction.subtotal }</td> 
                                    <td>{ transaction.discount }</td> 
                                    <td>{ transaction.shipping_cost }</td> 
                                    <td>{ transaction.total_cost }</td> 
                                    {/* <td>{ formatDistanceToNow(new Date(transaction.updated_at), { addSuffix: true }) }</td> */}
                                    {/* <td className="flex gap-4">
                                        <Link href={`/admin/item/${item.id}`} className="badge badge-success gap-2 p-3 hover:text-white"><FiEdit /></Link>
                                         <label htmlFor="delete-modal" className="badge badge-error gap-2 p-3 cursor-pointer hover:text-white" onClick={ () => setId(item.id) }><FiTrash /></label>
                                    </td> */}
                                </tr>
                            )) }
                        </tbody>
                        <tfoot>
                            <tr className="bg-base-200">
                                <th></th>
                                <th></th>
                                <th></th>
                                <th className="text-lg font-bold">Grand Total</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th className="text-lg font-bold">{ grandTotal }</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ) }

        </section>
        
        </>
    )
}
