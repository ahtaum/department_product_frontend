import { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import AdminLayout from '@/layouts/AdminLayout'
import UrlApi from '@/config/urlApi'
import Cookies from 'js-cookie'

AddTransaction.layout = AdminLayout

export default function AddTransaction() {
  const userAuth = Cookies.get('token_admin')
  const [customers, setCustomers] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const [customerId, setCustomerId] = useState<number>(0)
  const [discount, setDiscount] = useState<number>(0)
  const [shippingCost, setShippingCost] = useState<number>(0)
  const [date, setDate] = useState<string>('')
  const [notif, setNotif] = useState<boolean>(false)

  useEffect(() => {
    axios.get(`${UrlApi.data_api}customers`, { headers: { Authorization: `Bearer ${userAuth}` } })
      .then((res: any) => {
        setCustomers(res.data.customers)
      })
      .catch((error) => {
        alert(error.message)
      })

    axios.get(`${UrlApi.data_api}items`, { headers: { Authorization: `Bearer ${userAuth}` } })
      .then((res: any) => {
        setItems(res.data.items)
      })
      .catch((error) => {
        alert(error.message)
      })
  }, [])

  // Notification Component
  const Notification = ({ message }: any) => {
    setTimeout(() => {
      setNotif(false)
    }, 10000)

    return (
      <div className="toast z-10">
        <div className="alert alert-success">
          <div>
            <span>{message}</span>
          </div>
        </div>
      </div>
    )
  }

  // Menambahkan item ke dalam selectedItems
  const addItem = () => {
    const newItem = {
      itemId: 0,
      quantity: 0
    }
    setSelectedItems([...selectedItems, newItem])
  }

  // Menghapus item dari selectedItems berdasarkan indeks
  const removeItem = (index: number) => {
    const updatedItems = [...selectedItems]
    updatedItems.splice(index, 1)
    setSelectedItems(updatedItems)
  }

  return (
    <>
      <Head>
        <title>Add Transaction</title>
      </Head>

      {/* Notification */}
      {notif && <Notification message="Transaction Added Successfully!" />}

      {/* Form Add Transaction */}
      <section id="addTransaction-page" className="container my-4 p-3">
        <h1 className="text-2xl font-bold my-4">Add Transaction</h1>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form>
                <div className="form-control mb-4">
                    <label className="label mb-2">
                        <span className="label-text">Date Transaction</span>
                    </label>

                    <input type="datetime-local" placeholder="Type here" className="input input-bordered" value={date} onChange={(e) => setDate(e.target.value)} name="date" />
                </div>

                <div className="form-control mb-4">
                    <label className="label mb-2">
                        <span className="label-text">Customers Name</span>
                    </label>

                    <select className="select select-bordered" value={customerId} onChange={(e) => setCustomerId(Number(e.target.value))} name="customerId">
                        <option disabled value={0}>Customer</option>
                        {customers.map((customer: any) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    {selectedItems.map((selectedItem, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <div className="w-2/3">
                                <label className="label">
                                    <span className="label-text">Item Name</span>
                                </label>

                                <select className="select select-bordered" value={selectedItem.itemId}
                                onChange={(e) => {
                                    const updatedItems = [...selectedItems]
                                    updatedItems[index].itemId = Number(e.target.value)
                                    setSelectedItems(updatedItems)
                                }} name="itemId">
                                    <option disabled value={0}>Select Item</option>
                                    {items.map((item: any) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="w-1/3">
                                <label className="label">
                                    <span className="label-text">Quantity</span>
                                </label>

                                <input type="number" placeholder="Type here" className="input input-bordered"value={selectedItem.quantity} onChange={(e) => {
                                    const updatedItems = [...selectedItems]
                                    updatedItems[index].quantity = Number(e.target.value)
                                    setSelectedItems(updatedItems)
                                }} name="quantity" />
                            </div>

                            <div>
                                <button type="button" className="btn btn-error btn-sm ml-2" onClick={() => removeItem(index)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    
                    <button type="button" className="btn btn-info w-full" onClick={addItem}>Add Item</button>
                </div>

                <div className="form-control mb-4">
                    <label className="label mb-2">
                        <span className="label-text">Discount</span>
                    </label>

                    <input type="number" placeholder="Type here" className="input input-bordered" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} name="discount" />
                </div>

                <div className="form-control mb-4">
                    <label className="label mb-2">
                        <span className="label-text">Shipping Cost</span>
                    </label>

                    <input type="number" placeholder="Type here" className="input input-bordered" value={shippingCost} onChange={(e) => setShippingCost(Number(e.target.value))} name="shippingCost" />
                </div>

                <div className="flex justify-between">
                    <Link href="/admin/transaction" className="btn btn-error">Back</Link>

                    <button className="btn btn-primary" type="submit">Add</button>
                </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
