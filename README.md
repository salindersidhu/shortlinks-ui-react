# Shortlinks UI React

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](/LICENSE.md)

# Table of Contents

- [Development](#development)
  - [Prerequisites](#Prerequisites)
  - [Backend](#backend)
  - [Running](#running)
  - [Building](#building)
  - [Contributing](#contributing)
- [Codebase](#codebase)
  - [Structure](#structure)

# Development

> Information describing how to install and configure all the required tools to begin development.

## Prerequisites

- **Git**
  - Version 2.20.1+
- **Node**
  - Version 10.15.0+
- **Chrome**
  - Version 75+
- **Chrome: React Developer Tools**
  - Version 4.2.0+

## Backend

The backend required for this project is [ShortLinks API GraphQL](https://github.com/salindersidhu/shortlinks-api-graphql). Please refer to its README for further instructions.

## Running

1. Run the following command to install all the required packages:

```bash
npm install
```

2. Create the `.env.development` file at the root of your project. Configure the following variables for your development environment:

```
GENERATE_SOURCEMAP=true
REACT_APP_GRAPHQL_API_URI=
```

3. Start a local development server with live reload using the following command:

```bash
npm start
```

## Building

1. Create the `.env.production` file at the root of your project. Configure the following variables for your development environment:

```
GENERATE_SOURCEMAP=false
REACT_APP_GRAPHQL_API_URI=
```

2. Run the following command to generate a production build in the `build` folder:

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
    ├── src
    │    ├── components             # Reusable custom components
    │    │   └── ...
    │    ├── context                # Custom context
    │    │   └── ...
    │    ├── graphql                # GraphQL API Integration
    │    │   ├── Apollo.jsx         # Custom Apollo Provider
    │    │   ├── index.js           # GraphQL queries
    │    │   └── ...
    │    ├── pages                  # Application pages
    │    │   └── ...
    │    ├── widgets                # Application page components
    │    │   └── ...
    │    ├── App.jsx                # Application source
    │    ├── index.js               # Main source file
    │    ├── serviceWorker.js       # PWA service worker file
    │    ├── utils.js               # Utilities source file
    │    └── ...
    ├── public                      # Web app public folder
    │   ├── images                  # Web app images
    │   │   └── ...
    │   ├── favicon.ico             # Web app icon
    │   ├── index.html              # Web app source file
    │   ├── logo192.png             # Web app logo 192x192 pixels
    │   ├── logo512.png             # Web app logo 512x512 pixels
    │   ├── manifest.json           # Web app manifest file
    │   ├── robots.txt              # PWA robots file
    │   └── ...
    └── ...
