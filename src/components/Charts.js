import React from 'react';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import { Pie, Line, Bar } from 'react-chartjs-2';
import axios from '../axios';
import plantlogo from './Shop/plant.png'
import { useStateValue } from './StateProvider';
import PieChartIcon from '@material-ui/icons/PieChart';
import './Charts.css'
function check(a, b) {
    const data = {
        labels: a,
        datasets: [
            {
                label: '# of Votes',
                data: b,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,

            },
        ],
    };
    return data
}
function clone(a, b, c) {
    const data = {
        labels: a,

        datasets: [
            {
                label: c,
                data: b,
                backgroundColor: 'rgba(255, 99, 132,.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },

        ],
    };
    return data
}
function Charts({ myplant, myorder }) {
    const [{ user }] = useStateValue();
    const [c1, setc] = React.useState([]);
    const [c2, setc2] = React.useState([]);
    const [c3, setc3] = React.useState([]);
    React.useEffect(() => {
        const getFilesList = async () => {
            try {
                var datechart = {}, datechart2 = {};
                var chart = { "Conifer Plants": 0, "Flowering Plants": 0, "Bonsai Plants": 0, "Cactus Plants": 0, "Money Plants": 0, "Air Plants": 0, "Plants": 0 };
                const bas = user.sell;
                const pro = user.products;
                for (var key in myplant) {
                    const date = myplant[key].date[0]
                    if (datechart2[date]) {
                        datechart2[date] += 1
                    }
                    else {
                        datechart2[date] = 1
                    }

                }
                var a = [];
                var b = [];
                for (var i = 1; i <= 31; i++) {
                    if (!datechart2[i]) {
                        a.push(i)
                        b.push(0)
                    }
                    else {
                        a.push(i)
                        b.push(datechart2[i])
                    }
                }
                z = clone(a, b, "No of Products Upload")
                setc3(z)
                for (var key in myorder) {
                    const data = myorder[key].products
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].category == "") {
                            chart["Plants"] += data[i].qty
                        }
                        else {
                            chart[data[i].category] += data[i].qty
                        }
                    const date = myorder[key].date[0]
                    if (datechart[date]) {
                        datechart[date] += data[i].qty
                    }
                    else {
                        datechart[date] =data[i].qty
                    }
                }

                }
                var a = [], b = [];
                for (var key in chart) {
                    a.push(key)
                    b.push(chart[key])
                }
                var z = check(a, b)
                setc(z)
                a = [];
                b = [];
                for (var i = 1; i <= 31; i++) {
                    if (!datechart[i]) {
                        a.push(i)
                        b.push(0)
                    }
                    else {
                        a.push(i)
                        b.push(datechart[i])
                    }
                }
                z = clone(a, b, "No of products Sold")
                setc2(z)








            } catch (error) {
                console.log(error);
            }
        };

        getFilesList();
    }, []);
    const options = {
        maintainAspectRatio: false,
        responsive: false,


    }
    return (
        <div className="chart">
            <div className="chartcol1">
                <div className="chartcard">
                    <div className="charticon" style={{ backgroundColor: "rgba(1, 159, 143, 0.863)" }}><AccountBalanceWalletOutlinedIcon style={{ fontSize: 40, marginLeft: 5, marginTop: 8 }} /></div>
                    <div style={{ fontSize: 30, marginLeft: 110, marginTop: -28, marginBottom:10 }}>
                    <span >Revenue</span>
                    <br />
                    <span >&#8377;25220</span>
                    </div>
                    <hr  style={{marginTop:-3}}/>
                    <span >*only delivered</span>
                </div>
                <div className="iconxy">
                    <div className="charticon"><PieChartIcon style={{ fontSize: 40, marginLeft: 5, marginTop: 8 }} /></div>
                    <div className="catchart">
                        <Pie data={c1} />
                    </div>
                </div>
                <div className="chartcard">
                    <div className="charticon"><img src={plantlogo} style={{ width: 40, marginLeft: 5, marginTop: 8 }} /></div>
                    <span style={{ fontSize: 30, marginLeft: 5, marginTop: 8 }}>Total plants</span>
                    <span style={{ fontSize: 30, marginLeft: 5, marginTop: 8 }}>25</span>
                    <hr />
                    <span>23 Equipments </span>
                </div>
            </div>
            <div className="col2">
                <div className="parentchart">
                    <div className="datechart">
                        <Line data={c2}
                            width={400}
                            options={options}
                        />
                    </div>
                    <div className="aftercard">
                        <span>Total Sales</span>
                    </div>
                </div>
                <div className="parentchart">
                    <div className="uploadchart">
                        <Bar data={c3}
                            width={400}
                            options={options} />
                    </div>
                    <div className="aftercard">
                        <span>Total No of Plants Uploaded </span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Charts
