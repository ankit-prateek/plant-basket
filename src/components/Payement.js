import React from 'react'
import { useHistory } from 'react-router-dom'
import Stepper from '@material-ui/core/Stepper';
import Cookies from 'universal-cookie';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import paytm from './Shop/paytm.png'
import paytmg from './Shop/paytmg.gif'
import card from './Shop/card.png'
import cod from './Shop/cod.gif'
import paymentcard from './Shop/paymentcard.gif'
import upiLogo6 from './Shop/upiLogo6.gif'
import success from './Shop/success.gif'
import loading from './Shop/loading.gif'
import clsx from 'clsx';
import './Payment.css'
import axios from '../axios';
function getSteps() {
    return ['Cart', 'Address', 'Payment', 'confirmed'];
}
const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundColor: "blue",
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundColor: "blue",
    },
});
function Upi() {
    const history = useHistory();
    const cookies = new Cookies();
    function handler(e) {
        const sidebar = document.querySelector(".sucessmessage");
        sidebar.classList.add("open")
    }
    function orderhandler(e) {
        console.log("done")
        var temp = cookies.get('order')
        temp.payment_mode = 'upi'
        console.log(temp)
        axios.post('./order/place', temp)
            .then(e => history.push('/orders/' + e.data._id))
    }
    return (
        <div className="upi">
            <div>
                <FormControl style={{ width: 200, marginLeft: 25, marginBottom: 50 }} >
                    <InputLabel htmlFor="component-simple" style={{ zIndex: 10 }}> Upi address</InputLabel>
                    <Input id="component-simple" type="upi" style={{ fontSize: 20, backgroundColor: "white", width: 170, color: "black" }} />
                </FormControl>
            </div>
            <button className="upiaction" onClick={handler}>Verify</button>
            <div className="sucessmessage" style={{ height: 300, marginTop: -100 }}>
                <h5 style={{ marginTop: 20 }}>Complete your payment</h5>
                <img src={loading} style={{ width: "100%", borderRadius: 4 }}></img>
                <span onClick={orderhandler}>complete the paymment by selecting the bank and entering UPI pin</span>
                <span style={{ color: "green", fontSize: 15 }}>Requested amount : 1999</span>
                <span style={{ fontSize: 12, marginTop: 15 }}>*this page will automatically expire in 10 mins</span>

            </div>

        </div>
    )
}

function Paytm() {
    const history = useHistory();
    const cookies = new Cookies();
    const [message, setmessage] = React.useState("")
    const [mobile, setmobile] = React.useState("");
    const [col, setcol] = React.useState("");
    function handler(e) {
        if (mobile.length == 10) {
            setmessage("Otp sent successfully")
            setcol("green")
        }
        else {
            setmessage("Wrong Mobile No")
            setcol("red")
        }
        const sidebar = document.querySelector(".sucessmessage");
        sidebar.classList.add("open")

        setTimeout(() => setmessage(""), 10000)
    }
    function orderhandler(e) {
        var temp = cookies.get('order')
        temp.payment_mode = 'paytm'
        console.log(temp)
        axios.post('./order/place', temp)
            .then(e => history.push('/orders/' + e.data._id))
    }
    return (

        <div className="xyinfo">
            <img src={paytm} className="paytm" />
            <div className="mobile">
                <FormControl style={{ width: 200, marginLeft: 25, marginBottom: 50 }} >
                    <InputLabel htmlFor="component-simple">Mobile No</InputLabel>
                    <Input id="component-simple" value={mobile} onChange={e => setmobile(e.target.value)} />
                </FormControl>
                <button className="action" onClick={handler}>Get Otp</button>
            </div>
            <span style={{ color: col, marginLeft: 50, fontSize: 15, marginTop: -40 }}>{message}</span>

            <div className="otp">
                <FormControl style={{ width: 200, marginLeft: 25, marginBottom: 50 }}>
                    <InputLabel htmlFor="component-simple">Enter Otp</InputLabel>
                    <Input id="component-simple" />
                </FormControl>
                <a href="#">resend otp</a>
            </div>
            <button className="submit">Submit</button>
            <div className="sucessmessage">
                <img src={success} style={{ width: 100, borderRadius: 50, marginTop: -50, marginLeft: "30%" }}></img>
                <h4> Payment Successful</h4>
                <span>Details has been sent to your email id</span>
                <span style={{ color: "green", fontSize: 15 }}>Deducted amount : 1999</span>
                <button className="submit" style={{ marginLeft: 80 }} onClick={orderhandler}>Done</button>
            </div>
        </div>
    )
}
function strip(string) {
    return string.replace(/^\s+|\s+$/g, '');
}

