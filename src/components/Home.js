import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Home.css';
import Product from './Product';
import axios from '../axios';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Cookies from 'universal-cookie';
import { useStateValue } from './StateProvider';
import Header from './Header';
import ClearIcon from '@material-ui/icons/Clear';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

function Home() {
    const [{ basket }, dispatch] = useStateValue();
    const [show,setshow]=useState(true)
    const cookies = new Cookies();
    const [cat, setcat] = useState(["Flowering Plants", "Conifer Plants", "Bonsai Plants", "Cactus Plants", "Money Plants", "Air Plants"])
    if (cookies.get("basket") == null) {
        cookies.set('basket', [], { path: '/' });
    }





    const [filesList, setFilesList] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {

        const getFilesList = async () => {
            try {
                const { data } = await axios.get('/plants/getAllFiles');
                var temp={}
                setErrorMsg('');
                var conifer = [], flowering = [], bonsai = [], cactus = [], money = [], air = [];
                for (var i = 0; i < data.length; i++) {
                    temp[data[i]._id]=data[i]
                    if (data[i].category == "Flowering Plants") {
                        flowering.push(data[i])
                    }
                    if (data[i].category == "Conifer Plants") {
                        conifer.push(data[i])
                    }
                    if (data[i].category == "Bonsai Plants") {
                        bonsai.push(data[i])
                    }
                    if (data[i].category == "Cactus Plants") {
                        cactus.push(data[i])
                    }
                    if (data[i].category == "Money Plants") {
                        money.push(data[i])
                    }
                    if (data[i].category == "Air Plants") {
                        air.push(data[i])
                    }
                }
                setFilesList([flowering, conifer, bonsai, cactus, money, air])
                localStorage.setItem('sgvc',JSON.stringify(temp))
                

            } catch (error) {
                error.response && setErrorMsg(error.response.data);
            }
        };

        getFilesList();
    }, []);
    
    const API_URL = 'https://backend-plant.herokuapp.com/';
    
    return (
        <div className="info">
            <Header />
            <div className="slider">
                {show?(
                <div className="mypopup">
                    <div style={{display:'flex'}}>
                    <h4 style={{marginLeft:'30%',marginTop:10,marginBottom:20}}>Instructions</h4>
                    <div className="clearicon"><ClearIcon onClick={e=>setshow(false)} /></div>
                    </div>
                    
                    <ul className="popupinfo">
                        <li style={{marginBottom:15,textAlign:'left'}}>We are not accepting orders as this is only for educational purpose</li>
                        <li style={{marginBottom:15}}>if you don't have time you can checkout <a href="/overview">overview</a> of the website</li>
                        <li style={{marginBottom:15}}>Do checkout <a style={{color:'green',fontWeight:700}} href="/imagesearch">Image search</a>  where  you  can search plants with image</li>
                        <li style={{marginBottom:15}}>Payment page is only a demo page where you can use any fake details</li>
                        <li style={{marginBottom:15}}>If you have find any bug/error please report in the report section</li>
                        <li style={{marginBottom:15}}>you can find all links related to website in the footer including github</li>
                    </ul>
                </div>):<div></div>}
                <h1>Welcome !</h1>
                <p>Hello there we are to provide uhh the best grooming item for your sweet home.</p>
                <Link to='/plantspage'><a >Explore</a></Link>
            </div>
            <div className="home_resize"></div>
            {filesList.map((data, i) => (
                <div >
                    <div className="sourceinfo">
                        <h2 className="sourcex">{cat[i]}</h2>
                    </div>
                   
                    <div className="carousel">
                        <Carousel responsive={responsive}>

                            {data.map(({ _id, name, category, price, description, types, file_path }) => (
                                <Product id={_id} img={API_URL + file_path} name={name} price={price} description={description} classname="plants" />

                            ))}
                        </Carousel>
                    </div>
                </div>
            ))}








        </div>
    )
}

export default Home




