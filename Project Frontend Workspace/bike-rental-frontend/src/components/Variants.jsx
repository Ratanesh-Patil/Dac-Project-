import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Variants = () => {
  const [data, setData] = useState([])
  const [company, setCompany] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [file, setFile] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [id, setId] = useState(null)
  const BASE_URL = process.env.REACT_APP_BACKEND_URL
  const [product, setProduct] = useState({
    title: '',
    company: '',
    price: '',
  })
  useEffect(() => {
    loadData()
    axios.get(BASE_URL + 'api/companies').then((resp) => {
      console.log(resp.data)
      setCompany(resp.data)
    })
  }, [])
  const loadData = () => {
    axios.get(BASE_URL + 'api/variants').then((resp) => {
      console.log(resp.data)
      setData(resp.data)
    })
  }
  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleFileInput = (e) => {
    setSelectedPhoto(e.target.files[0])
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  const handleDelete = (id) => {
    const result = window.confirm('Are you sure to delete this variant ?')
    if (result) {
      axios.delete(BASE_URL + 'api/variants/' + id).then((resp) => {
        toast.success(resp.data)
        loadData()
      })
    }
  }

  const handleEdit = (vdata) => {
    console.log(vdata)
    setIsEdit(true)
    setId(vdata.id)
    setProduct({
      title: vdata.title,
      company: vdata.company.id,
      price: vdata.price,
    })
    setSelectedPhoto(vdata.photo)
    setFile(BASE_URL + '' + vdata.photo)
  }

  const handleReset = (e) => {
    setProduct({
      title: '',
      company: '',
      price: '',
      photo: '',
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', product.title)
    formData.append('company', product.company)
    formData.append('price', product.price)
    console.log(product)
    if (isEdit) {
      axios
        .put(BASE_URL + 'api/variants/' + id, formData)
        .then((resp) => {
          toast.success(resp.data)
          setProduct({
            title: '',
            company: '',
            price: '',
            photo: '',
          })
          setSelectedPhoto(null)
          setFile(null)
          setIsEdit(false)
          loadData()
        })
        .catch((error) => {
          toast.error(error)
        })
    } else {
      formData.append('photo', selectedPhoto)
      axios
        .post(BASE_URL + 'api/variants', formData)
        .then((resp) => {
          toast.success(resp.data)
          setProduct({
            title: '',
            company: '',
            price: '',
            photo: '',
          })
          setSelectedPhoto(null)
          setFile(null)
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
          <h5 className='p-2 mb-3' style={{ borderBottom: '2px solid green' }}>
            Available Bike Variants
          </h5>
          <div className='row'>
            <div className='col-sm-8'>
              <table className='table table-bordered table-sm'>
                <thead>
                  <tr>
                    <th>Variant ID</th>
                    <th>Variant Name</th>
                    <th>Company</th>
                    <th>Rental</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((x, index) => (
                    <tr key={index}>
                      <td>{x.id}</td>
                      <td>
                        <img
                          src={BASE_URL + x.photo}
                          style={{ width: '100px' }}
                        />
                        {x.title}
                      </td>
                      <td>{x.company.compname}</td>
                      <td>{x.price} per day</td>
                      <td>
                        <button
                          onClick={(e) => handleEdit(x)}
                          className='btn btn-primary btn-sm mr-2'
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => handleDelete(x.id)}
                          className='btn btn-danger btn-sm'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='col-sm-4'>
              <h5 className='p-2'>Add/Update Variant</h5>
              <form method='post'>
                <div className='form-group'>
                  <label>Bike Name *</label>
                  <input
                    type='text'
                    name='title'
                    value={product.title}
                    onChange={handleInput}
                    required
                    className='form-control'
                  />
                </div>
                <div className='form-group'>
                  <label>Company *</label>
                  <select
                    name='company'
                    value={product.company}
                    onChange={handleInput}
                    required
                    className='form-control'
                  >
                    <option value>Select Company</option>
                    {company.map((x) => (
                      <>
                        <option value={x.id}>{x.compname}</option>
                      </>
                    ))}
                  </select>
                </div>
                <div className='form-group'>
                  <label>Price per day</label>
                  <input
                    type='text'
                    value={product.price}
                    onChange={handleInput}
                    name='price'
                    defaultValue
                    className='form-control'
                  />
                </div>
                {selectedPhoto ? (
                  <img
                    className='img-thumbnail float-right'
                    style={{ height: 100, width: 100 }}
                    src={file}
                    alt='Logo'
                  />
                ) : (
                  ''
                )}
                {isEdit ? (
                  ''
                ) : (
                  <>
                    <div className='form-group'>
                      <label>Photo</label>
                      <input
                        type='file'
                        id='photo'
                        name='photo'
                        value={product.photo}
                        onChange={handleFileInput}
                        accept='.jpg,.png'
                        className='form-control-file'
                      />
                    </div>
                  </>
                )}
                <div className='clearfix'></div>
                <button
                  onClick={handleSubmit}
                  className='btn btn-primary btn-sm ml-2 mt-3 float-right'
                >
                  Save Variant
                </button>
                <button
                  onClick={handleReset}
                  className='btn btn-danger btn-sm mt-3 float-right'
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Variants
