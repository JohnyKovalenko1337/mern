import React, { useEffect, useState } from 'react';

import UserList from '../components/UserList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [data, setData] = useState();
    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try {

                const responce = await fetch('http://localhost:8000/user');

                const responceData = await responce.json();

                if (!responce.ok) {
                    throw new Error(responceData.message);
                }

                setData(responceData.users);
            }
            catch (err) {
                setError(err.message || 'An error has occurred');
            }
            setIsLoading(false);

        }
        sendRequest();
    }, []);

    const handelError = () => {
        setError(null);
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={handelError} /> {/* setting error from useState */}
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