import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import PlacesList from '../components/PlacesList';


const UserPlaces = (props) => {


    const { isLoading, error, setRequest, handleError } = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();

    const userId = useParams().userId;



    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responceData = await setRequest(process.env.REACT_APP_BACKEND_API + `places/user/${userId}`);
                setLoadedPlaces(responceData.place)

            }
            catch (err) { }

        }
        fetchPlace()
    }, [setRequest, userId]);

    const placeDeletedHandler = deletedPlaceId => {
        setLoadedPlaces(prevPlaces =>
            prevPlaces.filter(place => place.id !== deletedPlaceId)
        );
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={handleError} /> {/* setting error from useState */}
            {isLoading &&
                <div className="center">
                    <LoadSpinner  />
                </div>
            }
            {!isLoading && loadedPlaces && (
                <PlacesList onDeletePlace={placeDeletedHandler} items={loadedPlaces} />
            )}
        </React.Fragment>

    );
};

export default UserPlaces;