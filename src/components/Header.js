import React, { useState, useEffect } from 'react'
import './Header.css';
import { Link, useHistory } from 'react-router-dom';
import logo from './Shop/P_basket.svg'
import SearchIcon from '@material-ui/icons/Search';
import * as StateProvider from './StateProvider';
import MenuListComposition from './Cart';
import axios from '../axios';
import ClearIcon from '@material-ui/icons/Clear';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Cookies from 'universal-cookie';
import { useStateValue } from './StateProvider';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
function Header() {
    const [{ basket }, dispatch] = useStateValue();
    const [toggle, settoggle] = React.useState(true)
    const [info, setinfo] = useState([]);
    const [main, setmain] = React.useState('upload')
    const [mark, setmark] = React.useState(false);
    const [search, setsearch] = useState('')
    const history = useHistory();
    var link = '/search?search='
    const [{ user }] = StateProvider.useStateValue();
    const [nav, setnav] = useState(false);

    const StyledBadge = withStyles((theme) => ({
        badge: {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }))(Badge);
    async function setter(e) {
        setsearch(e.target.value)
        var z = "/plants/suggest/" + e.target.value;
        const { data } = await axios.get(z);
        console.log(data)
        setinfo(data)


    }
    function handler(e) {
        console.log(e.target.id)
        history.push('/product/' + e.target.id)
    }
    function change() {
        if (window.scrollY >= 100) {
            setnav(true)
        }
        else {
            setnav(false)
        }


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
    window.addEventListener('scroll', change)
    const API_URL = 'https://backend-plant.herokuapp.com/';
    //const API_URL = "http://localhost:5000/";
    return (
        <div>
            <div className="desktop_header">
                <nav className={nav ? "header active" : "header"}>
                    <div className="in">
                        <Link to="/">
                            <img className="header__logo" alt="" src={logo}></img>
                        </Link>
                        {user != null ? (<MenuListComposition />) : (<div className="auth">
                            <Link to="/login" className="header__link">
                                <div className="header__option"><h5>login</h5></div>
                            </Link>
                            <Link to="/signup" className="header__link">
                                <div className="header__option"><h5>Signup</h5></div>
                            </Link>
                        </div>)}
                        <div className="header__searchx">
                            <div className="header__search">
                                <input className="form-control mr-sm-2 " value={search} onChange={setter} placeholder="Search" />
                                <Link to={link + search}>
                                    <SearchIcon className='but' style={{ fontSize: 30 }} />
                                </Link>
                            </div>
                            {search == "" ? <div></div> :
                                <div className="headinfo">
                                    {info.slice(0, 5).map((data) => (
                                        <div className="showcontent" id={data._id} onClick={handler}>
                                            <img src={API_URL + data.file_path} />
                                            <span id={data._id} onClick={handler} >{data.name}</span>
                                        </div>

                                    ))}
                                </div>
                            }

                        </div>
                        <Link to="imagesearch">
                            <button className="classify">Image_Search</button>
                        </Link>
                        <Link to="/CheckOut" className="header__link">
                            <div className="header__cartoption">
                                <IconButton aria-label="cart" fontSize="large">
                                    <StyledBadge badgeContent={Object.keys(basket).length} color="secondary">
                                        <ShoppingCartIcon fontSize="large" color="primary" />
                                    </StyledBadge>
                                </IconButton>



                            </div>
                        </Link>
                    </div>




                </nav>
            </div>
            <div className="mobile_header">
                <div className="header">
                    <div className="parentside">
                        <div className="bghandle"> </div>
                        <div className="sidebar">
                            <div className="flex">
                                <Link to="/">
                                    <img className="header__dash" alt="" src={logo}></img>
                                </Link>
                                <div onClick={openside}  style={{ marginTop: -42, marginLeft: 55 }} >
                                    <ArrowBackIosIcon style={{fill:'white'}} />
                                </div>
                            </div>
                            {user != null ? (<div style={{ marginTop: 40 }} className="flex">< AccountCircleIcon style={{ fill: "white", marginTop: 12, marginLeft: 15 }} /><MenuListComposition /></div>) : (<div className="">
                                <Link to="/login" className="header__link">
                                    <div className="dashgroup" >
                                        <ExitToAppIcon style={{ fill: "white", marginTop: 12, marginLeft: 15 }} />
                                        <button name="dashboard" className="dashbut" onClick={handler}>Login</button>
                                    </div>
                                </Link>
                                <Link to="/signup" className="header__link">
                                    <div className="dashgroup" >
                                        <LockOpenIcon style={{ fill: "white", marginTop: 12, marginLeft: 15 }} />
                                        <button name="dashboard" className="dashbut" onClick={handler}>Signup</button>
                                    </div>
                                </Link>
                            </div>)}
                            <Link to="/imagesearch" className="header__link">
                                <div className="dashgroup" >
                                    <ImageSearchIcon style={{ fill: "white", marginTop: 12, marginLeft: 15 }} />
                                    <button name="dashboard" className="dashbut" onClick={handler}>Image Search</button>
                                </div>
                            </Link>
                            <a href="https://github.com/ankit-prateek/plant-basket" className="header__link">
                            <div className="dashgroup">
                                <GitHubIcon style={{ fill: "white", marginTop: 12, marginLeft: 15 }} />
                                <button name="dashboard" className="dashbut" onClick={handler}>GitHub</button>
                            </div>
                            </a>
                            <a href="https://linkedin.com/in/prateek-sahu-62378b1b4/" className="header__link">
                            <div className="dashgroup">
                                <LinkedInIcon style={{ fill: "white", marginTop: 12, marginLeft: 15 }} />
                                <button name="user" className="dashbut" onClick={handler}>LinkedIn</button>
                            </div>
                            </a>
                            <a href="https://www.instagram.com/prateek.sahu.773/" className="header__link">
                            <div className="dashgroup">
                                <InstagramIcon style={{ fill: "white", marginTop: 12, marginLeft: 15 }} />
                                <button name="dashboard" className="dashbut" onClick={handler}>InstaGram</button>
                            </div>
                            </a>
                            <a href="https://backend-plant.herokuapp.com/" className="header__link">
                            <div className="dashgroup">
                                <DeveloperModeIcon style={{ fill: "white", marginTop: 12, marginLeft: 15 }} />
                                <button name="user" className="dashbut" onClick={handler}>Backend api</button>
                            </div>
                            </a>

                        </div>
                    </div>
                    <div >
                        <div className="mobile_ham">
                            <div onClick={openside} className="mobile_ham_logo"  >
                                <MenuIcon />
                            </div>
                            <Link to="/">
                                <img className="header__logo" alt="" src={logo}></img>
                            </Link>
                            <Link to="/CheckOut" className="header__link">
                                <div className="header__cartoption">
                                    <IconButton aria-label="cart" fontSize="large">
                                        <StyledBadge badgeContent={Object.keys(basket).length} color="secondary">
                                            <ShoppingCartIcon fontSize="large" color="primary" />
                                        </StyledBadge>
                                    </IconButton>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <div className="mobile_search">
                                <input className="mobile_search_input" value={search} onChange={setter} placeholder="  Search...." />
                                <Link to={link + search}>
                                    <SearchIcon className='but' style={{ fontSize: 30 }} />
                                </Link>
                            </div>
                            {search == "" ? <div></div> :
                                <div className="headinfo">
                                    {info.slice(0, 5).map((data) => (
                                        <div className="showcontent" id={data._id} onClick={handler}>
                                            <img src={API_URL + data.file_path} />
                                            <span style={{ overflow: 'hidden' }}>{data.name}</span>
                                        </div>

                                    ))}
                                </div>
                            }
                        </div>



                    </div>
                </div>


            </div>

        </div>

    )
}

export default Header
