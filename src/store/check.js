import React from 'react';


const chkContext = React.createContext({
    items:[],
    totalAmount:0,
    addItem: ()=>{},
    removeItem: ()=>{}
});

export default chkContext;