import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from '../axios';
import './PlantsUpload.css';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import { useStateValue } from './StateProvider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={10} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },

  buttonProgress: {
    color: green[500],

    marginTop: -30,
    marginLeft: 100,
  },
}));


function PlantsUpload(props) {
  const [{ user }] = useStateValue();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [warnopen, setwarn] = React.useState(false);
  const timer = React.useRef();



  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);


  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState('');
  const [state, setState] = useState({
    name: '',
    price: null,
    description: '',
    category: '',
    types: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false);
  const dropRef = useRef();

  const handleInputChange = (event) => {

    setState({
      ...state,
      [event.target.name]: event.target.value
    });

  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
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

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }

    try {
      const { name, category, price, description, types } = state;
      if (name.trim() !== '' && description.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('name', name);
          formData.append('category', category);
          formData.append('types', types);
          formData.append('price', price);
          formData.append('description', description);
          formData.append('admin', user._id);

          setErrorMsg('');

          const res = await axios.post('/plants/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(res.data)
          setOpen(true);
          props.history.push('/list');
        } else {
          setErrorMsg('   Please select a file to add   ');
          setwarn(true);
        }
      } else {
        setErrorMsg('    Please enter all the field values   ');
        setwarn(true);
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setwarn(false)
    setOpen(false);
  };

  return (


    <form className="xygroup" onSubmit={handleOnSubmit} >
      <div className="xyparent">
        {previewSrc ? (
          isPreviewAvailable ? (
            <div >
              <img className="ximage" src={previewSrc} alt="Preview" />
            </div>
          ) : (
            <div >
              <p>No preview available for this file</p>
            </div>
          )
        ) : (
          <div >

          </div>
        )}
      </div>
      <div className="info_plants">
        <h5>Plant Name</h5>
        <input className="plantname" value={state.name} placeholder="Enter Name" name='name' onChange={handleInputChange}></input>
        <div className="parentselect">
          <div className="catselect">
            <h5>Price</h5>
            <input className="plantprice" value={state.price} placeholder="Enter Price" name='price' onChange={handleInputChange}></input>
          </div>
          <div className="catselect">
            <h5>Stock</h5>
            <input className="plantprice" placeholder="Enter Stock" name='price' ></input>
          </div>
        </div>


        <div className="parentselect">
          <div className="catselect">
            <label >Choose a category:</label>
            <select className="select" name='category' onChange={handleInputChange} >
              <option value="Plants">Plants</option>
              <option value="Conifer Plants">Conifer Plants</option>
              <option value="Flowering Plants">Flowering Plants</option>
              <option value="Bonsai Plants">Bonsai Plants</option>
              <option value="Cactus Plants">Cactus Plants</option>
              <option value="Money Plants">Money Plants</option>
              <option value="Air Plants">Air Plants</option>
            </select>
          </div>
          <div className="catselect">
            <label >Type of plant</label>
            <select className="select" name='types' onChange={handleInputChange}  >
              <option value="Plants"> Plants</option>
              <option value="Indoor Plants">Indoor Plants</option>
              <option value="Outdoor Plants">Outdoor Plants</option>
            </select>
          </div>
        </div>


        <h5>Description</h5>
        <textarea className="plantdes" value={state.description} placeholder="Enter Description" name='description' onChange={handleInputChange}></textarea>

        <Dropzone className="plantphoto" onDrop={onDrop} onDragEnter={() => updateBorder('over')} onDragLeave={() => updateBorder('leave')}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef} >
              <input {...getInputProps()} />
              <p>Drag and drop a file OR click here to select a file</p>
              {file && (
                <div><strong>Selected file:</strong> {file.name}</div>)}
            </div>
          )}
        </Dropzone>

        <button className="plantbutton" type="submit" style={{marginLeft:30}}> Upload</button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
      <div >
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Plant uploaded successfully!
          </Alert>
        </Snackbar>
        <Snackbar open={warnopen} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errorMsg}!
          </Alert>
        </Snackbar>
      </div>

    </form>

  )
}

export default PlantsUpload
