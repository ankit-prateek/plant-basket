import React from 'react';
import cover from './Shop/cover.jpg'
import nursery from './Shop/nursery.jpg';
import './User.css'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import canna from './Shop/canna.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    
    width: "100%",
    height: 400,
  },
}));

function User() {
  const classes = useStyles();
  const [index, setindex] = React.useState(0);
  function handler(e) {
    setindex(e.target.name)
  }
  const tileData=[
    {img:canna,cols:1.3,rows:2},
    {img:canna,cols:1.7},
    {img:canna,cols:1.7},
    {img:canna},
    {img:canna},
    {img:canna},
    {img:canna},
    {img:canna},
    {img:canna},
    {img:canna},
  ]

  return (
    <div className="user_cover">
      <div className="logo_con">
        <img src={nursery} className="nursery_logo"></img>
        <div className="name_con">
          <img src={cover} className="cover"></img>
          <button name={0} onClick={handler}>Profile</button>
          <button name={1} onClick={handler}>Pictures</button>
          <button name={2} onClick={handler}>About</button>
        </div>
      </div>
      <div className="content">
        {index == 0 ? (
          <div className="wrapinfo">
            <div className="user_info">
              <h5><strong> Nursery Name : </strong> Khushboo Bagh Nursery</h5>
              <h5><strong> Locality : </strong> 86/203 raipurwa</h5>
              <h5><strong> City : </strong> Kanpur</h5>
              <h5><strong> Timings : </strong> 7:00 AM ::: 6:00 Pm</h5>
              <h5><strong> No of products : </strong> 156</h5>
              <h5><strong> Review : </strong> 5</h5>
            </div>
            <div className="user_info">
              <h4>Specialities</h4>
              <ul >
                <li>Bonsai plants</li>
                <li>Spiritual Plant</li>
                <li>Bio Fertilizer</li>
                <li>Garden Tools</li>
                <li>Pots and Pebbles</li>
                <li>Self Watering Pots</li>
              </ul>
            </div>

          </div>) : (index == 1 ? ( <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols || 1} rows={tile.rows || 1}>
            <img src={tile.img} alt={tile.title}  />
          </GridListTile>
        ))}
      </GridList>
    </div>) : <div>
      <h5>
        About
      </h5>
      <p>
      The best nursery I have seen in my life. I got to see all of variety of plants over here Whatever you want you will get here no matter what plant you want. The staff is very much supporting here they gave you proper guidance and serve you best plants doesn't matter if you don't know much about plants
      </p>
      
      <button className="dashbutton">Book an appointment</button>
    </div>)}

      </div>



    </div>
  )
}

export default User
