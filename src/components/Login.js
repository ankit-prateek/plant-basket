import React, { useEffect, useState } from 'react'
import image from "./Shop/img.svg";
import axios from '../axios';
import './Login.css';
import Cookies from 'universal-cookie';
import { useStateValue } from './StateProvider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Link, useHistory } from 'react-router-dom'
function Alert(props) {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
}

function Login() {
    const history = useHistory();
    const [email, setemail] = useState('raj@gmail.com');
    const [password, setpassword] = useState('ankit');
    const [{ user }, dispatch] = useStateValue();
    const [spinner, setSpinner] = useState(false);
    const cookies = new Cookies();
    const [warnopen, setwarn] = React.useState(false);
    
    if(user){
        history.push('/')
    }

    function setter(res) {
        if (res.data) {
            const username = { email: email, password: password }
            dispatch({ type: "SET_USER", user: res.data, });
            cookies.set('basket', res.data.basket, { path: '/' });
            var bas = res.data.basket;
            const count = {}
            bas.forEach(item => {
                if (count[item]) {
                    count[item] += 1
                    return
                }
                count[item] = 1
            })
            dispatch({ type: "ADD", item: count })
            cookies.set('user', username, { path: '/' });
            history.push('/')
        }
        else{
            setwarn(true)
        }


    }


    function onsubmit(e) {
        e.preventDefault();
        const username = { email: email, password: password }
        axios.post('/users/login', username)
            .then(res => setter(res));

    }
    const handleClose = (event, reason) => {
        console.log(reason)
        if (reason === 'clickaway') {
            return;
        }
        setwarn(false)
    };
   
    return (
        <div>
            
            <div class="login-page">
                <form onSubmit={onsubmit} class="login-form">

                    <div class="login-part1"><img src={image} alt=""></img></div>
                    <div class="login-part2">
                        <h1>Login</h1>
                        <div class="input">
                            <i class="fa fa-envelope"></i>
                            <input value={email} onChange={event => setemail(event.target.value)} type="email" placeholder="Email" ></input>
                        </div>
                        <div class="input">
                            <i className="fa fa-key"></i>
                            <input type="password" value={password} onChange={event => setpassword(event.target.value)} placeholder="Password"></input>
                        </div>
                        <button type="submit">Login</button>
                        <a href="">Forgot Password</a>
                    </div>
                </form>
            </div>
            <Snackbar open={warnopen} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                    Email or password incorrect!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Login
