import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css';

const Places = ()=>{
    return (
        <form className="place-form">
            <Input element={'input'} type="text" label="Title" errorText="plz enter a valid title" /> {/*validators={[]}  onChange={}*/ }
        </form>
        )
};
export default Places;