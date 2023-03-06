import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'

export default function Reports() {
  const [data, setData] = useState([])
  const BASE_URL = process.env.REACT_APP_BACKEND_URL
  useEffect(() => {
    axios.get(BASE_URL + 'api/bookings/payments').then((resp) => {
      setData(resp.data)
    })
  }, [])
  return (
    <>
      <div className='content-wrapper p-2'>
        <div
          className='container-fluid shadow p-2 bg-white'
          style={{ minHeight: '88vh' }}
        >
          <h4 className='p-2' style={{ borderBottom: '2px solid green' }}>
            Payment Reports
          </h4>
          <table className='table table-bordered table-sm mt-2'>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Payment Date</th>
                <th>Booking Id</th>
                <th>Customer Name</th>
                <th>Remarks</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((x) => (
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>{moment(x.pmtdate).format('DD-MMM-yyyy')}</td>
                  <td>{x.booking.id}</td>
                  <td>{x.booking.customer.uname}</td>
                  <td>{x.remarks}</td>
                  <td>₹ {x.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
