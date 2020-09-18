import React from 'react';
import './App.css';

// Javascript object
const welcome = {
  greeting: 'Hey',
  title: 'React'
}

// Function
function getTitle(title) {
  return title;
}

function App() {
  return (
    // React JSX -> babel -> React.functions -> HTML
    <div className="App">
      <h1>
        {welcome.greeting} {getTitle(welcome.title)}
      </h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text"/>
    </div>
  );
}

export default App;
