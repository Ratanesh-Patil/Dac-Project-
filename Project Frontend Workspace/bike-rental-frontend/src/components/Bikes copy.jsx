import AdminNav from "./Adminnav"
import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

const Bikes=()=>{
    const [variants,setVariants]=useState([])
    const [data,setData]=useState([])
    const [bike,setBike]=useState({
        "id":"",
        "modelyear":"",
        "varid":""
    })
    const history=useHistory()
    useEffect(()=>{
        axios.get('http://localhost:8080/api/variants')
        .then(resp=>{
            setVariants(resp.data)
        })     
        loadData()   
    },[])

    const handleInput=e=>{
        setBike({...bike,[e.target.name]:e.target.value})
    }

    const handleSubmit=e=>{
        e.preventDefault()
        axios.post('http://localhost:8080/api/bikes',bike)
        .then(resp=>{
            toast.success(resp)
            setBike({
              "id":"",
              "modelyear":"",
              "varid":""
            })
            loadData()
        })
        .catch(error=>{
            toast.error(error)
        })
    }

    const handleFilter=id=>{
      if(id==0){
        loadData()
      }else{
        axios.get('http://localhost:8080/api/bikes/filter/'+id)
        .then(resp=>{
          setData(resp.data)
        })
      }

    }

    const handleDelete=(id)=>{
        const resp=window.confirm('Are you sure you want to delete this bike ?')
        if(resp){
          axios.delete('http://localhost:8080/api/bikes/'+id)
          .then(resp=>{
            toast.success(resp.data)
            loadData()
          })
          .catch(error=>{
            toast.error('Bike already used in bookings')
          })
        }
    }

    const loadData=()=>{
        axios.get('http://localhost:8080/api/bikes')
        .then(resp=>{
            setData(resp.data)
        })
    }
    return(
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2 bg-transparent p-0 border-right border-primary" style={{height:"calc(100vh - 80px)"}}>
                    <AdminNav />
                </div>
                <div className="col-sm-10">                    
                    <div className="row">
  <div className="col-sm-8">
    <div className="form-inline float-right mt-1 mr-2">
      <label className="mr-2">Filter</label>
      <select onChange={e=>handleFilter(e.target.value)} className="form-control form-control-sm" style={{width: 200}}>
        <option value="0">All Bikes</option>
        <option value="1">Available</option>
        <option value="2">Not Available</option>
      </select>
    </div>
    <h5 className="p-2 mb-3" style={{borderBottom: '2px solid green'}}>Bikes</h5>
    <table className="table table-bordered table-sm">
      <thead>
        <tr>
          <th>Bike No</th>
          <th>Model Year</th>
          <th>Variant</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
          {data.map((x,index)=>(
        <tr key={index}>
          <td>{x.id}</td>
          <td>{x.modelyear}</td>
          <td>{x.variant.title}</td>
          <td>{x.status}</td>
          <td>
              <button className="btn btn-danger btn-sm" onClick={e=>handleDelete(x.id)}>Delete</button>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="col-sm-4">
    <div className="Biked">
      <div className="Biked-body">
        <h5>Bike Details</h5>
        <form>
          <div className="form-group">
            <label>Select Variant</label>
            <select required className="form-control" name="varid" value={bike?.varid} onChange={handleInput} >
              <option value>-- Select Variant --</option> 
              {variants.map(x=>(                         
              <option key={x.id} value={x.id}>{x.title}</option>              
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Bike No</label>
            <input type="text" required className="form-control" value={bike?.id} onChange={handleInput} name="id" />
          </div>
          <div className="form-group">
            <label>Model Year</label>
            <input type="text" required className="form-control" value={bike?.modelyear} onChange={handleInput} name="modelyear" />
          </div>
          <Link to="/bikes" className="btn btn-danger btn-sm float-right ml-2">Cancel</Link>
          <input type="submit" onClick={handleSubmit} className="btn btn-primary btn-sm float-right" defaultValue="Save Bike" />
        </form>                
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

export default Bikes;