import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import PlantsUpload from './PlantsUpload';
import Charts from './Charts';
import Sell from './Sell';
import User from './User';
import { Link } from 'react-router-dom';
import logo from './Shop/P_basket.svg'
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import ViewListIcon from '@material-ui/icons/ViewList';
import BackupIcon from '@material-ui/icons/Backup';
import RateReviewIcon from '@material-ui/icons/RateReview';
import CollapsibleTable from './CollapsibleTable';
import { useStateValue } from './StateProvider';
import axios from '../axios';
import MyOrders from './MyOrders';
import './newfile.css'
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';



import './Dashboard.css'
function CustomerDashboard() {
    const cookies = new Cookies();
    const history = useHistory();
    const [toggle, settoggle] = React.useState(true)
    const [main, setmain] = React.useState('upload')
    const [order, setorders] = React.useState({});
    const [plant, setplant] = React.useState({});
    const [sell, setsell] = React.useState({});
    const [mark,setmark]=React.useState(false);
    React.useEffect(() => {
        const getFilesList = async () => {
            try {
                var user=""
                console.log('calles')
                const username = cookies.get('user');
                if (username) {
                  const { data } = await axios.post('/users/login', username)
                  user=data
                }
                else{
                    history.push('/')
                }
                var z=localStorage.getItem('sgvc')
                const xyz=JSON.parse(z);
                console.log(xyz)
                const sell = user.sell;
                const pro = user.products;
                const ord = user.myorder;
                var plants = {}, orders = {}, sales = {};

                for (var i = 0; i < pro.length; i++) {
                    var mydata;
                    if(xyz[pro[i]]){
                        mydata=xyz[pro[i]]
                    }
                    else{
                    const { data } = await axios.get('/plants/' + pro[i])
                    mydata=data
                    }
                    mydata['date'] = [parseInt(mydata.createdAt.slice(8, 10)), parseInt(mydata.createdAt.slice(5, 7))]
                    plants[mydata._id] = mydata
                }
                for (var i = 0; i < ord.length; i++) {
                    const { data } = await axios.get('/order/' + ord[i])
                    var prod = [];
                    for (var key in data.products) {
                            var temp = xyz[key]
                            temp['qty'] = data.products[key]
                            prod.push(temp)
                    }
                    
                    data['products'] = prod
                    data['date'] = [parseInt(data.createdAt.slice(8, 10)), parseInt(data.createdAt.slice(5, 7))]
                    orders[data._id] = data
                }

                for (var i = 0; i < Object.keys(sell).length; i++) {
                    const a = sell[i].orderid
                    const b = sell[i].product
                    if (!sales[a]) {
                        if (orders[a]) {
                            var temp = orders[a]
                            var t2 = plants[b]
                            t2['qty'] = sell[i].qty
                            temp.products = [t2]
                            sales[a] = temp

                        }
                        else {
                            var { data } = await axios.get('/order/' + a)
                            data['date'] = [parseInt(data.createdAt.slice(8, 10)), parseInt(data.createdAt.slice(5, 7))]
                            var t2 = plants[b]
                            t2['qty'] = sell[i].qty
                            data.products = [t2]
                            sales[a] = data
                        }
                    }
                    else {
                        var t2 = xyz[b]
                        t2['qty'] = sell[i].qty
                        sales[a].products.push(t2)
                    }
                }
                setorders(orders)
                setplant(plants)
                setsell(sales)
                setmark(true)
                setTimeout(() => setmark(false), 1200)
                setmain('upload')
                


            } catch (error) {
                console.log(error);
            }
        };

        getFilesList();
    }, []);
    function handler(e) {
        setmain(e.target.name)

    }
    function openside(e) {
        if (toggle) {
            const sidebar = document.querySelector(".parentside");
            sidebar.classList.add("open")
            settoggle(false)
        }
        else {
            const sidebar = document.querySelector(".parentside");
            sidebar.classList.remove("open")
            settoggle(true)
        }

    }
    return (
        <div className="dash">
            <div className="wrapper">
            <div className="parentside">
                    <div className="bghandle"> </div>
                    <div className="sidebar">
                        {mark?<span className="update_status">updated</span>:<div></div>}

                        <Link to="/">
                            <img className="header__dash" alt="" src={logo}></img>
                        </Link>

                        <div className={main == "dashboard" ? "dashgroup custom" : "dashgroup"} name="dashboard">
                            <DashboardIcon style={{ fill: "white", marginTop: 12, marginLeft: 15 }} />
                            <button name="dashboard" className="dashbut" onClick={handler}>Dashboard</button>
                        </div>
                        <div className={main == "user" ? "dashgroup custom" : "dashgroup"} name="user" onClick={handler}>
                            <PersonSharpIcon style={{ fill: "white", marginTop: 12, marginLeft: 15 }} />
                            <button name="user" className="dashbut" onClick={handler}>User Profile</button>

                        </div>
                        <div className={main == "products" ? "dashgroup custom" : "dashgroup"} name="products">
                            <ViewListIcon style={{ fill: "white", marginTop: 12, marginLeft: 15 }} />
                            <button name="products" className="dashbut" onClick={handler}>My Orders</button>

                        </div>
                        <div className={main == "upload" ? "dashgroup custom" : "dashgroup"} name="upload">
                            <BackupIcon style={{ fill: "white", marginTop: 12, marginLeft: 15 }} />
                            <button name="upload" className="dashbut" onClick={handler}>Upload Plants</button>

                        </div>
                        <div className={main == "review" ? "dashgroup custom" : "dashgroup"} name="review">
                            <RateReviewIcon style={{ fill: "white", marginTop: 12, marginLeft: 15 }} />
                            <button name="review" className="dashbut" onClick={handler}>Customer Review</button>
                        </div>
                        <div className={main == "sold" ? "dashgroup custom" : "dashgroup"} name="sold">
                            <RateReviewIcon style={{ fill: "white", marginTop: 12, marginLeft: 15 }} />
                            <button name="sold" className="dashbut" onClick={handler}>Sold plants</button>

                        </div>



                    </div>
                </div>
                <div className="main"></div>
                <div onClick={openside} className="hamburger" >
                    <MenuIcon />
                </div>


            </div>

            {main == 'upload' ? <PlantsUpload /> : (main == 'user' ? <User /> : (main == 'sold' ? <Sell mysell={sell} /> : (main == 'dashboard' ? <Charts myplant={plant} myorder={order} /> : <MyOrders data={order} />)))}

        </div >
    )
}

export default CustomerDashboard
