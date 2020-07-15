import React, { useReducer, useEffect } from 'react';

import './Input.css';
import { validate } from '../../../util/validators';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),

            };
        case 'TOUCH':
            return {
                ...state,
                value: action.val,
                isTouched: true
            };
        default:
            return state;
    }
};


const Input = (props) => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: '',
        isTouched: false,
        isValid: false
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        props.onInput(id, value, isValid)
    },
        [id, onInput, value, isValid])

    const changeHandler = (event) => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    }

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        })
    }

    const element = props.element === 'input' ?
        (<input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            value={inputState.value}
            onBlur={touchHandler}
        />) :
        (<textarea
            onChange={changeHandler}
            id={props.id}
            rows={props.rows || 3}
            value={inputState.value}
            onBlur={touchHandler}
        />)
    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>     {/* HTMLFOR = USUAL FOR*/}
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div >
    )
};

export default Input;