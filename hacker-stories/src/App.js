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
// return? -> JSX
/*
const List = ({ data }) => (
        data.map(({objectID, ...item}) => <Item key={objectID} {...item}/>
      )
);
*/
// Item component
// returns JSX
// const {pet: {name}} = user
/*
const Item = ({  title, url, author, num_comments }) => (
                  <div>
                        <span>
                          <a href={url}>{title}</a>
                        </span>
                        <span>{author}</span>
                        <span>{num_comments}</span>
                        <span>{points}</span>
                      </div>
      );
*/

const List = ({ data }) =>
  data.map(item => <Item key={item.objectID} item={item} />);

const Item = ({ item }) => (
  <div>
    <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
  </div>
);

// Just -> Function
// return JSX
const Search = ({ searchTerm, onSearch }) => {

  // object destructing
  // const { searchTerm, onSearch } = props;

  return (
      <div>
        <label htmlFor="search">Search: </label>
        <input id="search" type="text" 
          value={searchTerm}
          onChange={onSearch}/>
      </div>
  );
}

// For this thing to be called hook
// return array -> with item and setItem
const useSemiPersistentState = () => {
  // array destructuring
  // useState React hook
  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || 'React'
  ); 

  // useEffect React hook
  React.useEffect(() => {
    // this is sync I need to do when state is changed
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  return [searchTerm, setSearchTerm];
}

// Functional component
const App = () => {

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

  const [searchTerm, setSearchTerm] = useSemiPersistentState();

  // callback handler
  const handleSearch = event => {
    // this will re-render App component
    // App() is fired again
    setSearchTerm(event.target.value);
  }; 

  const searchStories = stories.filter(function(story){
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    // React JSX -> babel -> React.functions -> HTML
    <div className="App">
      <h1>
        My Hacker Stories
      </h1>
      
      <Search searchTerm={searchTerm} onSearch={handleSearch}/>
      <p>
          Searching for <strong>{searchTerm}</strong>
      </p>
      <hr />

      <List data={searchStories}/>
    </div>
  );
}

export default App;
