import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { toast } from 'react-toastify'

const Details = () => {
  const { varid } = useParams()
  const state = useSelector((state) => state)
  const BASE_URL = process.env.REACT_APP_BACKEND_URL
  console.log('LoggedIn ', state.loggedin.IsLoggedIn)
  const [data, setData] = useState({})
  const [amount, setAmount] = useState(0)
  const today = moment(new Date()).format('YYYY-MM-DD')
  const [booking, setBooking] = useState({
    varid: varid,
    fromdate: today,
    todate: today,
    userid: sessionStorage.getItem('userid'),
    message: '',
    advance: 0,
    billamount: 0,
    cardno: '',
    nameoncard: '',
    cvv: '',
    expiry: '',
  })
  const history = useHistory()

  const handleInput = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    booking.billamount = amount
    console.log('formdata', booking)
    if (booking.advance > amount) {
      toast.error('Advance cannot be greater than billing amount')
      return
    }
    if (
      booking.cardno === '' ||
      booking.nameoncard === '' ||
      booking.cvv === '' ||
      booking.expiry === ''
    ) {
      toast.error('Please provide payment details')
      return
    }
    axios
      .post(BASE_URL + 'api/bookings', booking)
      .then((resp) => {
        toast.success(resp.data)
        history.push('/mybookings')
      })
      .catch((error) => {
        toast.error(error)
      })
    console.log('form submitted')
  }
  useEffect(() => {
    console.log(booking)
    let bdays =
      moment(booking.todate).diff(moment(booking.fromdate), 'days') + 1
    setAmount(data.price * bdays)
    console.log('Days', bdays + 1)
  }, [booking])

  useEffect(() => {
    axios.get(BASE_URL + 'api/variants/' + varid).then((resp) => {
      console.log(resp.data)
      setData(resp.data)
      setAmount(resp.data.price)
    })
  }, [])
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-6'>
            <div className='card m-2'>
              <div className='card-header text-center'></div>
              <img
                style={{ height: 380 }}
                src={BASE_URL + data.photo}
                className='card-top-img'
              />
              <div className='card-footer'>
                <table className='table table-sm'>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>{data.title}</th>
                    </tr>
                    <tr>
                      <th>Price per day</th>
                      <th>₹ {data.price}/day</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
          <div className='col-sm-6'>
            {state.loggedin.IsLoggedIn ? (
              <>
                <form>
                  <div className='card shadow mb-2'>
                    <div className='card-body'>
                      <h5 style={{ borderBottom: '2px solid green' }}>
                        Bookinging Details
                      </h5>
                      <div className='form-row'>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label>From Date</label>
                            <input
                              type='date'
                              min={today}
                              value={booking.fromdate}
                              onChange={handleInput}
                              name='fromdate'
                              className='form-control'
                            />
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label>To Date</label>
                            <input
                              type='date'
                              min={today}
                              value={booking.todate}
                              onChange={handleInput}
                              name='todate'
                              className='form-control'
                            />
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label>Price</label>
                            <input
                              type='text'
                              readOnly
                              name='amount'
                              value={amount}
                              className='form-control'
                            />
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label>Message (Optional)</label>
                            <input
                              type='text'
                              required
                              name='message'
                              onChange={handleInput}
                              value={booking.message}
                              className='form-control'
                            />
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label>Booking Money</label>
                            <input
                              type='number'
                              id='advance'
                              min={1}
                              onChange={handleInput}
                              required
                              name='advance'
                              max={amount}
                              value={booking.advance}
                              placeholder='Advance Amount'
                              className='form-control'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card shadow mb-2'>
                    <div className='card-body'>
                      <h5 style={{ borderBottom: '2px solid green' }}>
                        Payment Details
                      </h5>
                      <div className='form-row'>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label>Card Number</label>
                            <input
                              type='text'
                              required
                              name='cardno'
                              onChange={handleInput}
                              value={booking.cardno}
                              pattern='[0-9]{16,16}'
                              maxLength={16}
                              className='form-control'
                            />
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label>Name on Card</label>
                            <input
                              type='text'
                              required
                              name='nameoncard'
                              onChange={handleInput}
                              value={booking.nameoncard}
                              className='form-control'
                            />
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label>CVV</label>
                            <input
                              type='text'
                              required
                              maxLength={3}
                              pattern='[0-9]{3,3}'
                              name='cvv'
                              onChange={handleInput}
                              className='form-control'
                            />
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label>Expiry Date</label>
                            <input
                              type='month'
                              name='expiry'
                              onChange={handleInput}
                              required
                              className='form-control'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    type='submit'
                    defaultValue='Booking Now'
                    onClick={handleSubmit}
                    className='btn btn-primary'
                  />
                </form>
              </>
            ) : (
              <>
                <h5 className='p-2 mt-4'>
                  Please <Link to='/login'>login</Link> or{' '}
                  <Link to='/register'>register</Link> to booking car
                </h5>
              </>
            )}
          </div>
          <div className='clearfix'> </div>
        </div>
      </div>
    </>
  )
}

export default Details
