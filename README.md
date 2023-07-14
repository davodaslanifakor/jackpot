# Jackpot Game

## [Demo Site](https://musical-sawine-943d94.netlify.app)

## Description
This is a web application that simulates a jackpot game.

## Table of Contents

- [Installation](#installation)
   - [Docker](#docker)
   - [Develop](#develop)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)

## Installation

## Docker

### To run the application using Docker, follow these steps:
1. Clone the repository:
```shell
$ git clone git@github.com:davodaslanifakor/jackpot.git
```
2. Navigate to the project directory:
```shell
$ cd jackpot
```
3. Build the Docker image:  

```shell
docker build -t jackpot-image .
```

4. Run the Docker container:
```shell
docker run -p 8081:80 --name jackpot-container jackpot-image
```

5. Access the application in your browser by navigating to http://localhost:8081.


## Develop

1. Clone the repository:
```shell
$ git clone git@github.com:davodaslanifakor/jackpot.git
```
2. Navigate to the project directory:
```shell
$ cd jackpot
```

3- Install the dependencies:
```shell
$ yarn 
```
# Usage

1-Start the development server

```shell
yarn serve
```
Open your browser and visit http://localhost:8080 to see the Jackpot application.

That port maybe in different in your system


## Folder Structure
```html
public/               <-- Directory for static index.html
 images/              <-- Directory for static (e.g., images, icons)
 index.html           <-- File as the entry point for Vue application  
src/
  components/          <-- Directory for Vue components
    Elements/          <-- Directory for reusable UI elements
      Button/          <-- Directory for the button component
        Button.vue     <-- Vue component for the button
        Button.css     <-- CSS file specific to the button component
        constants.js   <-- Constants file specific to the button component
      ImageLoader.vue  <-- Vue component for the image loader
    Games/             <-- Directory for game components
      index.js         <-- Index file to export  games components
      Jackpot/         <-- Directory for the Jackpot game components
        constance.js   <-- constance file to implement requeiment constant
        Jackpot/       <-- Directory for the Jackpot game main where all export the final result
           Jackpot.vue <-- Vue component for the Jackpot game
           Jackpot.css <-- CSS file specific to the Jackpot game
        Block/         <-- Directory for the Block game components
           Block.vue   <-- Vue component for the Block game
           Block.css   <-- CSS file specific to the Block game
        Row/           <-- Directory for the Row game components
          Row.vue      <-- Vue component for the Row game
          Row.css      <-- CSS file specific to the Row game
  utils/               <-- Directory for utility functions
    commonUtils.js     <-- Common utility functions
  store/               <-- Vuex store managment
  App.vue              <-- Root Vue component
  main.js              <-- Vue app entry point
  tests/               <-- Directory for tests                      
.browserslistrc        <-- Browserslist configuration file                   
.eslintrc.js           <-- ESLint configuration file                 
.gitignore             <-- Git ignore file
Dockerfile             <-- Dockerfile config                     
babel.config.js        <-- Babel configuration file                     
jest.config.js         <-- Jest configuration file                    
jsconfig.json          <-- JavaScript configuration file                            
lint-staged.config.js  <-- Lint-staged configuration file                   
package.json           <-- Package.json file                
README.md              <-- Project readme file                    
vue.config.js          <-- Vue configuration file                
```

# Configuration
##VS Code
Install the required extensions:

# ESLint
 - [Prettier - Code formatter](https://prettier.io/)
 - [Configure ESLint](https://eslint.org/)

Open your VS Code settings (File > Preferences > Settings or Ctrl/Cmd + ,).
Search for "eslint.validate".
Enable the "Auto Fix On Save" option to automatically format your code on save.
Configure Prettier:

Open your VS Code settings (File > Preferences > Settings or Ctrl/Cmd + ,).
Search for "prettier.requireConfig".
Set the value to true to ensure that Prettier uses the project-specific configuration.

## WebStorm
Install the required plugins:

ESLint: Open WebStorm and go to Preferences > Plugins. Search for "ESLint" and install the plugin.
Prettier: Open WebStorm and go to Preferences > Plugins. Search for "Prettier" and install the plugin.
Configure ESLint:

Open WebStorm and go to Preferences > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint.
Enable ESLint integration and choose the configuration file (eslint.config.js or .eslintrc.js) from your project.
Configure Prettier:

Open WebStorm and go to Preferences > Languages & Frameworks > JavaScript > Prettier.
Enable Prettier and choose the configuration file (prettier.config.js or .prettierrc.js) from your project.

## Contributing
Contributions are welcome! Here's how you can contribute:

Fork the repository.
Create a new branch: git checkout -b feature/your-feature-name.
Make your changes and commit them: git commit -m 'Add some feature'.
Push to the branch: git push origin feature/your-feature-name.
Submit a pull request.

