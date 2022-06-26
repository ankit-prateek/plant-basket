import React, { useState, useEffect } from 'react'
import axios from '../axios';
import Product from './Product';
import Header from './Header';
import queryString from 'query-string'
import './PlantsPage.css';

function SearchBox(props) {
    const parsed = queryString.parse(props.location.search);
    console.log(parsed);
    const [filesList, setFilesList] = useState([]);
    const id = props.match.params.id;
    
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        const getFilesList = async () => {
            try {
                const { data } = await axios.get('/plants/search/' + parsed.search);
                console.log(data)
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

    return (
        <div>
            <Header/>
        
        
                    <div className="row2">
                        {filesList.map(
                            ({ _id, name, price, description, file_path, file_mimetype }) => (
                                <Product id={_id} img={API_URL + file_path} name={name} price={price} description={description} classname="plants" />
                            ))}
                    </div>
                    </div>
               
    )
}

export default SearchBox
