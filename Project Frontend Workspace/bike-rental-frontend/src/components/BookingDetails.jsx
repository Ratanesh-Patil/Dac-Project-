import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function BookingDetails() {
  const { bid } = useParams()
  const [data, setData] = useState(null)
  const [bikes, setBikes] = useState([])
  const [pmts, setPmts] = useState([])
  const [bike, setBike] = useState(null)
  const BASE_URL = process.env.REACT_APP_BACKEND_URL
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(bike)
    axios
      .put(BASE_URL + 'api/bookings/' + bid, { bno: bike })
      .then((resp) => {
        toast.success(resp.data)
        loadData()
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  useEffect(() => {
    console.log('Booking id', bid)
    loadData()
  }, [])
  const loadData = () => {
    axios.get(BASE_URL + 'api/bookings/' + bid).then((resp) => {
      setData(resp.data)
    })
  }
  useEffect(() => {
    axios
      .get(BASE_URL + 'api/bikes/variants/' + data?.variant?.id)
      .then((resp) => {
        setBikes(resp.data)
      })
    axios.get(BASE_URL + 'api/bookings/payments/' + data?.id).then((resp) => {
      setPmts(resp.data)
    })
  }, [data])

  return (
    <>
      <div className='content-wrapper p-2'>
        <div
          className='container-fluid shadow p-2 bg-white'
          style={{ minHeight: '88vh' }}
        >
          <h4 className='p-2 mb-3 border-bottom border-success'>
            Booking Details
          </h4>
          <div className='form-row'>
            <div className='col-sm-6'>
              <div className='card shadow'>
                <img
                  src={BASE_URL + data?.variant?.photo}
                  class='card-top-img'
                />
                <div className='card-body'>
                  <table className='table table-sm'>
                    <tbody>
                      <tr>
                        <th>Booking ID</th>
                        <th>{data?.id}</th>
                        <th>Customer Name</th>
                        <th>{data?.customer?.uname}</th>
                      </tr>
                      <tr>
                        <th>From Date</th>
                        <th>{data?.fromdate}</th>
                        <th>To Date</th>
                        <th>{data?.todate}</th>
                      </tr>
                      <tr>
                        <th>Car Variant</th>
                        <th>{data?.variant?.title}</th>
                        <th>Price per Day</th>
                        <th>{data?.variant?.price}</th>
                      </tr>
                      <tr>
                        <th>Booking Date</th>
                        <th>{data?.bookingdate}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className='col-sm-6'>
              <div className='card shadow'>
                <div className='card-body'>
                  <h5 className='text-center'>Booking Confirmation</h5>
                  {data?.status == 'Pending' ? (
                    <form>
                      <div className='form-row'>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label>Select Bike *</label>
                            <select
                              required
                              className='form-control form-control-sm'
                              name='bno'
                              value={bike}
                              onChange={(e) => setBike(e.target.value)}
                            >
                              <option value>-- Select Bike --</option>
                              {bikes.map((x, index) => (
                                <option key={index} value={x.id}>
                                  {x.id}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <input
                        type='submit'
                        onClick={handleSubmit}
                        defaultValue='Confirm Booking'
                        className='btn btn-outline-success btn-sm float-right'
                      />
                    </form>
                  ) : (
                    <>
                      <h6 className='text-success text-center p-2'>
                        Booking confirmed
                      </h6>
                      <div className='form-row'>
                        <div className='col-sm-8 p-3'>
                          <h5>Bike No : {data?.bike?.id}</h5>
                        </div>
                      </div>
                      <div
                        className='card shadow'
                        style={{ minHeight: '100%' }}
                      >
                        <div className='card-body p-2'>
                          <h5
                            className='text-center p-2'
                            style={{ borderBottom: '2px solid green' }}
                          >
                            Payment History
                          </h5>
                          {pmts.map((x) => (
                            <div className='card shadow p-2 mb-2'>
                              <p className='p-1 m-0'>Date : {x.pmtdate}</p>
                              <p className='m-0'>Amount : ₹ {x.amount}</p>
                              <p className='m-0 font-weight-bold'>
                                {x.remarks}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
