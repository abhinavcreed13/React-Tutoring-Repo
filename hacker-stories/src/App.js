import React from 'react';
import './App.css';

// Javascript object
const welcome = {
  greeting: 'Hey',
  title: 'React'
}

// stories
// javascript list/array
const list = [
  {
    title: 'React',
    url : 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url : 'https://redux.js.org/',
    author: 'Dan Abramov',
    num_comments: 2,
    points: 5,
    objectID: 1
  },
]

// Function
// Not a component - it is not returning JSX
function getTitle(title) {
  return title;
}

// List Component
const List = () => {
    // return? -> JSX
    return (
      list.map(item => (
                <div key={item.objectID}>
                  <span>
                    <a href={item.url}>{item.title}</a>
                  </span>
                  <span>{item.title}</span>
                  <span>{item.num_comments}</span>
                  <span>{item.points}</span>
                </div>
            ))
    );
}

// Functional component
const App = () => {

  const handleChange = event => {
    console.log(event.target.value);
  };  

  return (
    // React JSX -> babel -> React.functions -> HTML
    <div className="App">
      <h1>
        My Hacker Stories
      </h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange}/>

      <hr/>

      <List/>
    </div>
  );
}

export default App;
