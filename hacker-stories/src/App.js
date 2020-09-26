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

const List = ({ data, onRemoveItem }) =>
  data.map(item => 
      <Item 
        key={item.objectID} 
        item={item} 
        onRemoveItem = {onRemoveItem}
        />);

const Item = ({ item, onRemoveItem }) => {
  // const handleRemoveItem = () => {
  //   onRemoveItem(item);
  // }
  return(
      <div>
        <span>
            <a href={item.url}>{item.title}</a>
          </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
          <span>
            <button type="button" onClick={() => onRemoveItem(item)}>Dismiss</button>
          </span>
      </div>
  );
};

// Just -> Function
// return JSX
const Search = ({ searchTerm, onSearch }) => {
  return (
          <>
            <label>Search: </label>
            <input id="search" type="text" 
            value={searchTerm}
            onChange={onSearch}/>
          </>
  );
}
// Reusable component
const InputWithLabel = ({ id, value, 
  type='text', onInputChange, 
  children,
  isFocused }) => {

  const inputRef = React.useRef();

  React.useEffect(() => {
    if(isFocused && inputRef.current){
      // telling react how to focus
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
          <>
            <label>{children}</label>
            &nbsp;
            <input id={id}
            ref={inputRef} 
            //autoFocus
            type={type} 
            value={value}
            onChange={onInputChange}/>
          </>
  );
}

const initialStories = [
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

// IMAGINE: this is coming from another machine
// data takes 2 second to come
const getAsyncStories = () =>
  //Promise.resolve({data: {stories: initialStories }});
  new Promise(resolve => 
      setTimeout(
        () => resolve({data: {stories: initialStories}}),
        2000
      )
);

// For this thing to be called hook
// return array -> with item and setItem
const useSemiPersistentState = (key, initialState) => {
  // array destructuring
  // useState React hook
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  ); 

  // useEffect React hook
  React.useEffect(() => {
    // this is sync I need to do when state is changed
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
}

// Functional component
const App = () => {

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search2', '');

  const [stories, setStories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  // Tell react - run this only ONCE!!!
  React.useEffect(()=> {
    setIsLoading(true);
    // do a ASYNC call and set my stories
    getAsyncStories()
      .then(result => {
          setStories(result.data.stories);
          setIsLoading(false);
        })
      .catch(() => setIsError(true));
  }, []);

  const handleRemoveStory = item => {
    // skipping item.objectID
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    );
    setStories(newStories);
  }

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
      <h1>My Hacker Stories</h1>
      
      {/* <Search searchTerm={searchTerm} onSearch={handleSearch}/> */}
      <InputWithLabel
          id = "search"
          value = {searchTerm}
          onInputChange = {handleSearch}
          isFocused = {false}
          >
            <strong>Search:</strong>
        </InputWithLabel>
      <p>
          Searching for <strong>{searchTerm}</strong>
      </p>
      <hr />
      { isError && <p>Something went wrong...</p> }

      { isLoading ? (<p>Loading...</p>) :
          (<List data={searchStories} onRemoveItem={handleRemoveStory}/>)
      }
      {/* { isVisible ? 'Hide' : 'Show'}
      <button onClick={() => setIsVisible(!isVisible)}>Toggle</button> */}
    </div>
  );
}

export default App;