function PaymentCard() {
    const history = useHistory();
    const cookies = new Cookies();
    const [cardno, setcard] = React.useState();
    const [cardexp, setexp] = React.useState();
    const [cvv, setcvv] = React.useState();
    const [name, setname] = React.useState();
    function handler(e) {
        const sidebar = document.querySelector(".sucessmessage");
        sidebar.classList.add("open")
    }
    function orderhandler(e) {
        console.log("done")
        var temp = cookies.get('order')
        temp.payment_mode = 'card'
        console.log(temp)
        axios.post('./order/place', temp)
            .then(e => history.push('/orders/' + e.data._id))
    }
    
    function cvvchange(e) {
        setcvv(e.target.value.slice(0, 3))

    }

    function cardchange(e) {
        if (e.target.value.length == 4 || e.target.value.length == 10 || e.target.value.length == 16) {
            setcard(e.target.value + "  ")
        }
        else {
            if ((e.target.value.length > 4 && e.target.value.length <= 6) || (e.target.value.length > 10 && e.target.value.length <= 12) || (e.target.value.length > 16 && e.target.value.length <= 18)) {
                setcard(strip(e.target.value))

            }
            else {
                if (e.target.value.length != 23) {
                    setcard(e.target.value)
                }
            }
        }
    }
    function expchange(e) {
        if (e.target.value.length == 2) {
            setexp(e.target.value + '/')
        }
        else {
            if (e.target.value.length == 3) {
                setexp(e.target.value.slice(0, -1))
            }
            else {
                if (e.target.value.length <= 5) {
                    setexp(e.target.value)


                }

            }
        }

    }
    return (
        <div className="xinfo">
            <div style={{ display: 'flex', flexDirection: 'column' }} >
                <img src={card} className="paytm" />
                <FormControl style={{ width: 150, marginLeft: 165, marginTop: 80 }} >
                    <InputLabel htmlFor="component-simple">Cardholder Name</InputLabel>
                    <Input value={name} onChange={e => setname(e.target.value)} id="component-simple" />
                </FormControl>
                <FormControl style={{ width: 230, marginLeft: 170, marginTop: 44 }}>
                    <InputLabel htmlFor="component-simple">Card Number</InputLabel>
                    <Input value={cardno} onChange={cardchange} id="component-simple" />
                </FormControl>
                <FormControl style={{ width: 90, marginLeft: 285, marginTop: 5 }}>
                    <Input value={cardexp} onChange={expchange} id="component-simple" placeholder="exp date" />
                </FormControl>
                <button className="submit" onClick={handler}>Submit</button>
            </div>
            <FormControl style={{ width: 70, marginLeft: 0, marginTop: 220, left: -100 }}>
                <InputLabel htmlFor="component-simple">cvv</InputLabel>
                <Input value={cvv} type="password" onChange={cvvchange} id="component-simple" />
            </FormControl>
            <div className="sucessmessage" style={{ height: 350, marginTop: -100 }}>
                <h5 style={{ marginTop: 20 }}>Complete your payment</h5>
                <img src={loading} style={{ width: "100%", borderRadius: 4 }}></img>
                <span >Enter the otp</span>
                <input style={{marginLeft:40,marginRight:40}}/>
                <button className="submit" style={{marginLeft:80}} onClick={orderhandler}>confirm</button>
                <span style={{ fontSize: 12, marginTop: 15 }}>otp has been sent to your registered mobile no</span>

            </div>





        </div>
    )
}

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <CheckCircleOutlineIcon style={{ fontSize: 42 }} />,
        2: <CheckCircleOutlineIcon style={{ fontSize: 42 }} />,
        3: <RadioButtonUncheckedIcon style={{ fontSize: 42 }} />,


    };
    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}
function Payement() {
    const history = useHistory();
    const cookies = new Cookies();
    const [activeStep, setActiveStep] = React.useState(2);
    const [tab, settab] = React.useState("none");
    const steps = getSteps();


    function handler(e) {
        settab(e.target.id)

    }
    function orderhandler(e) {
        var temp = cookies.get('order')
        temp.payment_mode = 'cash'
        axios.post('./order/place', temp)
            .then(e => history.push('/orders/' + e.data._id))
    }
    return (
        <div>
            <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label} style={{ width: 100 }} >
                        <StepLabel StepIconComponent={ColorlibStepIcon} >{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <h4>payment page</h4>
            <hr />
            <div className="parent">
                <div className="payment">
                    <div className={tab == 'cash' ? "mode blueborder" : "mode"} id="cash" onClick={handler}>
                         <label className="label">Cash On delivery</label>
                        <img src={cod} className="logo"></img>
                    </div>
                    <div className={tab == 'paytm' ? "mode blueborder" : "mode"} id="paytm" onClick={handler}>
                        <label className="label">Paytm</label>
                        <img src={paytmg} className="logo"></img>

                    </div>
                    <div className={tab == 'card' ? "mode blueborder" : "mode"} id="card" onClick={handler}>
                        <label className="label">Credit/Debit Card</label>
                        <img src={paymentcard} className="logo"></img>
                    </div>
                    <div className={tab == 'upi' ? "mode blueborder" : "mode"} id="upi" onClick={handler}>
                        <label className="label">Upi</label>
                        <img src={upiLogo6} className="logo"></img>
                    </div>
                </div>
                {tab == 'paytm' ? <Paytm /> : (tab == 'card' ? <PaymentCard /> : (tab == 'upi' ? <Upi /> : (tab == 'cash' ? <div className="cod">
                    <button className="submit" onClick={orderhandler}>proceed</button></div> : <div className="demode"><h3>Select Payment mode</h3></div>
                )))}


            </div>
        </div>
    )
}

export default Payement
