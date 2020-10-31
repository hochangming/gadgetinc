import React from 'react';
import Cookie from 'js-cookie'
const UserScreen=(props)=>{

    const handleClick=(e)=>{
        e.preventDefault();
        localStorage.removeItem('loginState');
        // Cookie.remove('loginState');
        props.history.push('/')
        window.location.reload();

    }
    return (
    <div style={{ height: "500px" }} className="d-flex justify-content-center align-items-center">
        <button type="button" className="waves-effect log-out-button" onClick={(e)=>handleClick(e)}>Log Out</button>
    </div>

    )
}
export default UserScreen;