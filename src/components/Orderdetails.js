import React, { useState, useEffect } from 'react'
import grow from './Shop/grow.gif';
import axios from '../axios';
import OrderProduct from './OrderProduct';
import Header from './Header';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import RedeemOutlinedIcon from '@material-ui/icons/RedeemOutlined';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import LocalFloristOutlinedIcon from '@material-ui/icons/LocalFloristOutlined';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import './Orderdetails.css'
import Popup from 'reactjs-popup';
import { Column } from 'react-virtualized';





const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();

    const { active, completed } = props;

    const icons = {
        1: <ShoppingBasketOutlinedIcon />,
        2: <RedeemOutlinedIcon />,
        3: <LocalShippingOutlinedIcon />,
        4: <LocalFloristOutlinedIcon />,
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

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Ordered', 'Packed', 'Shipped', 'Delivered'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Select campaign settings...';
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown step';
    }
}

function Orderdetails(props) {
    const id = props.match.params.id;
    const [filesList, setFilesList] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [spinner, setSpinner] = useState(true);
    const [mark, setmark] = useState(true);
    const [mydata, setdata] = useState();
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(2);
    const [rat,setrat]=useState([]);
    const [feed,setfeed]=useState("");
    const steps = getSteps();
    const customIcons = {
        1: {
            icon: <SentimentVeryDissatisfiedIcon />,
            label: 'Very Dissatisfied',
        },
        2: {
            icon: <SentimentDissatisfiedIcon />,
            label: 'Dissatisfied',
        },
        3: {
            icon: <SentimentSatisfiedIcon />,
            label: 'Neutral',
        },
        4: {
            icon: <SentimentSatisfiedAltIcon />,
            label: 'Satisfied',
        },
        5: {
            icon: <SentimentVerySatisfiedIcon />,
            label: 'Very Satisfied',
        },
    };
    function IconContainer(props) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value].icon}</span>;
    }




    useEffect(() => {
        setTimeout(() => setSpinner(false), 7000)
        setTimeout(() => setmark(false), 3000)
        const getFilesList = async () => {
            try {
                const { data } = await axios.get('/order/' + id)
                setdata(data)
                var details = data.products;
                setActiveStep(data.status)
                var ans = [],t=[];
                for (var key in details) {
                    const { data } = await axios.get('/plants/' + key)
                    data['qty'] = details[key]
                    t.push(2)
                    ans.push(data)
                }
                setrat(t)
                setFilesList(ans)
            } catch (error) {
                error.response && setErrorMsg(error.response.data);
            }
        };

        getFilesList();
    }, []);
    function ratinghandler(event,newvalue){
        var t=rat,i=event.target.name-1;
        t[i]=newvalue;
        setrat([...t])
    }
    function ratingsubmit(){
        var rating={};
        for(var i=0;i<filesList.length;i++)
            rating[filesList[i]._id]=rat[i]
        const name=mydata.user.name

        
        axios.post('/order/rate',{name,rating,feed})
        .then(s=>(console.log(s)))
    }
    if (spinner) {
        return (
            <div>
                <img src={grow}></img>
                {mark == true ? <h1>Please wait....</h1> : <h2>Placing your order..</h2>}

            </div>
        )
    }
    else {
        return (

            <div className="order_root">
                <Header />
                <div className="order_row1">
                    <div className="order_col1">
                        <div className="order_address">
                            <h5>Delivery Address</h5>
                            <h6>{mydata.user.name}</h6>
                            <h6 >{mydata.user.address + " - " + mydata.user.zip}</h6>
                            <h6>{mydata.user.state + " " + mydata.user.city}</h6>
                            <h6>Phone number {mydata.user.mobile}</h6>
                        </div>
                    </div>

                    <div className="order_col2">
                        <h5>Your Rewards</h5>
                        <h6><strong>24</strong>   Plant Coins </h6>
                        <span>Go to My Reward section to know more..</span>
                    </div>
                    <div className="order_col3">
                        <h5>Your Invoice</h5>
                        <div>
                            <PictureAsPdfIcon />
                            <h6>Download Invoice</h6>
                        </div>
                        <button> Downnload</button>

                    </div>

                </div>
                <div className="order_row2">
                    <div className="stepper">
                        <div className="stepmain">
                            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </div>
                        <div >
                            <h5>Delivered by 25 June</h5>
                            <div className="stepbutton">
                                <button>Return</button>
                                <Popup trigger={<button>Feedback</button>} position="left center">
                                    
                                    {close => (
                                        <div className="feedback">
                                            <div className="feedbackground"></div>
                                            <div className="feedinfo">
                                                {filesList.map((data,i) => (
                                                    <div>
                                                        <div style={{ display: 'flex', flexDirection: 'Column' }}>
                                                            <span>{data.name}</span>
                                                            <Rating
                                                                name={i+1}
                                                                value={rat[i]}
                                                                onChange={(event, newValue) => {
                                                                    ratinghandler(event,newValue)
                                                                  }}
                                                                getLabelText={(value) => customIcons[value].label}
                                                                IconContainerComponent={IconContainer}
                                                            />
                                                        </div>

                                                    </div>
                                                ))}
                                                <textarea value={feed} onChange={e=>setfeed(e.target.value)} placeholder="Happy to hear you..."></textarea>
                                                <button className="close" onClick={ratingsubmit}>Submit </button>
                                            </div>
                                        </div>
                                    )}
                                </Popup>
                            </div>
                        </div>
                    </div>

                    <div className="show">
                        {
                            filesList.map(({ _id, name, description, file_path, price, qty, category }) => (
                                <OrderProduct id={_id} qty={qty} category={category} name={name} description={description} file_path={file_path} price={price} />
                            ))}
                    </div>
                </div>
            </div>


        )
    }
}


export default Orderdetails
