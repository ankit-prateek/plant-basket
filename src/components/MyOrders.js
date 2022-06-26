import React, { useState, useEffect } from 'react'
import grow from './Shop/grow.gif';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from './AvatarGroup'
import { useStateValue } from './StateProvider';
import axios from '../axios';
import './MyOrders.css'
import { useHistory } from 'react-router-dom'

function MyOrders(props) {
    const {data}=props;
    const [rows,setrows]=useState(Object.values(data));
    const history = useHistory();
    

   
    const API_URL = 'https://backend-plant.herokuapp.com/';
    //const URL = "http://localhost:5000/";
    return (

        <div className="parentorder">
            
            {rows.map((row) => (
                <div className="xcard">
                    <div className="image">
                        <AvatarGroup
                        key={row._id}
                            max={3}
                            extraavatarstooltiptitle="products"
                            spacing={70}
                        >
                            
                            {Object.values(row.products).map((data) => (
                                <Avatar src={API_URL + data.file_path} style={{ borderRadius: 10, width: 120, height: 150 }} />

                            ))}
                        </AvatarGroup>
                    </div>
                    
                    <div className="xgroup">
                        <h6> Total Price : {row.amount}</h6>
                        <h6>Qty : {row.qty}</h6>
                    </div>
                    <div className="xgroup">
                   
                    <h6>{['Placed','Packed','Shipped','Delivered'][row.status]} On {row.updatedAt.slice(0,10)}</h6>
                    <h6>Payment :{row.payment_mode}</h6>
                    </div>
                    <div className="xbuttongroup">
                        <button name={row._id} onClick={e=>history.push('/orders/' + e.target.name)}> View Order Details</button>
                        <button>Get Invoice</button>
                        <button>Return Order</button>
                    </div>

                </div>
            ))}


        </div>


    )

}

export default MyOrders
