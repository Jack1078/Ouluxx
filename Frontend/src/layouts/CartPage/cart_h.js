import React, { useState } from 'react';
import StoresNearbyContainer from '../../containers/StoresNearby/storesNearby_k';
import classes from './cart_h.module.css';
import Footer from '../../containers/footer_k';
import { Row, Col, Container, Button, Card, ButtonGroup } from 'react-bootstrap';
import NavBar from '../../containers/navBar_k';
import { FaMoneyCheck } from 'react-icons/fa';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@material-ui/core/';






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

function Cart() {
    const [quantity, setQuantity] = useState(0);
    function increase() {
        setQuantity(quantity + 1);
    }
    function decrease() {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }
    return (
        <>
            <NavBar />


            <section className={classes.background} style={{ marginBottom: "4%" }}>
                <Container>
                    <Row>
                        <Col sm={4}>
                            <div style={{ marginTop: "10%" }}>
                                <Card>
                                    <Card.Header>Shipping Details</Card.Header>
                                    <Card.Body >
                                        <ul style={{ listStyle: "none", textAlign: "left" }} >
                                            <li><p>Ship to: </p></li>
                                            <li><p>Shipping address: </p></li>
                                        </ul>
                                        <div> <p><a href="#">edit</a></p></div>
                                    </Card.Body>
                                </Card>

                                <hr></hr>
                            </div>
                            <div style={{ marginTop: "2%" }}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="spanning table">
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

                        {/************************************************List of Added Items in Cart************************************************************/}

                        <Col sm={8}>
                            <div style={{ paddingTop: "5%", paddingLeft: "0%", textAlign: "left" }}>
                                <Card>
                                    <Card.Body>
                                        <Row>
                                            <Col sm={2}>
                                                <div>
                                                    <img src={require(`../../images/stores/plant.jpeg`)} width="100" height="80"></img>
                                                </div>
                                            </Col>
                                            <Col sm={6}>
                                                <div>
                                                    <h5>ITEM</h5>
                                                    <p style={{ textAlign: "left" }}>Item Desc</p>
                                                    <Button size="sm" variant="outline-dark">Go to store</Button>
                                                </div>
                                            </Col>
                                            <Col sm={4}>
                                                <div> <Row>
                                                    <Col sm={4}>
                                                        <p><em>Qty.</em></p>
                                                    </Col>
                                                    <Col sm={2}>
                                                        <ButtonGroup>
                                                            <Button variant="outline-dark" size="sm" onClick={decrease}>-</Button>
                                                            <Button variant="outline-dark" size="sm">{quantity}</Button>
                                                            <Button variant="outline-dark" size="sm" onClick={increase}>+</Button>

                                                        </ButtonGroup>
                                                    </Col>
                                                </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    {/****************************************************************************************************************************/}

                </Container>

            </section>

            <section>
                <Footer />
            </section>
        </>
    );
}

export default Cart;