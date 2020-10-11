import React from 'react';
import SignUpContainer from '../../containers/SignUp/signUp_k';
import LoginContainer from '../../containers/Login/login_k';
import AboutContainer from '../../containers/About/about_k';
import StoresNearbyContainer from '../../containers/StoresNearby/storesNearby_k';
//import classes from './cart_h.module.css';
import Footer from '../../containers/footer_k';
import { Row, Col, Container, Button } from 'react-bootstrap';
import NavBar from '../../containers/navBar_k';
import { FaMoneyCheck } from 'react-icons/fa';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import FormControlLabel from '@material-ui/core/FormControlLabel';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const useStyles = makeStyles({
    table: {
        minWidth: 250,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

//**********************************************************************************/
function createRow(desc, qty, unit) {
    return { desc, qty, unit };
}


const rows2 = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
];

/**********************************************************************************************/
const button_theme = createMuiTheme({
    palette: {
        primary: { main: '#3b5998' },
        secondary: { main: '#4285F4' },
    }
})

function Cart() {
    const classes = useStyles();

    return (
        <>
            <NavBar />
            <section style={{ marginBottom: "4%" }}>
                <Container>
                    <Row>
                        <Col sm={8}>
                            <div style={{ paddingTop: "5%", paddingLeft: "4%" }}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions1-content"
                                        id="additional-actions1-header"
                                    >
                                        <FormControlLabel
                                            onClick={(event) => event.stopPropagation()}
                                            onFocus={(event) => event.stopPropagation()}
                                            control={<Checkbox />}
                                            label="Paperclips (Box)"
                                        />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography color="textSecondary">
                                            The click event of the nested action will propagate up and expand the accordion unless
                                            you explicitly stop it.
                                    </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions2-content"
                                        id="additional-actions2-header"
                                    >
                                        <FormControlLabel
                                            onClick={(event) => event.stopPropagation()}
                                            onFocus={(event) => event.stopPropagation()}
                                            control={<Checkbox />}
                                            label="Paper (Case)"
                                        />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography color="textSecondary">
                                            The focus event of the nested action will propagate up and also focus the accordion
                                            unless you explicitly stop it.
                                         </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions3-content"
                                        id="additional-actions3-header"
                                    >
                                        <FormControlLabel
                                            onClick={(event) => event.stopPropagation()}
                                            onFocus={(event) => event.stopPropagation()}
                                            control={<Checkbox />}
                                            label="Waste Basket"
                                        />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography color="textSecondary">
                                            If you forget to put an aria-label on the nested action, the label of the action will
                                            also be included in the label of the parent button that controls the accordion
                                            expansion.
                                         </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </Col>


                        <Col sm={4}>
                            <div style={{ marginTop: "10%" }}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="spanning table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" colSpan={3}>
                                                    Details
                                                 </TableCell>
                                                <TableCell align="right">Price</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Desc</TableCell>
                                                <TableCell align="right">Qty.</TableCell>
                                                <TableCell align="right">Unit</TableCell>
                                                <TableCell align="right">Sum</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows2.map((row) => (
                                                <TableRow key={row.desc}>
                                                    <TableCell>{row.desc}</TableCell>
                                                    <TableCell align="right">{row.qty}</TableCell>
                                                    <TableCell align="right">{row.unit}</TableCell>
                                                    <TableCell align="right">{row.price}</TableCell>
                                                </TableRow>
                                            ))}

                                            <TableRow>
                                                <TableCell rowSpan={3} />
                                                <TableCell colSpan={2}>Subtotal</TableCell>
                                                <TableCell align="right">$98.00</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Tax</TableCell>
                                                <TableCell align="right">$2.00</TableCell>
                                                <TableCell align="right">$98.00</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={2}>Total</TableCell>
                                                <TableCell align="right">$100.00</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <hr></hr>
                                <Button
                                    id="checkout_button"
                                    variant="outline-warning"
                                    size="lg"
                                    block
                                ><FaMoneyCheck />  check out</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </section>

            <section>
                <Footer />
            </section>
        </>
    );
}

export default Cart;