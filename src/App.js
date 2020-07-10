import React from 'react';
import './App.css';
import GoalList from './components/GoalList/GoalList';
import NewGoal from './components/NewGoal/NewGoal';

const App = () => {
  const courseGoals = [
    { id: 'cds', text: 'finish' },
    { id: 'cdsx', text: 'finish' },
    { id: 'cdsz', text: 'finish' }
  ];

  const addNewGoalHandler = (newGoal)=>{
    courseGoals.push(newGoal);
  };

  return (
    <div className="ma">
      <h1>Goals for course</h1>
      <NewGoal onAddGoal={addNewGoalHandler} />
      <GoalList goals={courseGoals} />
    </div>

  );
};

export default App;
