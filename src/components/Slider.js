import React from 'react';
import './Slider.css'
import { Link, useHistory } from 'react-router-dom';
import s1 from './Shop/overview/s1.png'
import s2 from './Shop/overview/s2.png'
import s3 from './Shop/overview/s3.png'
import s4 from './Shop/overview/s4.png'
import s5 from './Shop/overview/s5.png'
import s6 from './Shop/overview/s6.png'
import s7 from './Shop/overview/s7.png'
import s8 from './Shop/overview/s8.png'
import s9 from './Shop/overview/s9.png'
import s10 from './Shop/overview/s10.png'
import s11 from './Shop/overview/s11.png'
import s12 from './Shop/overview/s12.png'
import s13 from './Shop/overview/s13.png'
import s14 from './Shop/overview/s14.png'
import s15 from './Shop/overview/s15.png'
import s16 from './Shop/overview/s16.png'
import s17 from './Shop/overview/s17.png'
import s18 from './Shop/overview/s18.png'
import s19 from './Shop/overview/s19.png'
import s20 from './Shop/overview/s20.png'
import s21 from './Shop/overview/s21.png'
import s22 from './Shop/overview/s22.png'
import s23 from './Shop/overview/s23.png'
import s24 from './Shop/overview/s24.png'
import s25 from './Shop/overview/s25.png'
import s26 from './Shop/overview/s26.png'
import logo from './Shop/P_basket.svg'

function Slider() {

    return (
        <div className="parentshow">
            <div className="dheader">
            <Link to="/">
                <img className="dheader_img" alt="" src={logo} ></img>
            </Link>
            </div>
            <div class="pars1">
                <img src={s1} className="s1" />
                <h3 class="texts1">Sales Tracking page</h3>
            </div>
            <div class="pars2">
                <img src={s2} className="s2" />
                <h3 class="texts2">My order page</h3>
            </div>
            <div class="pars3">
                <img src={s3} className="s3" />
                <h3 class="texts3">Feedback page</h3>
            </div>
            <div class="pars4">
                <img src={s4} className="s4" />
                <h3 class="texts4">Front landing page</h3>
            </div>
            <div class="pars5">
                <img src={s5} className="s5" />
                <h3 class="texts5">Order details page</h3>
            </div>
            <div class="pars6">
                <img src={s6} className="s6" />
                <h3 class="texts6">Login page</h3>
            </div>
            <div class="pars7">
                <img src={s7} className="s7" />
                <h3 class="texts7">Sign Up page</h3>
            </div>
            <div class="pars8">
                <img src={s8} className="s8" />
                <h3 class="texts8">Rating of plants</h3>
            </div>
            <div class="pars9">
                <img src={s9} className="s9" />
                <h3 class="texts9">Payment mode : Card</h3>
            </div>
            <div class="pars10">
                <img src={s10} className="s10" />
                <h3 class="texts10">Our team</h3>
            </div>
            <div class="pars11">
                <img src={s11} className="s11" />
                <h3 class="texts11">Category wise plant</h3>
            </div>
            <div class="pars12">
                <img src={s12} className="s12" />
                <h3 class="texts12">Plants page</h3>
            </div>
            <div class="pars13">
                <img src={s13} className="s13" />
                <h3 class="texts13">Plants upload page</h3>
            </div>
            <div class="pars14">
                <img src={s14} className="s14" />
                <h3 class="texts14">Product page</h3>
            </div>
            <div class="pars15">
                <img src={s15} className="s15" />
                <h3 class="texts15">seller profile page</h3>
            </div>
            <div class="pars16">
                <img src={s16} className="s16" />
                <h3 class="texts16">Products uploaded by seller </h3>
            </div>
            <div class="pars17">
                <img src={s17} className="s17" />
                <h3 class="texts17">Sold history page</h3>
            </div>
            <div class="pars18">
                <img src={s18} className="s18" />
                <h3 class="texts18">Image search  page</h3>
            </div>
            <div class="pars19">
                <img src={s19} className="s19" />
                <h3 class="texts19">Search suggestion</h3>
            </div>
            <div class="pars20">
                <img src={s20} className="s20" />
                <h3 class="texts20">search result</h3>
            </div>
            <div class="pars21">
                <img src={s21} className="s21" />
                <h3 class="texts21">Shopping Cart</h3>
            </div>
            <div class="pars22">
                <img src={s22} className="s22" />
                <h3 class="texts22">Payment mode :UPI</h3>
            </div>
            <div class="pars23">
                <img src={s23} className="s23" />
                <h3 class="texts23">CheckOut</h3>
            </div>
            <div class="pars24">
                <img src={s25} className="s24" />
                <h3 class="texts24">Payment mode :Cash</h3>
            </div>
         
           


        </div>

    )
}

export default Slider
