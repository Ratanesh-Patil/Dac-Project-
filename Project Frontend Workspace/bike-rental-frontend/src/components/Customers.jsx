import axios from 'axios'
import { useEffect, useState } from 'react'

const Customers = () => {
  const [data, setData] = useState([])
  const BASE_URL = process.env.REACT_APP_BACKEND_URL
  useEffect(() => {
    axios.get(BASE_URL + 'api/customers').then((resp) => {
      console.log(resp.data)
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
          <h4 className='p-2 mb-2 border-bottom border-success'>
            Customers List
          </h4>
          <table className='table table-bordered'>
            <thead className='table-light'>
              <tr>
                <th>Sr.No</th>
                <th>User Id</th>
                <th>Customer name</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Phone</th>
                <th>License</th>
              </tr>
            </thead>
            <tbody>
              {data.map((x, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{x.userid}</td>
                  <td>{x.uname}</td>
                  <td>{x.gender}</td>
                  <td>{x.address}</td>
                  <td>{x.phone}</td>
                  <td>{x.license}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Customers
