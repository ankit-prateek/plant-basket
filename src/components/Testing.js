import React from 'react'
import {
    HashRouter as Router,
    Switch,
    Route,
    NavLink,
    useParams,
    useRouteMatch
} from "react-router-dom";


const Changepassword = () => {
    const params = useParams()
    console.log("params", params);
    return (
        <div className="container p-5">
            <h3>Change Password</h3>
            <div className="row">
                <div className="col-6 my-3">
                    <form action="">
                        <div className="mb-3">
                            <label htmlFor="currentPassword" className="form-label">Current Password</label>
                            <input type="password" className="form-control" id="currentPassword" placeholder="enter current password" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">New Password</label>
                            <input type="password" className="form-control" id="newPassword" placeholder="enter new password" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword" placeholder="enter confirm password" />
                        </div>
                        <button className="btn btn-success my-2 px-4">Save Change</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const Profileinfo = () => {
    return (
        <div className="container p-5">
            <h3>Profile Information</h3>
            <form action="" className="row my-3">
                <div className="mb-3 col-6">
                    <label htmlFor="" className="form-label">First Name</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="" className="form-label">Last Name</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="" className="form-label">D.O.B</label>
                    <input type="date" className="form-control" />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="" className="form-label">Gender</label>
                    <select name="" id="" className="form-select">
                        <option value="Male" selected>Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="" className="form-label">Email Address</label>
                    <input type="email" className="form-control" />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="" className="form-label">Phone No.</label>
                    <input type="tel" className="form-control" />
                </div>
                <div className="mt-3 col-4">
                    <button type="submit" className="btn btn-success px-5">Save Changes</button>
                </div>
            </form>
        </div>
    )
}

const Manageaddress = () => {
    return (
        <div className="container p-5">
            <h3>Manage Address</h3>
            <form action="" className="row my-3">
                <div className="mb-3 col-6">
                    <label htmlFor="" className="form-label">Full Name</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="" className="form-label">Phone No.</label>
                    <input type="tel" className="form-control" />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="" className="form-label">Country</label>
                    <select name="" id="" className="form-select">
                        <option value="Male" selected>Select</option>
                        <option value="Female">A</option>
                        <option value="Other">B</option>
                    </select>
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="" className="form-label">State</label>
                    <select name="" id="" className="form-select">
                        <option value="Male" selected>Select</option>
                        <option value="Female">A</option>
                        <option value="Other">B</option>
                    </select>
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="" className="form-label">City</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="" className="form-label">Zip/Pin</label>
                    <input type="number" className="form-control" />
                </div>
                <div className="mb-3 col-12">
                    <lable className="form-label">Address</lable>
                    <textarea className="form-control" rows="3" />
                </div>
                <div className="mt-3 col-4">
                    <button type="submit" className="btn btn-success px-5">Save Changes</button>
                </div>
            </form>
        </div>
    )
}

const Profile = () => {
    let { path, url } = useRouteMatch();
    return (
        <div className="container">
            <nav aria-label="breadcrumb" className="" style={{ "--bs-breadcrumb-divider": "'>'" }}>
                <ol className="breadcrumb my-3">
                    <li className="breadcrumb-item"><a href="#"><i className="fa fa-home"></i></a></li>
                    <li className="breadcrumb-item active" aria-current="page">Profile</li>
                </ol>
            </nav>
            <div className="row">
                <div className="col-4 sidemenu">
                    <div className="container">
                        <div className="container d-flex align-items-center my-3 shadow-sm">
                            <img src="https://images.pexels.com/photos/9107465/pexels-photo-9107465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" className="mx-3 avatar" />
                            <div className="d-flex flex-column my-3">
                                <span className="text-muted">Hello</span>
                                <span className="text-dark">Rahul Kardam</span>
                            </div>
                        </div>
                        <div className="container shadow">
                            <div className="row">
                                <div className="col-2 pt-2">
                                    <i className="fa fa-address-card"></i>
                                </div>
                                <div className="col-10 flex-column">
                                    <NavLink to={`${url}/manage-account`} className="nav-link">Manage Account</NavLink>
                                    <NavLink to={`${url}/profile-info`} className="nav-link">Profile Information</NavLink>
                                    <NavLink to={`${url}/manage-address`} className="nav-link">Manage Address</NavLink>
                                    <NavLink to={`${url}/change-password`} className="nav-link">Change Password</NavLink>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-2 pt-2">
                                    <i className="fa fa-gift"></i>
                                </div>
                                <div className="col-10 flex-column">
                                    <a href="#" className="nav-link">My Orders</a>
                                    <a href="#" className="nav-link">My Cancellations</a>
                                    <a href="#" className="nav-link">My Reviews</a>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-2 pt-2">
                                    <i className="fa fa-credit-card"></i>
                                </div>
                                <div className="col-10 flex-column">
                                    <a href="#" className="nav-link">My Payments</a>
                                    <a href="#" className="nav-link">My Offers</a>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-2 pt-2 mb-3">
                                    <i className="fa fa-sign-out"></i>
                                </div>
                                <div className="col-10 flex-column">
                                    <a href="#" className="nav-link">Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8 mx-auto shadow">
                    <Switch>
                        <Route exact path={path}>
                            <Changepassword/>
                        </Route>
                        <Route path={`${path}/change-password`}>
                            <Changepassword/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Profile;