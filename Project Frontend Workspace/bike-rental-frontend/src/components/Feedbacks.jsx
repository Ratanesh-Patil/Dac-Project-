import axios from 'axios'
import { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import moment from 'moment'

export default function Feedbacks() {
  const [data, setData] = useState([])
  const BASE_URL = process.env.REACT_APP_BACKEND_URL
  useEffect(() => {
    axios.get(BASE_URL + 'api/bookings/feedbacks').then((resp) => {
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
            Feedbacks
          </h4>
          <table className='table table-bordered table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Feedback</th>
                <th>Ratings</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((x) => (
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>{x.customer.uname}</td>
                  <td>{x.descr}</td>
                  <td>
                    <Rating
                      initialValue={x.ratings}
                      readonly={true}
                      size={22}
                    />
                  </td>
                  <td>{moment(x.createdon).format('DD-MMM-yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
