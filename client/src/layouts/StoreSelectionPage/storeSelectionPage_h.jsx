import React, { useCallback, useEffect, useState } from 'react'
import StoreIcon from '../../components/storeIcon_c'
import Filter from '../../containers/Filter/filter_k'
import Logo from '../../images/logo.png'
import classes from './storeSelectionPage_h.module.css'

/**
 * Layout for the Store Selection page
 */

const stores = [
  {
    name: 'fairway',
    categories: ['Groceries', 'Produce', 'Organic'],
    img_url: 'fairway.png'
  },
  {
    name: 'CVS Pharmacy@',
    categories: ['Personal Care', 'Drugstore', 'Groceries'],
    img_url: 'cvs.png'
  },
  {
    name: 'HMart',
    categories: ['Specialty', 'Prepared Meals', 'Ethnic'],
    img_url: 'hmart.png'
  },
  {
    name: 'Petco',
    categories: ['Pet Supplies'],
    img_url: 'petco.png'
  },
  {
    name: 'ABC',
    categories: ['Groceries', 'Produce', 'Organic'],
    img_url: 'fairway.png'
  },
  {
    name: 'DEF',
    categories: ['Personal Care', 'Drugstore', 'Groceries'],
    img_url: 'cvs.png'
  }
]

const filters = ['All', 'Drugstore', 'Groceries', 'Pet Supplies', 'Meals']

const StoreSelect = props => {
  // console.log("Props: ", props);
  // console.log("Zipcode: ", props.location.state.zipcode);
  let temp = ''
  if (props.location && props.location.state && props.location.state.zipcode) {
    temp = props.location.state.zipcode
  }
  const [active, setActive] = useState('All')
  const [zipcode, setZipcode] = useState(temp)
  const [currStores, setCurrStores] = useState([])
  // const [currPage, setCurrPage] = useState(1);

  const data = { Zipcode: zipcode }
  const user = {}

  // useEffect(() => {
  //     setCurrPage(1);
  // }, [currStores]);

  useEffect(() => {
    if (temp === '') {
      // console.log("Temp is undefined");
      get_user()
    }
    get_stores(data)
  }, [data, get_stores, temp])

  useEffect(() => {
    get_stores(data)
  }, [data, get_stores])

  const get_user = () => {
    return fetch('/users/get_logged_in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
      // body: JSON.stringify(json_data)
    })
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response from server')
        }
        return response.json()
      })
      .then(respData => {
        const temp = JSON.parse(respData)
        // console.log("JSON.parse(respData) =", JSON.parse(respData));
        setZipcode(temp.Zipcode)
      })
      .catch(err => {
        console.log(err)
        return err
      })
  }

  const get_stores = useCallback(json_data => {
    return fetch('/store/get_store_with_property', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(json_data)
    })
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response from server')
        }
        return response.json()
      })
      .then(respData => {
        const temp = JSON.parse(respData)
        console.log('JSON.parse(respData) =', JSON.parse(respData))
        setCurrStores(currStores.splice(0, currStores.length, ...temp))
        // console.log("Data Recieved | Stores= ", currStores);
        // return JSON.parse(respData);
      })
      .catch(err => {
        console.log(err)
        return err
      })
  })

  const filteredStores = (stores, filter) => {
    // console.log("Testing filter, Stores: ", stores);
    return stores
      .filter(store =>
        filter === 'All' ? true : store.Categories.includes(filter)
      )
      .map(filtered_store => (
        <StoreIcon
          name={filtered_store.Name}
          // img_url={filtered_store.img_url}
          alt={filtered_store.name + ' icon'}
          categories={filtered_store.Categories} // categories needs to be added to work
          onClick={() => console.log('Store Icon clicked')}
          // onClick={handleSelection}
          key={filtered_store.name}
        />
      ))
  }

  const handleSelection = name => {
    // console.log(event);
    // props.history.push({
    // pathname: `/stores/${name}`
    // })
  }

  return (
    <div className={classes.background}>
      <div className={classes.logo_container}>
        <img src={Logo} alt='Ouluxx logo' height='45px' />
      </div>
      <div className={classes.zipcode_container}>
        Select Store for Delivery in&nbsp;
        <span style={{ fontWeight: 'bold' }}>{zipcode}</span>
      </div>
      <div className={classes.filter_container}>
        <Filter active={active} onChange={active => setActive(active)}>
          {filters.map(filter => {
            return <div key={filter}>{filter}</div>
          })}
        </Filter>
      </div>

      <div className={classes.recommend_container}>Recommend Stores</div>
      <div className={classes.stores_container}>
        {filteredStores(currStores, active)}
      </div>
    </div>
  )
}

export default StoreSelect
