import React from 'react'; // useReducer for multiple states

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';


const Places = () => {
    const [formState, InputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            },
            address: {
                value: '',
                isValid: false,
            }

        },
        false
    )


    const placeSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);          //send it to backend
    };

    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
            <Input
                element='input'
                type="text"
                label="Title"
                id="title"
                errorText="plz enter a valid title"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={InputHandler}
            />
            <Input
                element='textarea'
                label="Description"
                id="description"
                errorText="plz enter a valid description,(min 5 elements)"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                onInput={InputHandler}
            />
            <Input
                element='input'
                label="Address"
                id="address"
                errorText="plz enter a valid address"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={InputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>Add place</Button>
        </form>
    )
};
export default Places;