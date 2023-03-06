import { Link,useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

const AdminNav = ()=>{
    const dispatch=useDispatch()
    const history=useHistory()
    const state=useSelector((state)=>state);
    console.log("loggedin",state.loggedin)
    const logout=e=>{
        dispatch({type:'LogOut'})
        sessionStorage.clear();
        history.push("/");
    }
    return(
        <div className="sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
        <li className="nav-item">
            <Link className="nav-link text-dark" data-widget="pushmenu" to="#" role="button"><i className="fas fa-bars" /></Link>
        </li>
        </ul>
        <h5 className="text-center text-uppercase" style={{width: '100%'}}>Bike Rental System</h5>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
        {/* Messages Dropdown Menu */}
        {/* Notifications Dropdown Menu */}
        <li className="nav-item">
            <Link className="nav-link text-dark" data-widget="fullscreen" to="#" role="button">
            <i className="fas fa-expand-arrows-alt" />
            </Link>
        </li>
        <li className="nav-item dropdown">
            <Link className="nav-link text-dark" data-toggle="dropdown" to="#">
            <i className="far fa-bell fas-shake animated" />
            </Link>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">Accounts</span>
            <div className="dropdown-divider" />
            <Link to="#" className="dropdown-item" onClick={logout}>
                <i className="fas fa-users mr-2" />Logout
            </Link>
            <div className="dropdown-divider" />
            <Link to="#" data-target="#changepwd" data-toggle="modal" className="dropdown-item">
                <i className="fas fa-key mr-2" />Change Password
            </Link>
            </div>
        </li>
        </ul>
    </nav>
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <Link to="adminhome.php" className="brand-link">
    <img src="images/logo.png" alt="Admin Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">Administrator</span>
  </Link>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
    with font-awesome or any other icon font library */}
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              Dashboard
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/companies" className="nav-link">
            <i className="nav-icon fa fa-building" />
            <p>
              Companies
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/variants" className="nav-link">
            <i className="nav-icon  fa fa-motorcycle" />
            <p>
              Variants
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/bikes" className="nav-link">
            <i className="nav-icon fa fa-motorcycle" />
            <p>
              Bikes
            </p>
          </Link>
        </li>
         <li className="nav-item">
          <Link to="/customers" className="nav-link">
            <i className="nav-icon fa fa-users" />
            <p>
              Customers
            </p>
          </Link>
        </li>
         <li className="nav-item">
          <Link to="/bookings" className="nav-link">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              Bookings
            </p>
          </Link>
        </li>
         <li className="nav-item">
          <Link to="/feedbacks" className="nav-link">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              Feedback
            </p>
          </Link>
        </li>
         <li className="nav-item">
          <Link to="/reports" className="nav-link">
            <i className="nav-icon fa fa-file" />
            <p>
              Report
            </p>
          </Link>
        </li>
      </ul>
      </nav>
      </div>
      </aside>
        </div>
    )
}

export default AdminNav;