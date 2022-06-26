import React, { useState, useEffect } from 'react'
import axios from '../axios';
import './ProductPage.css';
import Header from './Header';
import { useStateValue } from './StateProvider';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Rating from '@material-ui/lab/Rating';
import Cookies from 'universal-cookie';

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
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

function ProductPage(props) {

    const id = props.match.params.id;
    const [filesList, setFilesList] = useState({ review: [] });
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        const getFilesList = async () => {
            try {
                const { data } = await axios.get('/plants/' + id)
                console.log(data.file_path)
                setErrorMsg('');
                setFilesList(data);
            } catch (error) {
                error.response && setErrorMsg(error.response.data);
            }
        };

        getFilesList();
    }, []);
    const API_URL = 'https://backend-plant.herokuapp.com/';
    //const API_URL="http://localhost:5000/";
    const cookies = new Cookies();
    const [{ user }, dispatch] = useStateValue();
    var link = '/product/'
    const setbasket = () => {
        var bas = cookies.get('basket');
        console.log(bas)
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
        <div>
            <Header />
            <div className="product_info1">
                <div className="product_info">
                   
                    <div className="product_my_group">
                        <img className="product_short" src="https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-aster-lavender-plant_75x75_crop_center.jpg?v=1608527746" ></img>
                        <img className="product_short" src="https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-plants-zephyranthes-grandiflora-rain-lily-any-color-plant-16969440526476_516x516.jpg?v=1601348761" ></img>
                        <img className="product_short" src="https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-plants-zephyranthes-grandiflora-rain-lily-any-color-plant-16969440526476_516x516.jpg?v=1601348761"></img>
                        <img className="product_short" src="https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-plants-zephyranthes-grandiflora-rain-lily-any-color-plant-16969440526476_516x516.jpg?v=1601348761"></img>

                    </div>
                    <img className="product_logo" src={API_URL + filesList.file_path}></img>
                    
                    <div className="product_box">
                        <h4>{filesList.name}</h4>
                        <div style={{display:"flex",marginTop:15}}> 
                        <Rating name="half-rating-read" size="medium" value={4.4} precision={0.1} readOnly />
                        <h5><pre>    5 reviews    </pre></h5>
                        </div>
                        
                        <h4 className="product_m">M.R.P.: {filesList.price}</h4>

                        <h4 className="product_m" >Get it by Monday, July 2, 8AM-5PM.</h4>
                        <div>
                            <select className="product_quantity">
                                <option>Quantity</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                            <button className="product_but" onClick={user == null ? setbasket : onsubmit}>Add to Basket</button>
                        </div>
                    </div>

                </div>
                <div className="description">
                    <h4>Description</h4>
                    <p className="desc_page">{filesList.description}</p>
                </div>

                <h4 className="rating_div">What people think about this plant</h4>
                <Carousel additionalTransfrom={0}
                    arrows
                    autoPlay
                    autoPlaySpeed={4000}
                    centerMode={false}
                    className=""
                    containerClass="container-with-dots"
                    customTransition="all 1s linear"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 3,
                            partialVisibilityGutter: 40
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1,
                            partialVisibilityGutter: 30
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 2,
                            partialVisibilityGutter: 30
                        }
                    }}
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={2}
                    swipeable
                    transitionDuration={1000}>
                    {filesList.review.map(({ name, rate, feedback }) => (
                        <div className="product_review">
                            <h3>{name || "unknown"}</h3>
                            <Rating name="half-rating-read" size="small" value={rate} precision={0.1} readOnly />
                            <p>{feedback}</p>
                        </div>


                    ))}

                </Carousel>


            </div>
        </div>
    )
}

export default ProductPage
