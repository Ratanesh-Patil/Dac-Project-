import { useSelector } from "react-redux";
import AdminNav from "./Adminnav";
import UserNavbar from "./UserNavbar";

const { Fragment } = require("react");

function NavBar(){
    const state=useSelector((state)=>state);
    console.log("LoggedIn ",state.loggedin)
    const isadmin=state.loggedin && state.loggedin.Role==="Admin" ?true:false;
    return (
        <Fragment>
          {isadmin ? (<>
              <AdminNav />
          </>) : (
            <header>
              <UserNavbar />
            </header>
        )}
        </Fragment>
    )
}

export default NavBar;
