import React, { useEffect, useState } from 'react';

import UserList from '../components/UserList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';


const Users = () => {
    const { isLoading, error, setRequest, handleError} = useHttpClient();
    const [data, setData] = useState();
    useEffect(() => {
        const sendRequest = async () => {
            try {

                const responceData = await setRequest('http://localhost:8000/user');

                setData(responceData.users);
            }
            catch (err) {
            }
        }
        sendRequest();
    }, [ setRequest]);


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={handleError} /> {/* setting error from useState */}
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay />
                </div>)
            }

            {!isLoading && data && <UserList items={data} />}

        </React.Fragment>

    );
};
export default Users;