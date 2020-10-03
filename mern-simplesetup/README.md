# MERN - Simple Setup Check

# macOS mongodb
brew services start mongodb-community@4.4
brew services stop mongodb-community@4.4

# Possible error solution
npm remove webpack webpack-cli
npm install --save-dev webpack webpack-cli

#### What you need to run this code
1. Node (8.11.1)
2. NPM (5.8.0)
3. MongoDB (3.6.3)

####  How to run this code
1. Clone this repository
2. Open command line in the cloned folder, 
   - To install dependencies, run ```  yarn  ```
   - To run the application for development, run ``` yarn development  ```
4. Open [localhost:3000](http://localhost:3000/) in the browser
 
