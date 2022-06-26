import React from 'react'
import { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../axios';
import './Checkoutpage.css'
import { useStateValue } from './StateProvider';
import Cookies from 'universal-cookie';

function Checkoutpage() {
    const history = useHistory();
    const cookies = new Cookies();
    const [{ user, totalprice, basket }, dispatch] = useStateValue();
    const [price,setprice]=useState(0)
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [mobile, setmobile] = useState("");
    const [city, setcity] = useState("");
    const [state, setstate] = useState("");
    const [address, setaddress] = useState("");
    const [zip, setzip] = useState("");
    const [len, setlen] = useState(cookies.get('basket').length)
    const [ad, setad] = useState(user?user.address:[])
    const [st, setst] = useState();

    function onSubmit(e) {
        setname(ad[e.target.value].name)
        setemail(ad[e.target.value].email)
        setmobile(ad[e.target.value].mobile)
        setcity(ad[e.target.value].city)
        setstate(ad[e.target.value].state)
        setaddress(ad[e.target.value].address)
        setzip(ad[e.target.value].zip)
        setst(e.target.value)
    }
    function mySubmitHandler(e) {
        e.preventDefault();
        const details = {
            name: name,
            email: email,
            mobile: mobile,
            address: address,
            zip: zip,
            city: city,
            state: state
        }
        const order = {
            user: details,
            basket: basket,
            userid: user._id,
            price:totalprice.price+totalprice.ship+totalprice.coupon
        }
        cookies.set('order',order)
        history.push('/payment')
    }
    return (
        <div>
            <div class="container my-4">
                <div class="row">
                    <form class="col-8" onSubmit={mySubmitHandler}>
                        <h1 class="text-center my-4">Checkout</h1>
                        <div class="form-row align">
                            <div class="form-group col-md-6">
                                <label for="inputName" className="item">Username</label>
                                <input type="name" class="form-control" value={name} onChange={e => setname(e.target.value)}></input>
                            </div>
                            <div class="form-group col-md-6 check">
                                <label for="inputEmail4" className="item">Email</label>
                                <input type="email" class="form-control" value={email} onChange={e => setemail(e.target.value)} />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputAddress" className="item">Address</label>
                            <input type="text" class="form-control" placeholder="1234 Main St" value={address} onChange={e => setaddress(e.target.value)} />
                        </div>
                        <div class="form-row">
                            <div className="align">
                                <div class="form-group col-md-6">
                                    <label for="inputCity" className="item">City</label>
                                    <input type="text" class="form-control" id="inputCity" name="city" value={city} onChange={e => setcity(e.target.value)} required />
                                </div>

                                <div class="form-group col-md-4 check">
                                    <label for="inputState" className="item">State</label>
                                    <select id="inputState" class="form-control" name="state">
                                        <option selected>Choose...</option>
                                        <option value="Uttar Pradesh">UP</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2 check">
                                    <label for="inputZip" className="item">Zip</label>
                                    <input type="text" class="form-control" value={zip} onChange={e => setzip(e.target.value)} />
                                </div>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="phone" className="item">Mobile No.</label>
                                <input type="tel" class="form-control" id="phone" pattern="[0-9]{10}" value={mobile} onChange={e => setmobile(e.target.value)} />
                            </div>
                        </div>



                        <hr class="my-4" />
                        <div class="col-12">
                            <h4 >Previous Address</h4>

                            {ad.map(({ name, email, mobile, address, zip, city, state }, i) => (

                                <div className="address">

                                    <input type="radio" value={i} name="choose" onChange={e => onSubmit(e)}></input>
                                    <div className="great">
                                        <h6>{name}</h6>
                                        <h6 >{address + " - " + zip}</h6>
                                        <h6>{state + " " + city}</h6>
                                        <h6>Phone number {mobile}</h6>
                                    </div>

                                </div>
                            ))}


                        </div>

                        <hr class="my-4" />

                        <button type="submit" class="btn col-12 btn-primary" >Continue to Payment</button>
                    </form>
                    <div class="col-4 h-60 bg-light order" >
                        <h3 class="text-center mt-3">Order Summary</h3>
                        <div class="my-3 mx-4 d-flex justify-content-between">
                            <h5>Total Items</h5>
                            <div class="px-2 rounded-pill bg-secondary">{len}</div>
                        </div>
                        <div class="my-3 mx-4 d-flex justify-content-between">
                            <h6>Total Cost</h6>
                            <span class="text-muted">&#8377; {totalprice.price}</span>
                        </div>
                        <div class="my-3 mx-4 d-flex justify-content-between">
                            <h6>Coupon discount</h6>
                            <span class="text-muted">&#8377; {-1*totalprice.coupon}</span>
                        </div>
                        <div class="my-3 mx-4 d-flex justify-content-between">
                            <h6>Shipping Charges</h6>
                            <span class="text-muted">&#8377;{totalprice.ship}</span>
                        </div>
                        <div class="my-3 mx-4 d-flex justify-content-between">
                            <h4>Payable Amount</h4>
                            <span class="text-muted"> &#8377;{totalprice.price+totalprice.ship+totalprice.coupon}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Checkoutpage
