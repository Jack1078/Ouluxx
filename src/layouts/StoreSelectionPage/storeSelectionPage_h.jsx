import React from 'react';
import StoreIcon from '../../components/storeIcon_c';
import classes from './storeSelectionPage_h.module.css';
/**
 * Layout for the Store Selection page
 */

const stores = [{name: "fairway",
            categories: ["Groceries","Produce","Organic"],
            img_url: "fairway.png"},
            {name: "CVS Pharmacy@",
            categories: ["Personal Care","Drugstore","Groceries"],
            img_url: "cvs.png"},
            {name: "HMart",
            categories: ["Specialty","Prepared Meals","Ethnic"],
            img_url: "hmart.png"},
            {name: "Petco",
            categories: ["Pet Supplies"],
            img_url: "petco.png"},
            {name: "ABC",
            categories: ["Groceries","Produce","Organic"],
            img_url: "fairway.png"},
            {name: "DEF",
            categories: ["Personal Care","Drugstore","Groceries"],
            img_url: "cvs.png"},];

const filteredStores = (filter) => {
    return stores.filter(store => containsAll(filter,store.categories)).map(filtered_store => (
        <StoreIcon
        key={filtered_store.name}
        name={filtered_store.name}
        categories={filtered_store.categories}
        img_url={filtered_store.img_url}
        alt={filtered_store.name+" icon"}
        onClick={()=>console.log('Store Icon clicked')}/>   
    ))
}

function containsAll(needles, haystack){ 
    for(var i = 0; i < needles.length; i++){
        if(!haystack.includes(needles[i])) return false
    }
    return true;
}

function StoreSelect() {
    return (
        <div className={classes.container}>
            {filteredStores([])}
        </div>
    );
}

export default StoreSelect;