import React, { useCallback, useReducer } from 'react'; // useReducer for multiple states

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../util/validators';
import './PlaceForm.css';

const formReducer = (state, action) => {
    switch (action.type) {

        case 'INPUT_CHANGE':

            let formIsValid = true;

            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) {
                    continue;
                }
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: formIsValid
            }
        default:
            return state;
    }
}

const Places = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            }
        },
        isValid: false

    })

    const InputHandler = useCallback((id, value, isValid) => {
        dispatch({ type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id })
    }, []);

    const placeSubmitHandler = (event)=>{
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