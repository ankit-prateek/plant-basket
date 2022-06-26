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

function createData(data) {

  const id = data._id
  const status = ['placed', 'packed', 'shipped', 'deliverd'][data.status];
  const mode = data.payment_mode;
  const name = data.user.name
  var temp=[]
  for(var i=0;i<data.products.length;i++){
    var s={};
    s['name']=data.products[i].name
    s['qty']=data.products[i].qty
    s['price']=data.products[i].price
    temp.push(s)
  }

  return {
    id,
    status,
    mode,
    name,
    history:temp
  };
}


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  function handleconfirm(e) {
    const id = e.target.name;
    if (e.target.value != 'delivered') {
      axios.post('/order/update', { id })
        .then(s => console.log(s))
    }
    else {
      console.log('done')
    }
    console.log(e.target.name, e.target.value)
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.id}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.mode}</TableCell>
        <TableCell align="right"><button name={row.id} value={row.status} onClick={handleconfirm}>confirm </button> </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Plant Name</TableCell>
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


export default function Sell({mysell}) {
  console.log(mysell)
  const [{ user }] = useStateValue();
  const [rows, setrows] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [s, sets] = React.useState()




  React.useEffect(() => {
    const getFilesList = async () => {
      try {
        var temp=[];
        for(var key in mysell){
          var a = createData(mysell[key])
          temp.push(a)
        }
        
        setrows(temp)



      } catch (error) {
        console.log(error)
      }
    };

    getFilesList();
  }, []);

  return (
  
    <TableContainer component={Paper}  style={{marginLeft:"19%"}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Customer Name</TableCell>
            <TableCell align="right">Order Id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
            <TableCell align="right">Status&nbsp;</TableCell>
            <TableCell align="right">Mode of Payment&nbsp;</TableCell>
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
