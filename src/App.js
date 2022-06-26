import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Slider from './components/Slider';
import Footer from './components/Footer';
import ProductPage from './components/ProductPage';
import Login from './components/Login';
import Signup from './components/Signup';
import axios from './axios';
import PlantsUpload from './components/PlantsUpload';
import PlantsPage from './components/PlantsPage';
import SubTotal from './components/SubTotal';
import CheckOut from './components/CheckOut';
import OurTeam from './components/OurTeam';
import SearchBox from './components/SearchBox';
import Overview from './components/Overview';
import Payement from './components/Payement';
import Cookies from 'universal-cookie';
import { useStateValue } from './components/StateProvider';
import Checkoutpage from './components/Checkoutpage';
import Orderdetails from './components/Orderdetails';
import ImageSearch from './components/ImageSearch';
import Dashboard from './components/Dashboard';
import TestPage from './components/TestPage';
import CustomerDashboard from './components/CustomerDashboard'


function App() {
  const [toggle, settoggle] = React.useState(true);
  const [{ user, basket }, dispatch] = useStateValue();
  const cookies = new Cookies();
  
  useEffect(() => {
    const selflogin = async () => {
      const username = cookies.get('user');
      if (username) {
        const { data } = await axios.post('/users/login', username)
        if (data) {
          dispatch({ type: "SET_USER", user: data, });
          cookies.set('basket', data.basket, { path: '/' });
          var bas = data.basket;
         
          const count = {}
          bas.forEach(item => {
            if (count[item]) {
              count[item] += 1
              return
            }
            count[item] = 1
          })
          dispatch({ type: "ADD", item: {...count} })
          settoggle(!toggle)

        }
        else {
          cookies.remove('user')
        }}}




selflogin();
  }, []);


return (
  <div className="App">
    <Router>
      <Switch>
      <Route path="/testing"><SubTotal /> </Route>
        <Route path="/overview"><Slider /> </Route>
        <Route path="/dashboard"><Dashboard /> </Route>
        <Route path="/myorders"><CustomerDashboard /> </Route>
        <Route path="/payment"><Payement /> </Route>
        <Route path="/imagesearch"><ImageSearch /></Route>
        <Route path="/plantsupload"><PlantsUpload /></Route>
        <Route path="/checkoutpage"><Checkoutpage /></Route>
        <Route path="/orders/:id" component={Orderdetails}></Route>
        <Route path="/search" component={SearchBox}></Route>
        <Route path="/CheckOut"><Header /><CheckOut /></Route>
        <Route path="/plantspage" ><Header /><PlantsPage /></Route>
        <Route path="/product/:id" component={ProductPage}></Route>
        <Route path="/login"><Header/><Login /></Route>
        <Route path="/signup"><Header/><Signup /></Route>
        <Route path="/ourteam"><Header /><OurTeam />  <Footer /></Route>
        <Route path="/"><Home /><Footer /></Route>



      </Switch>
    </Router>

  </div>
);
}

export default App;
