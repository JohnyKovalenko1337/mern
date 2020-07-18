import React, { useState, useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';

import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';



const Auth = (props) => {

    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, InputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false,
        },
        password: {
            value: '',
            isValid: false,
        }
    },
        false);

    const authSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);          //send it to backend
        auth.login()            // updating context 
    };

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        }
        else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    }
                },
                false
            );
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    return (
        <Card className="authentication">
            <h2>{isLoginMode ? 'LOGIN Required' : 'SIGNUP Required'}</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode && (
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name"
                        onInput={InputHandler}
                    />)
                }
                <Input
                    id='email'
                    element="input"
                    type="email"
                    label="E-mail"
                    validators={[VALIDATOR_EMAIL]}
                    errorText="Please enter valid email"
                    onInput={InputHandler}
                />
                <Input
                    id='password'
                    element="input"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter valid password(minimum 5 characters)"
                    onInput={InputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler} >
                {!isLoginMode ? 'Switch to LOGIN' : 'Switch to SIGNUP'}
            </Button>

        </Card>
    )
};

export default Auth; 