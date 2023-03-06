import axios from "axios"
import { useEffect, useState } from "react"
import AdminNav from "./Adminnav"
import moment from "moment"
import { useHistory } from "react-router-dom"

export default function MixedData(){
    const [data,setData]=useState([])
    const [pmts,setPmts]=useState([])
    const history=useHistory()
    const showDetails=id=>{
      history.push('bdetails/'+id)
    }
    useEffect(()=>{
        axios.get('http://localhost:8080/api/bookings')
            .then(resp=>{
            setData(resp.data)
        })
        axios.get('http://localhost:8080/api/bookings/payments')
        .then(resp=>{
            setPmts(resp.data)
        })
    },[])
    return (
        <>
<div className="container-fluid">
            <div className="row">
                <div className="col-sm-2 bg-transparent p-0 border-right border-primary" style={{height:"calc(100vh - 80px)"}}>
                    <AdminNav />
                </div>
                <div className="col-sm-10">
                  <h5 className="p-2 mb-3" style={{borderBottom: '2px solid green'}}>Bookings</h5>
                  <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>Booking Id</th>
                      <th>Car Variant</th>
                      <th>Booking Date</th>                    
                      <th>User Name</th>
                      <th>Payment Data</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody> 
                    {data.map(bk=>(              
                    <tr key={bk.id}>
                      <td>{bk.id}</td>
                      <td>{bk.variant.title}</td>
                      <td>{moment(bk.bookingdate).format('d-MMM-yyyy hh:mm A')}</td>
                      <td>{bk.customer.uname}</td>                      
                      <td>
                          <table className="table table-bordered table-sm">
                              <thead>
                                  <tr>
                                      <th>Id</th>
                                      <th>Date</th>
                                      <th>Remarks</th>
                                      <th>Amount</th>
                                  </tr>
                              </thead>
                              <tbody>
                          {pmts.map(x=>{
                              return x.booking.id===bk.id ? <>
                                    <tr key={x.id}>
                                        <td>{x.id}</td>
                                        <td>{x.pmtdate}</td>
                                        <td>{x.remarks}</td>
                                        <td>₹ {x.amount}</td>
                                    </tr>
                              </> : ""
                          }
                          )}
                          </tbody>
                          </table>
                      </td>
                      <td><button onClick={e=>showDetails(bk.id)} className="btn btn-primary btn-sm">Details</button>
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