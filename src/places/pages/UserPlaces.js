import React from 'react';
import { useParams } from 'react-router-dom';

import PlacesList from '../components/PlacesList';
const Dummy_Items = [
      {
           id:'p1',
           title:'Louvre',
           imageUrl:'https://s.france24.com/media/display/ffb00d5c-5bcb-11ea-9b68-005056a98db9/w:1280/p:16x9/5ebdce7c4db36aa769d6edb94f5b288f18ac266c.webp',
           address:'Musée du Louvre, Cour Napoléon et Pyramide du Louvre, 75001 Paris',
           description:'One of the famoust museum',
           location:{
               lat:48.8613684,
               lng:2.3254948
           },
           creator:'u1',
       },
       {
           id:'p1',
           title:'Louvre',
           imageUrl:'https://s.france24.com/media/display/ffb00d5c-5bcb-11ea-9b68-005056a98db9/w:1280/p:16x9/5ebdce7c4db36aa769d6edb94f5b288f18ac266c.webp',
           address:'Musée du Louvre, Cour Napoléon et Pyramide du Louvre, 75001 Paris',
           description:'One of the famoust museum',
           location:{
               lat:48.8613684,
               lng:2.3254948
           },
           creator:'u2',
       }
]

const UserPlaces = (props) => {

    const userId = useParams().userId;
    const loadedPlaces = Dummy_Items.filter(place => place.creator === userId);
    return (
        <PlacesList
            items={loadedPlaces}
        />
    );
};

export default UserPlaces;