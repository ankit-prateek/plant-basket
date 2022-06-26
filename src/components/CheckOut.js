import React, { useState, useEffect } from 'react'
import { useStateValue } from './StateProvider';
import CheckOutProduct from './CheckOutProduct';
import './CheckOut.css';
import { useHistory, Link } from 'react-router-dom';
import axios from '../axios';
import Cookies from 'universal-cookie';
import cart from './Shop/cart.gif';


function CheckOut() {
    const cookies = new Cookies();
    const history = useHistory();
    const [{ totalprice,user }, dispatch] = useStateValue();
    const [filesList, setFilesList] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [total, settotal] = useState(0);
    const [promo, setpromo] = useState("");
    const [active, setactive] = useState(0);
    const [spinner, setSpinner] = useState(true);
    const [backup, setbackup] = useState(0);

    useEffect(() => {
        const getFilesList = async () => {
            setTimeout(() => setSpinner(false), 1200)
            try {
                var ans = [];
                var temp = 0;
                const username = cookies.get('user');
                var bas=[]
                if (username) {
                    const { data } = await axios.post('/users/login', username)
                    bas = data.basket;
                }
                else{
                    bas=cookies.get('basket')
                }
                    if (bas) {
                        
                        const count = {}
                        bas.forEach(item => {
                            if (count[item]) {
                                count[item] += 1
                                return
                            }
                            count[item] = 1
                        })
                        dispatch({ type: "ADD", item: {...count} })
                        const basket = count;
                        for (var key in basket) {
                            const { data } = await axios.get('/plants/' + key)
                            setErrorMsg('');
                            data['qty'] = basket[key]
                            ans.push(data)
                            temp = temp + (data['price'] * data['qty']);
                        }
                        
                        setFilesList([...ans]);
                        settotal(temp)
                        var total = totalprice;
                        total.price = temp
                        dispatch({ type: "SET_PRICE", totalprice: total })
                        setbackup(temp)
                        
                    }
                
            } catch (error) {
                error.response && setErrorMsg(error.response.data);
            }
        };

        getFilesList();
    }, []);
    const handleInputChange = (event) => {
        var total = totalprice;
        total.ship = parseInt(event.target.value)
        dispatch({ type: "SET_PRICE", totalprice: total })
    };


    function handler() {
        var coupon = { 'ankit': 50, "plant": 100 }
        if (coupon[promo]) {
            setactive(1)
            var total = totalprice;
            total.coupon = -coupon[promo]
            dispatch({ type: "SET_PRICE", totalprice: total })
        }
        else {
            setactive(0)
        }

    }
    
    if (spinner) {
        return (
            <div>
                <img src={cart}></img>
            </div>
        )
    }
    else {
        if (cookies.get('basket').length != 0 || filesList.length != 0) {
            return (
                <div className="check__page">
                    <div className="check__left">
                        <h2>Shopping Cart</h2>
                        <hr className="check__line" />
                        <div>
                            {console.log(filesList)}
                            {filesList.map(({ _id, name, description, file_path, price, qty, category }) =>(
                                <div>
                                    {console.log(name)}
                                <CheckOutProduct id={_id} qty={qty} category={category} name={name} description={description} file_path={file_path} price={price} />
                                </div>))}
                        </div>

                    </div>
                    <div className="check__right">
                        <h3>Order Summary</h3>
                        <hr className="lines" />
                        <div className="mycon">
                            <p>ITEMS {cookies.get('basket').length}</p>
                            <p>&#8377; {totalprice.price}</p>
                        </div>
                        <h4 className="manage">Shipping</h4>
                        <select className="drop" name='category' onChange={handleInputChange}>
                            <option value={40}> Standard delivery  &#8377; 40   </option>
                            <option value={60}>Fast delivery  &#8377; 60   </option>
                        </select>
                        <h4 className="manage">Promo code</h4>
                        <input value={promo} onChange={e => setpromo(e.target.value)} placeholder="Enter your code" className="drop"></input>
                        {active == 1 ? (<h7 className="coupon">Coupon applied succeessfully</h7>) : (<h4></h4>)}

                        <button className="apply" onClick={handler}>Apply</button>
                        < hr className="lines" />
                        <div className="mycon">
                            <h5>Total cost </h5>
                            <h5> &#8377;{totalprice.price + totalprice.ship + totalprice.coupon}</h5>
                        </div>
                        <button className="mycheckout" onClick={e=>(user ? history.push('/checkoutpage') : history.push('/login'))}>CHECKOUT</button>



                    </div>


                </div>)
        }
        else {

            return (
                <h3>empty</h3>


            )
        }
    }
}

export default CheckOut
