import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../util/validators';
import Button from '../../shared/components/FormElements/Button';
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
    const placeId = useParams().placeId;

    const indentifedPlace = Dummy_Items.find(p => p.id === placeId);

    if (!indentifedPlace) {
        return (
            <div className="center">
                <h2>No places id found</h2>
            </div>
        )
    }

    return (
        <form>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="plz enter a valid title"
                onInput={() => { }}
                value={indentifedPlace.title}
                valid={true}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                errorText="plz enter a valid description(at list 5 characters)"
                onInput={() => { }}
                value={indentifedPlace.description}
                valid={true}
            />
            <Input
                id="address"
                element="input"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="plz enter a valid Address"
                onInput={() => { }}
                value={indentifedPlace.address}
                valid={true}
            />
            <Button type="submit" disabled={true}>
                Update Place
            </Button>
        </form>
    )
};

export default UpdatePlace;