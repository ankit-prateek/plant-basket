import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from '../axios';
import Product from './Product';
import grow from './Shop/grow.gif';
import './ImageSearch.css'
import glass from './Shop/glass.png'
import sad from './Shop/sad.jpg'
import Chip from '@material-ui/core/Chip';
import plant from './Shop/bot.gif'
import { Link, useHistory } from 'react-router-dom'


function ImageSearch() {
  const history = useHistory();
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false);
  const dropRef = useRef();
  const [image, setimage] = useState([]);
  const [loading, setloading] = useState(false);
  const [process, setprocess] = useState(true);
  const [chipData, setChipData] = React.useState([]);
  const [set, setter] = useState(false)
  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
      imagechange(uploadedFile);

    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };
  const imagechange = async (uploadedFile) => {
    try {
      if (uploadedFile) {
        const formData = new FormData();
        formData.append('file', uploadedFile);
        const { data } = await axios.post('/plants/image/suggest/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setChipData(data)
        console.log(data)

      } else {
        setErrorMsg('Please select a file to add.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setloading(true)
    setprocess(false)

    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        setErrorMsg('');
        const { data } = await axios.post('/plants/image/search/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(data)
        setimage(data)
        setloading(false)

      } else {
        setErrorMsg('Please select a file to add.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };



  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete));
  };

  const API_URL = 'https://backend-plant.herokuapp.com/';
  //const API_URL = "http://localhost:5000/";
  if (process) {
    return (
      <div>
        <div className="inheader">
          <h3 >Image search</h3>
        </div>
        <div className="showtag">
            {chipData.map((data, key) => (
              <div key={data} onClick={e => history.push('/search?search=' + data)} className="showtaginfo">
                <Chip
                  label={data}
                  variant="outlined"
                  color="primary"
                  style={{ height: 50, width: 150 }}

                />
              </div>

            ))}
          </div>
        <div className="content">
          {previewSrc ? (
            isPreviewAvailable ? (
              <div className="preview-message">
                <img className="preview-image" src={previewSrc} alt="Preview" />
                <img src={glass} className="mover"></img>

              </div>
            ) : (
              <div className="preview-message">
                <p>No preview available for this file</p>
              </div>
            )
          ) : (
            <div >
              <img className="post-image" src={plant} alt="waiting" />

            </div>
          )}
          <div className="contentinfox">
            <Dropzone className="plantphoto" onChange={e => console.log("he")} onDrop={onDrop} onDragEnter={() => updateBorder('over')} onDragLeave={() => updateBorder('leave')}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: 'drop-zonex' })} ref={dropRef}>
                  <input {...getInputProps()} />
                  <p >Drag and drop a file OR click here to select a file</p>
                  {file && (
                    <div><strong>Selected file:</strong> {file.name}</div>)}
                </div>
              )}
             </Dropzone>
            <button className="plantbutton" onClick={handleOnSubmit} >Search plant</button>
            <h3 className="showor">Or</h3>
            <button className="plantbutton">Open camera</button>
           
          </div>
        </div>

       
         
        
      </div>
    )
  }

  else {
    if(loading){
      return (
        <div>
          <img src={grow}></img>
          <h4>Please wait....</h4>
        </div>
      )
    }
    else{
    return (
      <div>
        
        {image.length===0?<div className="sad">
          <img src={sad}/>
          <h3 style={{fontFamily:'cursive',color:'red'}}>I'm sorry my team unable to identify your plant</h3>
        </div>:
        <div className="showimage">
          {image.map(
            ({ _id, name, price, description, file_path, file_mimetype }) => (
              <Product id={_id} img={API_URL + file_path} name={name} price={price} description={description} classname="plants" />
            ))}
        </div>}
      </div>
    )
  }
}}

export default ImageSearch
