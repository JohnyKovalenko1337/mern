import React, { useCallback } from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../util/validators';
import './NewPlace.css';

const Places = () => {

    const titleInputHandler = useCallback((id, value, isValid) =>{

    }, [
        
    ]);

    const descriptionInputHandler = useCallback((id, value, isValid) =>{

    }, [
        
    ]);

    return (
        <form className="place-form">
            <Input
                element={'input'}
                type="text"
                label="Title"
                id="title"
                errorText="plz enter a valid title"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={titleInputHandler}
            /> 
            <Input
                element={'textarea'}
                label="Description"
                id="description"
                errorText="plz enter a valid description,(min 5 elements)"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                onInput={descriptionInputHandler}
            /> 
        </form>
    )
};
export default Places;