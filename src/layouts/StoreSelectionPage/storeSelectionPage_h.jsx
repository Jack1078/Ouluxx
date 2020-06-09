import React, {useState} from 'react';
import StoreIcon from '../../components/storeIcon_c';
import classes from './storeSelectionPage_h.module.css';
import Filter from '../../containers/Filter/filter_k';
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

const filters = ["All","Drugstore","Groceries","Pet Supplies", "Meals"];

const filteredStores = (stores, filter) => {
    return stores.filter(store => filter==="All"?true:store.categories.includes(filter))
    .map(filtered_store => (
        <StoreIcon
        key={filtered_store.name}
        name={filtered_store.name}
        categories={filtered_store.categories}
        img_url={filtered_store.img_url}
        alt={filtered_store.name+" icon"}
        onClick={()=>console.log('Store Icon clicked')}/>   
    ))
}

function StoreSelect() {
    const [active, setActive] = useState('All');
    return (
       <div>
            <Filter
                active={active}
                onChange={active=>setActive(active)}
            >
                {filters.map((filter)=>{
                    return(
                        <div key={filter}>
                            {filter}
                        </div>
                    );
                })}
            </Filter>
            <div className={classes.container}>
                {filteredStores(stores, active)}
            </div>
       </div>
    );

}

export default StoreSelect;