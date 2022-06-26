import React from 'react'
import './Footer.css';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
function Footer() {
    return (
        <div class="footer">
            <div class="upper">
                <div class="item">
                    <h2>About Us</h2>
                    <p>We are here to deliver best services</p>
                </div>
                <div class="item">
                    <h2>Links</h2>
                    <ul>
                        <li><a href="/ourteam/">Our Team</a></li>
                        <li><a href="/overview">Overview</a></li>
                        <li><a href="">Link</a></li>
                        <li><a href="">Link</a></li>
                    </ul>
                </div>
                <div class="item">
                    <h2>Social Links</h2>
                    <ul>
                        <li>
                            <a href="https://github.com/ankit-prateek/plant-basket" className="header__link">
                                <GitHubIcon className="footer_icon" style={{ fontSize: 50 }} />
                            </a>
                        </li>
                        <li>
                            <a href="https://linkedin.com/in/prateek-sahu-62378b1b4/" className="header__link">
                                <LinkedInIcon className="footer_icon" style={{ fontSize: 50 }} />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/prateek.sahu.773/" className="header__link">
                                <InstagramIcon className="footer_icon" style={{ fontSize: 50 }} />
                            </a>
                        </li>
                        <li>
                            <a href="https://backend-plant.herokuapp.com/" className="header__link">
                                <DeveloperModeIcon className="footer_icon" style={{ fontSize: 50,fill:'blue' }} />
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="item">
                    <h2>Contact Us</h2>
                    <p>
                        <i class="fa fa-map-marker"></i> <b>B 16/31, Los Vegas, USA</b><br />
                        mail : abc@example.com<br />
                        phone : +91-XXXXXXXX36
                    </p>
                </div>
            </div>
            <div class="lower">
                <span>&copy; All rights are reserved, 2021</span>
            </div>
        </div>
    )
}

export default Footer
