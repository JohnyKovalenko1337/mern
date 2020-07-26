import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../util/validators';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceForm.css';


const UpdatePlace = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, setRequest, handleError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState()
    const placeId = useParams().placeId;


    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
    }, false);


    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const indentifedPlace = await setRequest(
                    process.env.REACT_APP_BACKEND_API + `places/${placeId}`
                );
                setLoadedPlace(indentifedPlace.place);
                setFormData({
                    title: {
                        value: indentifedPlace.place.title,
                        isValid: true
                    },
                    description: {
                        value: indentifedPlace.place.description,
                        isValid: true
                    },
                }, true);
            }
            catch (err) { };
        };

        fetchPlaces();
    },
        [setRequest, setFormData, placeId]
    );

    const history = useHistory();

    const placeUpdateSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            await setRequest(
                process.env.REACT_APP_BACKEND_API + `places/${placeId}`,
                'PATCH',
                {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + auth.token

                },
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                }));
            history.push('/' + auth.userId + '/places');
        }
        catch (err) {

        }
    };


    if (isLoading) {
        return (
            <div className="center">
                <Card>
                    <LoadSpinner />
                </Card>
            </div>
        )
    }

    if (!loadedPlace && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>No places id found</h2>
                </Card>
            </div>
        )
    }



    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={handleError} />

            {!isLoading && loadedPlace && <form className="place-form" onSubmit={placeUpdateSubmitHandler}>

                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="plz enter a valid title"
                    onInput={inputHandler}
                    initialValue={loadedPlace.title}
                    initialValid={true}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                    errorText="plz enter a valid description(at list 5 characters)"
                    onInput={inputHandler}
                    initialValue={loadedPlace.description}
                    initialValid={true}
                />

                <Button type="submit" disabled={!formState.isValid}>
                    Update Place
            </Button>
            </form>}
        </React.Fragment>

    )

};

export default UpdatePlace;