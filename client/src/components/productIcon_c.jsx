import React, {useState} from 'react';
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  ButtonGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import MiniCart from '../containers/miniCart_k';

/**
 * Product Icons in the Store page
 * @param {name, categories, onClick, img_url, alt, rating, price} ProductIcon
 */

const useStyles = makeStyles(() => ({
  container: {
    width: '140px',
    height: '198px',
    cursor: 'pointer',
    padding: '20px',
    backgroundColor: '#fff',
    fontFamily: 'Neusa Next Std',
  },
  img: {
    height: '133px',
  },
  img_pop: {
    width: '300px',
    height: '300px',
  },
  name: {
    display: 'block',
    color: '#515C6F',
    fontSize: '15px',
    marginTop: '13px',
    fontWeight: 'lighter',
  },
  name_pop: {
    fontSize: '25px',
  },
  price: {
    display: 'inline-block',
    float: 'left',
    marginTop: '10px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  price_pop: {
    fontSize: '20px',
  },
  rating_container: {
    display: 'inline-block',
    float: 'right',
    marginTop: '10px',
    backgroundColor: '#FF6969',
    width: '33px',
    height: '16px',
    borderRadius: '10px',
    verticalAlign: 'middle',
    lineHeight: '12px',
  },
  rating_text: {
    fontSize: '9px',
    color: '#fff',
    fontWeight: 'bold',
  },
  rating_text_pop: {
    fontSize: '25px',
    marginLeft: '10px',
    color: 'gold',
  },
  quantityItem: {
    width: '40px',
    fontSize: '25px',
  },
  favorite: {
    fontSize: '15px',
    color: '#000',
  },
}));

const items = [];

const ProductIcon = (props) => {
  const classes = useStyles();
  const {
    name,
    categories,
    img_url,
    alt,
    onClick,
    rating,
    price,
    ...other
  } = props;

  // popup states
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [quantity, setQuantity] = useState(0);
  function increase() {
    setQuantity(quantity + 1);
    item.itemQuantity = quantity;
  }
  function decrease() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      item.itemQuantity = quantity;
    }
  }

  // when "add to cart" clicked, it will get the current object and check for the object in the database (by id) and will grab the info in
  // modal and add to the list in cart after validation

  // create an object
  const item = {
    itemImage: img_url,
    itemName: name,
    itemQuantity: quantity,
    itemPrice: '$' + price.toFixed(2),
    orderNumber: Math.floor(Math.random()),
  };

  function addToCart() {
    items.push(item);
  }

  return (
    <>
      <div className={classes.container} onClick={handleShow} {...other}>
        {/* <img className={classes.img} src={require(`../images/${img_url}`)} alt={alt}></img> */}
        <span className={classes.name}>{name}</span>
        <span className={classes.price}>${price.toFixed(2)}</span>
        <div className={classes.rating_container}>
          <span className={classes.rating_text}>&#9733;{rating}</span>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        size='lg'
        dialogClassName='modal-90w'
        aria-labelledby='example-custom-modal-styling-title'
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <form action='/users/add_to_cart' method='POST'>
            <Container fluid>
              <Row>
                <Col xs={6}>
                  <Row className='justify-content-md-center'>
                    <div>
                      {/* <img className={classes.img_pop} src={require(`../images/${img_url}`)} alt={alt}></img> */}
                    </div>
                    <ButtonGroup>
                      <Button variant='light'>S</Button>
                      <Button variant='light'>M</Button>
                      <Button variant='light'>L</Button>
                    </ButtonGroup>
                  </Row>
                </Col>
                <Col xs={6}>
                  <div className={classes.display_details}>
                    <Row>
                      <span className={classes.name_pop} name='ItemName'>
                        <strong>{name}</strong>
                      </span>
                      <span className={classes.rating_text_pop}>
                        &#9733;{rating}
                      </span>
                    </Row>

                    <Row>
                      <span className={classes.price_pop}>
                        ${price.toFixed(2)}
                      </span>
                    </Row>
                    <br></br>
                    <Row>Quantity</Row>
                    <Row>
                      <ButtonGroup>
                        <Button variant='secondary' onClick={decrease}>
                          -
                        </Button>
                        <Button variant='light'>{quantity}</Button>
                        <Button variant='secondary' onClick={increase}>
                          +
                        </Button>
                      </ButtonGroup>

                      <Col xs={6}>
                        <Button variant='light'>
                          <span className={classes.favorite}>&#x2764;</span>{' '}
                          Favorite
                        </Button>
                      </Col>
                    </Row>

                    <br></br>
                    <Row>
                      <h6>Details</h6>
                      <div name='Description'>
                        {' '}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Diam volutpat commodo sed egestas egestas
                        fringilla phasellus. Imperdiet nulla malesuada
                        pellentesque elit eget. Diam quam nulla porttitor massa
                        id neque aliquam vestibulum morbi. Diam sollicitudin
                        tempor id eu nisl nunc. Fringilla urna porttitor rhoncus
                        dolor purus non enim praesent. Tincidunt dui ut ornare
                        lectus sit amet est placerat. Integer vitae justo eget
                        magna. Risus ultricies tristique nulla aliquet enim
                        llamcorper velit sed ullamcorper morbi tincidunt ornare
                        massa eget.
                      </div>
                    </Row>
                    <Row></Row>
                    <br></br>
                    <Row>
                      <Button variant='warning' type='submit'>
                        + Add to cart
                      </Button>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <p>
            Product information or packaging displayed may not be current or
            complete. Always refer to the physical product for the most accurate
            information and warnings. For additional information, contact the
            retailer or manufacturer. *Actual weight may vary based on
            seasonality and other factors. Estimated price is approximate and
            provided only for reference.
          </p>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ProductIcon.propTypes = {
  name: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  img_url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};

export default ProductIcon;
export {items};
