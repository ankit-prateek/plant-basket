import React from 'react'
import './OrderProduct.css'

function OrderProduct({ id, name, file_path, price, qty, category }) {
    const API_URL = 'https://backend-plant.herokuapp.com/';
    //const API_URL="http://localhost:5000/";

    return (
        <div className='order_checkout'>
            <img src={API_URL + file_path}></img>
            <div className='order_checkout__info' >
                <p>{name}</p>
                <p>{category}</p>
            </div>
            <div className="order_incr">
            <p> {qty} pcs</p>
            </div>
            <div className="order_myrow">
                <p> &#8377; {price}</p>
            </div>
            <div className="order_myrow" >
                <p > &#8377; {qty * price}</p>
            </div>
        </div>
    )
}

export default OrderProduct
