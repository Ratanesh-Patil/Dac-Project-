import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Products = () => {
  var classNames = require('classnames')
  const { cid } = useParams()
  const BASE_URL = process.env.REACT_APP_BACKEND_URL
  console.log('company id', cid)
  const [data, setData] = useState([])
  const [company, setCompany] = useState([])
  useEffect(() => {
    loadData()
  }, [cid])
  const loadData = () => {
    if (cid == null) {
      axios.get(BASE_URL + 'api/variants').then((resp) => {
        console.log(resp.data)
        setData(resp.data)
      })
    } else {
      axios.get(BASE_URL + 'api/variants/company/' + cid).then((resp) => {
        console.log(resp.data)
        setData(resp.data)
      })
    }
    axios.get(BASE_URL + 'api/companies').then((resp) => {
      console.log(resp.data)
      setCompany(resp.data)
    })
  }
  return (
    <>
      <div
        className='container-fluid products'
        style={{ marginTop: 0, minHeight: '80vh' }}
      >
        <div className='row'>
          <div className='col-sm-2 p-0'>
            <h5 className='p-2 text-center'>Companies</h5>
            <div className='list-group'>
              <Link
                to='/products'
                className={classNames(
                  'list-group-item list-group-item-action',
                  { active: cid == null }
                )}
              >
                All Companies
              </Link>
              {company.map((x) => (
                <Link
                  key={x.id}
                  to={'/products/' + x.id}
                  className={classNames(
                    'list-group-item list-group-item-action',
                    { active: cid == x.id }
                  )}
                >
                  {x.compname}
                </Link>
              ))}
            </div>
          </div>
          <div className='col-sm-10 p-0'>
            <div className='card shadow'>
              <div className='card-body p-1'>
                <div className='container-fluid py-2'>
                  <div className='row m-2'>
                    {data.length > 0 ? (
                      data.map((x) => (
                        <div key={x.id} className='col-md-4'>
                          <div className='card shadow mt-2'>
                            <Link to={'/details/' + x.id}>
                              <img
                                style={{ height: 200 }}
                                src={BASE_URL + x.photo}
                                className='card-top-img img-thumbnail mx-auto d-block p-2'
                              />
                            </Link>
                            <div className='card-footer bg-dark text-white font-weight-bold p-2'>
                              <div className='form-row'>
                                <div className='col-sm-7'>
                                  {x.company.compname} {x.title}
                                </div>
                                <div className='col-sm-5 text-right'>
                                  ₹ {x.price}/day
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className='col-md-4'>
                          <div className='card shadow mt-2'>
                            <h5 className='p-2 text-danger'>
                              No Bike available for this company.
                            </h5>
                          </div>
                        </div>
                      </>
                    )}
                    <div className='clearfix'> </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
