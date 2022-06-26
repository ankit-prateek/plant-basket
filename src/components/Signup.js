import React, { useState } from 'react'
import image from "./Shop/img.svg";
import axios from '../axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Link, useHistory } from 'react-router-dom'
function Alert(props) {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
}
function Signup() {
    const history = useHistory();
    const [fullname, setname] = useState("prateek");
    const [email, setemail] = useState('jjnuyub@gdfjhb.fvhfvby');
    const [password, setpassword] = useState('vfjhvuh');
    const [confirm, setconfirm] = useState('vfjhvuh');
    const [warnopen, setwarn] = React.useState(false);
    const [message, setmessage] = useState("");
    const [type, settype] = useState("success")
    function onSubmit(e) {
        e.preventDefault();
        if (password == confirm) {
            const username = {
                fullname: fullname,
                email: email,
                password: password
            }

            axios.post('/users/add', username)
                .then(res => {
                    if (res.data == "user already exist") {
                        setwarn(true)
                        setmessage("User already exist")
                        settype("warning")
                    }
                    else{
                        setwarn(true)
                        setmessage("User added!")
                        settype("success")

                    }
                });
        }
        else {
            setwarn(true)
            setmessage("Password not matched!")
            settype("error")

        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setwarn(false)
    };
    if(warnopen==false && message=="User added!"){
        history.push('/login')
    }
    return (
        <div class="login-page">
            <form onSubmit={onSubmit} method="POST" class="login-form">
                <div class="login-part1"><img src={image} alt=""></img></div>
                <div class="login-part2">
                    <h1>SignUp</h1>


                    <div class="input">
                        <i class="fa fa-user"></i>
                        <input type="text" value={fullname} onChange={event => setname(event.target.value)} placeholder="Username" autocomplete="off" />
                    </div>
                    <div class="input">
                        <i class="fa fa-envelope"></i>
                        <input type="email" value={email} onChange={event => setemail(event.target.value)} placeholder="Email" autocomplete="off" />
                    </div>
                    <div class="input">
                        <i class="fa fa-key"></i>
                        <input type="password" value={password} onChange={event => setpassword(event.target.value)} placeholder="Password" />
                    </div>
                    <div class="input">
                        <i class="fa fa-key"></i>
                        <input type="password" value={confirm} onChange={event => setconfirm(event.target.value)} name="password2" placeholder="Confirm Password" />
                    </div>
                    <button type="submit">Login</button>
                </div>
            </form>
            <Snackbar open={warnopen} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Signup
