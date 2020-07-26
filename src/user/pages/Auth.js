import React, { useState, useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './Auth.css';



const Auth = (props) => {

    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, setRequest, handleError } = useHttpClient();
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

    const authSubmitHandler = async (event) => {

        event.preventDefault();

        if (isLoginMode) {
            try {

                const responseData = await setRequest(process.env.REACT_APP_BACKEND_API + 'user/login',
                    'POST',
                    {
                        'Content-Type': 'application/json'
                    },
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                );

                auth.login(responseData.userId, responseData.token);            // updating context 
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            try {
                const formData = new FormData();
                formData.append('email',formState.inputs.email.value);
                formData.append('name',formState.inputs.name.value);
                formData.append('password', formState.inputs.password.value);
                formData.append('image',formState.inputs.image.value)
                const responseData = await setRequest(process.env.REACT_APP_BACKEND_API + 'user/signup',
                    'POST',
                    {},
                    formData
                );

                auth.login(responseData.userId, responseData.token);            // updating context 

            }
            catch (err) {
                console.log(err);
            }
        }
    };

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                    image: undefined
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
                    },
                    image:{
                        value:null,
                        isValid: false
                    }
                },
                false
            );
        }
        setIsLoginMode(prevMode => !prevMode);
    };


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={handleError} /> {/* setting error from useState */}
            <Card className="authentication">
                {isLoading && <LoadSpinner asOverlay />}
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
                    {!isLoginMode && (
                        <ImageUpload center onInput={InputHandler} errorText="Please provide an image" id="image"/>
                        )
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
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="Please enter valid password(minimum 6 characters)"
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
        </React.Fragment>

    )
};

export default Auth; 