import React, { useState, useEffect } from 'react'
import axios from '../axios';
import MenuIcon from '@material-ui/icons/Menu';
import './PlantsPage.css';
import Product from './Product';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

function PlantsPage() {
  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get('/plants/getAllFiles');
        setErrorMsg('');
        const z = data.sort(compareValues('name'));
        setFilesList(z)
        setBackup(z)

      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);
  const classes = useStyles();
  const [myvalue, mysetValue] = React.useState([20, 105]);
  const [cat, setcat] = useState('');
  const [mytype, setype] = useState('');
  const [pick, setpick] = useState([0, 0]);
  const [backup, setBackup] = useState([]);
  const [state, setState] = useState({
    category: '',
    types: '',
    sort: 'name'
  });
  const [page, setPage] = React.useState(1);

  const handleChange = (event, newValue) => {
    mysetValue(newValue);
  };
  const [filesList, setFilesList] = useState([]);
  const [sort, setsort] = useState('name');
  const [errorMsg, setErrorMsg] = useState('');

  function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }


  const API_URL = 'https://backend-plant.herokuapp.com/';
  //const API_URL="http://localhost:5000/";
  function inputhandlerleft(e) {
    var x = e.target.value
    var y = myvalue[1]
    mysetValue([x, y])
  }
  function inputhandlerright(e) {
    var y = e.target.value
    var x = myvalue[0]
    mysetValue([x, y])
  }
  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
    if (event.target.name == 'sort') {
      var order = 'asc';
      var name = event.target.value;
      if (event.target.value.endsWith("high")) {
        order = 'desc';
        name = name.slice(0, -4)
      }
      setFilesList(filesList.sort(compareValues(name, order)));

    }
  };
  const [toggle, settoggle] = React.useState(true)
  function openside(e) {
    if (toggle) {
      const sidebar = document.querySelector(".col1");
      sidebar.classList.add("open")
      settoggle(false)
    }
    else {
      const sidebar = document.querySelector(".col1");
      sidebar.classList.remove("open")
      settoggle(true)
    }

  }

  function clickhandle() {
    var ans = []
    for (var i = 0; i < backup.length; i++) {
      if ((state.category == "" || state.category == backup[i].category) && ((backup[i].price >= myvalue[0] && backup[i].price <= myvalue[1]) || (myvalue[0] == 0 && myvalue[1] == 0)) && (state.types == "" || state.types == backup[i].types)) {
        ans.push(backup[i])
      }
    }
    setFilesList(ans)
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);

  };




  return (
    <div className="webview">
      <div className="col1">
        <h3>filters</h3>
        <div className="setprice">
          <h5>price range</h5>
          <div className="myview">
            <input value={myvalue[0]} onChange={inputhandlerleft} />
            <div className="sliderrange">
              <Slider
                value={myvalue}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                max={1000}
              />
            </div>
            <input value={myvalue[1]} onChange={inputhandlerright} />
          </div>

        </div>
        <div className="myflex" >
          <label >Choose a category:</label>
          <select className="setselect" name='category' onChange={handleInputChange}  >
            <option value="Plants">Plants</option>
            <option value="Conifer Plants">Conifer Plants</option>
            <option value="Flowering Plants">Flowering Plants</option>
            <option value="Flowering Plants">Bonsai Plants</option>
            <option value="Cactus Plants">Cactus Plants</option>
            <option value="Money Plants">Money Plants</option>
            <option value="Air Plants">Air Plants</option>
          </select>
        </div>
        <div className=" myflex">
          <label >Type of plant</label>
          <select className="setselect" name='types' onChange={handleInputChange}  >
            <option value="Plants"> Plants</option>
            <option value="Indoor Plants">Indoor Plants</option>
            <option value="Outdoor Plants">Outdoor Plants</option>
          </select>
        </div>
        <button className="filterbutton" onClick={clickhandle}>apply</button>
      </div>

      <div className="plantpagecol2">
        <div className="row1">
          <div onClick={openside} className="hamburger" >
            <MenuIcon />
          </div>
          <h6>Home{' > '}Products{' > '}Plants</h6>
          <select name='sort' onChange={handleInputChange} className="sorting">
            <option value="name">Name Low to high</option>
            <option value="namehigh">Name high to low</option>
            <option value="price">price Low to high</option>
            <option value="pricehigh">price high to low</option>
          </select>
        </div>
        <div className="row2">

          {filesList.slice(12 * (page - 1), 12 * page).map(
            ({ _id, name, category, price, description, types, file_path }) => (
              <Product id={_id} img={API_URL + file_path} name={name} price={price} description={description} classname="plants" />

            ))}
        </div>
        <div>
          <Pagination style={{ marginLeft:"50%" }} count={5} page={page} onChange={handleChangePage} variant="outlined" shape="rounded" color="primary" />
        </div>
      </div>

    </div>
  )
}

export default PlantsPage
