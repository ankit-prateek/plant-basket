import React from 'react'
import './OurTeam.css'
import prateek from './Shop/21147.jpg';
import raghav from './Shop/22233.jpg';
import raj from './Shop/22127.jpg';
import rahul from './Shop/22402.jpg';


function OurTeam() {
    return (
        <section class="team">
        <div class="title">
            <h1>Our Team</h1>
        </div>
        <div class="our-team">
            <div class="member">
                <div class="pic">
                    
                    <img src={prateek} alt=""></img>
                </div>
                <div class="content">
                    <h3>Prateek Sahu</h3>
                    <span>Backend Developer</span>
                </div>
                <a href="#" class="contact-button">Contact</a>
                <div class="social">
                    <a href="#" class="fa fa-facebook"></a>
                    <a href="#" class="fa fa-twitter"></a>
                    <a href="#" class="fa fa-instagram"></a>
                    <a href="#" class="fa fa-linkedin"></a>
                </div>
            </div>
            <div class="member">
                <div class="pic">
                    <img src={raj} alt=""></img>
                </div>
                <div class="content">
                    <h3>Raj Agrahari</h3>
                    <span>Founder & CEO</span>
                </div>
                <a href="#" class="contact-button">Contact</a>
                <div class="social">
                    <a href="#" class="fa fa-facebook"></a>
                    <a href="#" class="fa fa-twitter"></a>
                    <a href="#" class="fa fa-instagram"></a>
                    <a href="#" class="fa fa-linkedin"></a>
                </div>
            </div>
            <div class="member">
                <div class="pic">
                    <img src={raghav} alt=""></img>
                </div>
                <div class="content">
                    <h3>Raghvendra Nigam</h3>
                    <span>Co-Founder</span>
                </div>
                <a href="#" class="contact-button">Contact</a>
                <div class="social">
                    <a href="#" class="fa fa-facebook"></a>
                    <a href="#" class="fa fa-twitter"></a>
                    <a href="#" class="fa fa-instagram"></a>
                    <a href="#" class="fa fa-linkedin"></a>
                </div>
            </div>
            <div class="member">
                <div class="pic">
                    <img src={rahul} alt=""></img>
                </div>
                <div class="content">
                    <h3>Rahul</h3>
                    <span>Full Stack Developer</span>
                </div>
                <a href="#" class="contact-button">Contact</a>
                <div class="social">
                    <a href="#" class="fa fa-facebook"></a>
                    <a href="#" class="fa fa-twitter"></a>
                    <a href="#" class="fa fa-instagram"></a>
                    <a href="#" class="fa fa-linkedin"></a>
                </div>
            </div>
        </div>
</section>
    )
}

export default OurTeam
