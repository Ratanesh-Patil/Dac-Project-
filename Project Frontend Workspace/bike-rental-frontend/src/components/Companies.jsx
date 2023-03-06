import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Companies = () => {
  const [data, setData] = useState([])
  const BASE_URL = process.env.REACT_APP_BACKEND_URL
  const [company, setCompany] = useState('')
  useEffect(() => {
    loadData()
  }, [])
  const loadData = () => {
    axios.get(BASE_URL + 'api/companies').then((resp) => {
      console.log(resp.data)
      setData(resp.data)
    })
  }
  const handleDelete = (id) => {
    const result = window.confirm('Are you sure to delete this company ?')
    if (result) {
      axios.delete(BASE_URL + 'api/companies/' + id).then((resp) => {
        toast.success(resp.data)
        loadData()
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (company === '') {
      toast.error('Please provide company name')
    } else {
      axios
        .post(BASE_URL + 'api/companies', { compname: company })
        .then((resp) => {
          setCompany('')
          toast.success(resp.data)
          loadData()
        })
        .catch((error) => {
          toast.error(error)
        })
    }
  }

  return (
    <>
      <div className='content-wrapper p-2'>
        <div
          className='container-fluid shadow p-2 bg-white'
          style={{ minHeight: '88vh' }}
        >
          <h4 className='p-2 mb-3 border-bottom border-success'>Companies</h4>
          <div className='row'>
            <div className='col-sm-8'>
              <table className='table table-bordered table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((x, index) => (
                    <tr key={index}>
                      <td>{x.id}</td>
                      <td>{x.compname}</td>
                      <td>
                        <a
                          onClick={(e) => handleDelete(x.id)}
                          href='#'
                          className='btn btn-outline-danger btn-sm'
                        >
                          <i className='fa fa-trash' />
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='col-sm-4'>
              <form
                method='post'
                encType='multipart/form-data'
                action='savecat.php'
              >
                <div className='form-group'>
                  <label>Company Name</label>
                  <input
                    type='text'
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className='form-control'
                    name='compname'
                  />
                </div>
                <input
                  type='submit'
                  onClick={handleSubmit}
                  className='btn btn-primary btn-sm'
                  defaultValue='Save Company'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Companies
