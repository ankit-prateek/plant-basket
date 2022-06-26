import React, { useState, useEffect } from 'react'
import './CheckOutProduct.css';
import axios from '../axios';
import { useStateValue } from './StateProvider';
import Cookies from 'universal-cookie';
function rep(bas) {
    const count = {}
    bas.forEach(item => {
        if (count[item]) {
            count[item] += 1
            return
        }
        count[item] = 1
    })
    return count
}
function CheckOutProduct({ id, name, file_path, price, qty,category }) {
    console.log(file_path)
    const cookies = new Cookies();
    const [{ user, basket, totalprice }, dispatch] = useStateValue();
    const setbasket = () => {
        var bas = cookies.get('basket');
        bas.push(id)
        const count = rep(bas);
        cookies.set('basket', bas, { path: '/' });

        dispatch({ type: "ADD", item: count })
        const total =totalprice;
        total.price=total.price+price
        dispatch({ type: "SET_PRICE", totalprice: total })


    }
    function onsubmit(e) {
        e.preventDefault();
        setbasket();
        var bas = cookies.get('basket');
        const username = { id: user._id, basket: bas }
        axios.post('/users/addtobasket', username)


    }
    const removebasket = () => {
        var bas = cookies.get('basket');
        for (var i = 0; i < bas.length; i++) {
            if (bas[i] === id) {
                console.log(bas[i], id)
                bas.splice(i, 1);
                break;
            }
        }
        cookies.set('basket', bas, { path: '/' });
        var bas = cookies.get('basket');
        const count = {}
        bas.forEach(item => {
            if (count[item]) {
                count[item] += 1
                return
            }
            count[item] = 1
        })

        dispatch({ type: "ADD", item: count })
        const total =totalprice;
        total.price=total.price-price
        dispatch({ type: "SET_PRICE", totalprice: total })
    }
    function mydelete(e) {
        e.preventDefault();
        removebasket();
        var bas = cookies.get('basket');
        const username = { id: user._id, basket: bas }
        axios.post('/users/addtobasket', username)

    }
    const API_URL = 'https://backend-plant.herokuapp.com/';
    //const API_URL="http://localhost:5000/";
    if (basket[id] > 0) {
        return (
            <div className='checkout'>
                <img src={API_URL + file_path}></img>
                <div className='checkout__info' >
                    <p>{name}</p>
                    <p>{category}</p>
                    <p>delete</p>
                </div>
                <div className="incr">
                    <button onClick={user == null ? removebasket : mydelete}>-</button>
                    <h3>{basket[id]}</h3>
                    <button onClick={user == null ? setbasket : onsubmit}>+</button>
                </div>
                <div className="myrow">
                    <p> &#8377; {price}</p>
                </div>
                <div className="myrow" >
                    <p > &#8377; {basket[id]*price}</p>
                </div>
            </div>
        )
    }
    return (<div></div>)

}

export default CheckOutProduct
