import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../util/validators';

import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';

const Dummy_Items = [
    {
        id: 'p1',
        title: 'Louvre',
        imageUrl: 'https://s.france24.com/media/display/ffb00d5c-5bcb-11ea-9b68-005056a98db9/w:1280/p:16x9/5ebdce7c4db36aa769d6edb94f5b288f18ac266c.webp',
        address: 'Musée du Louvre, Cour Napoléon et Pyramide du Louvre, 75001 Paris',
        description: 'One of the famoust museum',
        location: {
            lat: 48.8613684,
            lng: 2.3254948
        },
        creator: 'u1',
    },
    {
        id: 'p1',
        title: 'Louvre',
        imageUrl: 'https://s.france24.com/media/display/ffb00d5c-5bcb-11ea-9b68-005056a98db9/w:1280/p:16x9/5ebdce7c4db36aa769d6edb94f5b288f18ac266c.webp',
        address: 'Musée du Louvre, Cour Napoléon et Pyramide du Louvre, 75001 Paris',
        description: 'One of the famoust museum',
        location: {
            lat: 48.8613684,
            lng: 2.3254948
        },
        creator: 'u2',
    }
]

const UpdatePlace = () => {

    const [isLoading, setIsLoading] = useState(true)
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
        address: {
            value: '',
            isValid: false
        }
    }, false);

    const indentifedPlace = Dummy_Items.find(p => p.id === placeId);

    useEffect(() => {
        if (indentifedPlace) {
            setFormData({
                title: {
                    value: indentifedPlace.title,
                    isValid: true
                },
                description: {
                    value: indentifedPlace.description,
                    isValid: true
                },
                address: {
                    value: indentifedPlace.address,
                    isValid: true
                }
            }, true);
        }
        setIsLoading(false);
    }, [setFormData, indentifedPlace])


    const placeUpdateSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    };


    if (!indentifedPlace) {
        return (
            <div className="center">
                <Card>
                    <h2>No places id found</h2>
                </Card>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="center">
                <Card>
                    <h2>No places id found</h2>
                </Card>
            </div>
        )
    }

    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="plz enter a valid title"
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                errorText="plz enter a valid description(at list 5 characters)"
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />
            <Input
                id="address"
                element="input"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="plz enter a valid Address"
                onInput={inputHandler}
                initialValue={formState.inputs.address.value}
                initialValid={formState.inputs.address.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
                Update Place
            </Button>
        </form>

    )

};

export default UpdatePlace;