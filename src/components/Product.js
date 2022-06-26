import axios from '../axios';
import React from 'react'
import { Link } from 'react-router-dom';
import './Product.css';
import { useStateValue } from './StateProvider';
import Rating from '@material-ui/lab/Rating';
import Cookies from 'universal-cookie';

function Product({ id, img, name, price }) {

    const cookies = new Cookies();
    const [{ user }, dispatch] = useStateValue();
    var link = '/product/'
    const setbasket = () => {
        var bas = cookies.get('basket');
        if(!bas){
            bas=[];
        }
        bas.push(id)
        const count = {}
        bas.forEach(item => {
            if (count[item]) {
                count[item] += 1
                return
            }
            count[item] = 1
        })
        cookies.set('basket', bas, { path: '/' });
        dispatch({ type: "ADD", item: count })
    }

    function onsubmit(e) {
        e.preventDefault();
        setbasket();
        var bas = cookies.get('basket');
        const username = { id: user._id, basket: bas }
        axios.post('/users/addtobasket', username)
            .then(res => console.log(res))


    }
    return (
        <div className="product">
                <img src={img} className="mylogo" />
                <Link to={link + id}>
                <div class="middle">
                    <div class="text">View</div>
                </div>
                </Link>
            
            <h5>{name.slice(0,50)}</h5>
            <Rating name="half-rating-read" size="small" defaultValue={3.7} precision={0.1} readOnly />
            <h4>Rs. {price}</h4>



            <button onClick={user == null ? setbasket : onsubmit}>add to basket</button>
        </div>
    )
}

export default Product
