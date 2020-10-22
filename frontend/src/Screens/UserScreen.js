import React from 'react'
const UserScreen=(props)=>{

    const handleClick=(e)=>{
        e.preventDefault();
        localStorage.removeItem('loginState');
        window.location.reload();
        // props.history.push('/')

    }
    return (
    <div>
        <button onClick={(e)=>handleClick(e)}>Log Out</button>
    </div>

    )
}
export default UserScreen;