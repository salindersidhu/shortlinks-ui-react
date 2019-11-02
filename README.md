# Shortlinks UI React
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](/LICENSE.md)

# Table of Contents
* [Development](#development)
    * [Prerequisites](#Prerequisites)
    * [Running](#running)
    * [Building](#building)
    * [Contributing](#contributing)
* [Codebase](#codebase)
    * [Structure](#structure)

# Development
> Information describing how to install and configure all the required tools to begin development.

## Prerequisites
Ensure that you have the following installed and configured any environment variables.

- **Git**
    - Version 2.20.1+
- **Node**
    - Version 10.15.0+
- **Chrome**
    - Version 75+
- **Chrome: React Developer Tools**
    - Version 4.2.0+

## Running
Run the following command to install all the required packages:
```bash
npm install
```

Configure the variables in the `.env.development` file, such as `REACT_APP_GRAPHQL_API_URI` for your development environment.

Start a local development server with live reload using the following command:
```bash
npm start
```

## Building
Configure the variables in the `.env.production` file, such as `REACT_APP_GRAPHQL_API_URI` for your production environment.

Run the following command to generate a production build in the `build` folder:
```bash
npm run build
```

## Contributing
Shortlinks UI React welcomes contributions from anyone and everyone. Please see our [contributing guide](/CONTRIBUTING.md) for more info.

# Codebase
> Information describing the software architecture and how to maintain it while adding additional functionality.

## Structure
    .
    ├── ...
    ├── src                         # Main source
    │    ├── components             # Custom components
    │    │   └── ...
    │    ├── context                # Custom context
    │    │   └── ...
    │    ├── graphql                # GraphQL API Integration
    │    │   ├── Apollo.jsx         # Custom Apollo Provider
    │    │   ├── index.js           # GraphQL queries
    │    │   └── ...
    │    ├── hooks                  # Custom hooks
    │    │   ├── index.js           # Hook source file
    │    │   └── ...
    │    ├── pages                  # Application pages
    │    │   └── ...
    │    ├── utils                  # Utils
    │    │   ├── index.js           # Utils source file
    │    │   └── ...
    │    ├── App.css                # Application styles
    │    ├── App.jsx                # Application source
    │    ├── index.js               # Main source file
    │    ├── serviceWorker          # PWA service worker file
    │    └── ...
    ├── public                      # Web app public folder
    │   ├── images                  # Web app images
    │   │   └── ...
    │   ├── index.html              # Web app source file
    │   ├── favicon.ico             # Web app icon
    │   ├── manifest.json           # Web app manifest file
    │   ├── robots.txt              # PWA robots file
    │   └── ...
    ├── index.js                    # Main server logic
    ├── .env.development.js         # Development build config
    ├── .env.production.js          # Production build config
    ├── .eslintrc                   # Eslint file
    └── ...
