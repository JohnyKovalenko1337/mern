import React from 'react';

import UserList from '../components/UserList';

const Users = () => {
    const USERS = [
        {
            id:'u1',
            name:'Elle',
            image:'https://i.pinimg.com/originals/92/c2/f0/92c2f03407ee7bc8dab7c2962388a139.jpg',
            places:3
        }
    ];

    return (
        <UserList items={USERS} />
    );
};
export default Users;