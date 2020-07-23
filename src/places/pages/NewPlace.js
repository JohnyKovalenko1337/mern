import React, { useContext } from 'react'; // useReducer for multiple states
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './PlaceForm.css';


const Places = () => {
    const { isLoading, error, setRequest, handleError } = useHttpClient();
    const auth = useContext(AuthContext);


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
    const history = useHistory();


    const placeSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            await setRequest(
                'http://localhost:8000/places/create',
                'POST',
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    address: formState.inputs.address.value,
                    creator: auth.userId
                }));
                history.push('/');
        }
        catch (err) {

        }
    };

    return (
        <React.Fragment>

            <ErrorModal error={error} onClear={handleError} /> {/* setting error from useState */}
            <form className="place-form" onSubmit={placeSubmitHandler}>
                {isLoading && <LoadSpinner asOverlay />}
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
        </React.Fragment>

    )
};
export default Places;