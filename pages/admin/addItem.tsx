import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Cookies from 'js-cookie'
import UrlApi from '@/config/urlApi'
import AdminLayout from '@/layouts/AdminLayout'
import axios from 'axios'

AddItem.layout = AdminLayout

export default function AddItem() {
    const userAuth = Cookies.get("token_admin")

    const [name, setName] = useState<string>("")
    const [price, setPrice] = useState<number | null>(null)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [status, setStatus] = useState<boolean>(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
      
        setErrors({})
      
        await axios
          .post(`${UrlApi.data_api}items/add`, { name, price }, { headers: { "Authorization": "Bearer " + userAuth } })
          .then((res) => {
            setStatus(true)
            setName("")
            setPrice(null)
          })
          .catch((error) => {
            setStatus(false)
            if (error.response && error.response.data && error.response.data.errors) {
                const apiErrors = error.response.data.errors
                const fieldErrors: Record<string, string> = {}
                apiErrors.forEach((apiError: any) => {
                    fieldErrors[apiError.field] = apiError.message
                })
                setErrors(fieldErrors)
            } else {
                setErrors({ error: 'An error occurred while adding the item.' })
            }
        })
    }      

    return (
        <>

            <Head>
                <title>Add Item</title>
            </Head>

            <section id="add-item-page-admin" className="container my-4 p-3">

                <h1 className="text-2xl font-bold my-4">Add Item</h1>

                { status && (   
                    <div className="alert alert-success my-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Add Item Successfuly!</span>
                    </div>
                ) }

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>

                                <input type="text" placeholder="Type here" className="input input-bordered" name="name" onChange={(e) => setName(e.target.value)} value={name} />
                                {errors && errors.name && <div className="text-red-500">{errors.name}</div>}
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>

                                <input type="number" placeholder="Type here" className="input input-bordered" name="price" onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : null)} value={price !== null ? price.toString() : ''} />
                                {errors && errors.price && <div className="text-red-500">{errors.price}</div>}
                            </div>

                            <div className="flex justify-between">
                                <Link href="/admin/items" className="btn btn-error">Back</Link>
                                <button className="btn btn-primary" type="submit">Add</button>
                            </div>

                        </form>
                    </div>
                </div>

            </section>

        </>
    )
}
