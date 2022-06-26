import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useStateValue } from './StateProvider';
import axios from '../axios';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, current, sell, review, price,mysell) {
  var ans=[];
  for (var i=0;i<mysell.length;i++){
    var x=mysell[i].date;
    var z=x.indexOf('T')
    var date =x.slice(0,z);

    var a={"date":date,"qty":mysell[i].qty,"name":mysell[i].name,"price":price*mysell[i].qty}
    ans.push(a)

  }
  console.log(ans)
  return {
    name,
    current,
    sell,
    review,
    price,
    history: ans,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root} >
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.current}</TableCell>
        <TableCell align="right">{row.sell}</TableCell>
        <TableCell align="right">{row.review}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Sell History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total price </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.name}</TableCell>
                      <TableCell align="right">{historyRow.qty}</TableCell>
                      <TableCell align="right">
                        {historyRow.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}





export default function CollapsibleTable({plant,sell,order}) {
  const [rows, setrows] = React.useState([]);
  React.useEffect(() => {
      const getFilesList = async () => {
          try {
              var ans = [];
              for (var key in plant) {
                  ans.push(createData(plant[key].name, 159, 6.0, 24, plant[key].price,plant[key].sell));
              }
              setrows(ans);
          } catch (error) {
              console.log(error)
          }
      };

      getFilesList();
  }, []);
 
  return (
    <TableContainer component={Paper} style={{marginLeft:"19%"}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Plant Name</TableCell>
            <TableCell align="right">Current stock</TableCell>
            <TableCell align="right">Total sell&nbsp;</TableCell>
            <TableCell align="right">Review&nbsp;</TableCell>
            <TableCell align="right">Price&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
