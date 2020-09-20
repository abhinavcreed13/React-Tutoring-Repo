import React from 'react';
import './App.css';

// Javascript object
const welcome = {
  greeting: 'Hey',
  title: 'React'
}

// Function
// Not a component - it is not returning JSX
function getTitle(title) {
  return title;
}

// List Component
const List = (props) => {
    // return? -> JSX
    return (
      props.data.map(item => (
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

// Just -> Function
// return JSX
const Search = (props) => {
  return (
      <div>
        <label htmlFor="search">Search: </label>
        <input id="search" type="text" onChange={props.onSearch}/>
      </div>
  );
}

// Functional component
const App = () => {

  // array destructuring
  // useState React hook
  const [searchTerm, setSearchTerm] = React.useState(''); 

  // callback handler
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };  

  // stories
  // javascript list/array
  const stories = [
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

  return (
    // React JSX -> babel -> React.functions -> HTML
    <div className="App">
      <h1>
        My Hacker Stories
      </h1>
      
      <Search onSearch={handleSearch}/>
      <p>
          Searching for <strong>{searchTerm}</strong>
      </p>
      <hr />

      <List data={stories}/>
    </div>
  );
}

export default App;
