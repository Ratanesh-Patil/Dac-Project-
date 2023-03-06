import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function MyBookings() {
  const userid = sessionStorage.getItem('userid')
  const [data, setData] = useState([])
  const BASE_URL = process.env.REACT_APP_BACKEND_URL
  useEffect(() => {
    loadData()
  }, [])
  const loadData = () => {
    axios.get(BASE_URL + 'api/bookings/users?userid=' + userid).then((resp) => {
      setData(resp.data)
    })
  }
  const handleCancel = (id) => {
    var res = window.confirm('Are you sure to cancel this booking')
    if (res) {
      axios.delete(BASE_URL + 'api/bookings/' + id).then((resp) => {
        toast.success(resp.data)
        loadData()
      })
    }
  }
  return (
    <>
      <div className='container-fluid' style={{ minHeight: '80vh' }}>
        <div className='card shadow mt-2'>
          <div className='card-body'>
            <h5 className='p-2' style={{ borderBottom: '2px solid green' }}>
              My Bookings
            </h5>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Booking Id</th>
                  <th>Car Name</th>
                  <th>Posted Date</th>
                  <th>Price</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((bk) => (
                  <tr>
                    <td>{bk.id}</td>
                    <td>
                      {bk.variant.company.compname} - {bk.variant.title}
                    </td>
                    <td>{bk.bookingdate}</td>
                    <td>₹ {bk.variant.price}/day</td>
                    <td>{bk.fromdate}</td>
                    <td>{bk.todate}</td>
                    <td>{bk.status}</td>
                    <td>
                      {bk.status === 'Pending' ? (
                        <button
                          onClick={(e) => handleCancel(bk.id)}
                          className='btn btn-outline-danger btn-sm'
                        >
                          Cancel
                        </button>
                      ) : (
                        <Link
                          to={'mybdetails/' + bk.id}
                          className='btn btn-outline-primary btn-sm'
                        >
                          Details
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
