import React, { useState } from 'react';
import StoreIcon from '../../components/storeIcon_c';
import classes from './storeSelectionPage_h.module.css';
import Filter from '../../containers/Filter/filter_k';
import Logo from '../../images/logo.png';
/**
 * Layout for the Store Selection page
 */

const stores = [{
    name: "fairway",
    categories: ["Groceries", "Produce", "Organic"],
    img_url: "fairway.png"
},
{
    name: "CVS Pharmacy@",
    categories: ["Personal Care", "Drugstore", "Groceries"],
    img_url: "cvs.png"
},
{
    name: "HMart",
    categories: ["Specialty", "Prepared Meals", "Ethnic"],
    img_url: "hmart.png"
},
{
    name: "Petco",
    categories: ["Pet Supplies"],
    img_url: "petco.png"
},
{
    name: "ABC",
    categories: ["Groceries", "Produce", "Organic"],
    img_url: "fairway.png"
},
{
    name: "DEF",
    categories: ["Personal Care", "Drugstore", "Groceries"],
    img_url: "cvs.png"
},];

const filters = ["All", "Drugstore", "Groceries", "Pet Supplies", "Meals"];

const filteredStores = (stores, filter) => {
    return stores.filter(store => filter === "All" ? true : store.categories.includes(filter))
        .map(filtered_store => (
            <StoreIcon
                key={filtered_store.name}
                name={filtered_store.name}
                categories={filtered_store.categories}
                img_url={filtered_store.img_url}
                alt={filtered_store.name + " icon"}
                onClick={() => console.log('Store Icon clicked')} />
        ))
}

const StoreSelect = (props) => {
    console.log("Props: ", props);
    console.log("Zipcode: ", props.location.state.zipcode);
    var temp = '';
    if (props.location && props.location.state.zipcode)
        temp = props.location.state.zipcode;
    const [active, setActive] = useState('All');
    const [zipcode, setZipcode] = useState(temp);

    return (
        <div className={classes.background}>
            <div className={classes.logo_container}>
                <img src={Logo} alt='Ouluxx logo' height="45px" />
            </div>
            <div className={classes.zipcode_container}>
                Select Store for Delivery in&nbsp;<span style={{ fontWeight: 'bold' }}>{zipcode}</span>
            </div>
            <div className={classes.filter_container}>
                <Filter
                    active={active}
                    onChange={active => setActive(active)}
                >
                    {filters.map((filter) => {
                        return (
                            <div key={filter}>
                                {filter}
                            </div>
                        );
                    })}
                </Filter>
            </div>

            <div className={classes.recommend_container}>
                Recommend Stores
            </div>
            <div className={classes.stores_container}>
                {filteredStores(stores, active)}
            </div>
        </div>
    );

}

export default StoreSelect;