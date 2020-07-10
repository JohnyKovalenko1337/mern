import React from 'react';

import './NewGoal.css';

const NewGoal = (props) => {

    const addGoalHandler = (event) => {
        event.preventDefoult();

        const newGoal = {
            id: Math.random().toString(),
            text:"new goal"
        };

        props.onAddGoal(newGoal);
    };

    return (
        <form className="new-goal" onSubmit={addGoalHandler}>
            <input type="text" />
            <button type="submit">Add goal</button>
        </form>
    );
}

export default NewGoal; 