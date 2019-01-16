## tiki-book Demo

### Development

* (Optional) Setup Unbutu VM for running Mongodb by using [Vagrant](https://www.vagrantup.com/), skip if your machine is already having Docker and MongoDB server instance.
```
vagrant up  # Create VM
vagrant ssh # Login to VM
cd /vagrant/_dev
./services-up.sh  # Run Docker-compose: MongoDB, create dev database, db user.
```

#### Backend Services

* Install dependencies
```
cd tiki-book-services/source
npm install
```

* Review settings (port, MongoDB connection info) before running at **server/settings.js** by providing corresponding environment variables.

  For example, the current content of settings.js in this repo:

  ```
  module.exports = {
    PORT: process.env.PORT || 3500,
    DB_HOST: process.env.DB_HOST || "172.16.1.11",
    DB_PORT: process.env.DB_PORT || "27017",
    DB_NAME: process.env.DB_NAME || "tikibookdb",
    DB_USER: process.env.DB_USER || "tiki",
    DB_PASSWORD: process.env.DB_PASSWORD || "tiki",
  };

  ```
* Start server

```
npm run start
```

=> Access it via `<host_ip>:3500` (default).

#### Web Frontend

* Install dependencies

```
cd tiki-book-web/client
npm install
```

* Review settings (**backend api url**) by modifying **.env.development** or start process and providing corresponding env var: REACT_APP_SERVICES_ROOT

  For example, the current content of .env.development in this repo:
  ```  
  REACT_APP_SERVICES_ROOT=http://localhost:3500
  ```

=> Access it via `<host_ip>:3000` (default).

### PREVIEW (For Interviewer)

**METHOD 1. USE MY PUBLIC DOCKER IMAGES**

* Make changes (uncomment) in `_dev/test.yml` to use 
```
image: nghiaht/tiki-book:services-latest
...
image: nghiaht/tiki-book:web-latest
```
for web and services, check and set environment variables `DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, PORT, SERVICES_ROOT`

* Execute `_dev/test-up.sh` 

OR

**METHOD 2. USE LOCAL DOCKER IMAGES**

* Build local Docker images:
```
tiki-book-services/ci/dockerize.sh
tiki-book-web/ci/dockerize.sh
```

* Change `_dev/test.yml` to use 
```
image: tiki-book-services:latest
...
image: tiki-book-web:latest
environment:
 - SERVICES_ROOT: http://<docker_host>:3500 (Replace with correct docker_host)
...
```

* Execute `_dev/test-up.sh` 

=> Access web via `<docker_host>:3000` (default)

### Demo Requirements

* A homepage for listing books
* An admin page to add/edit/delete the books in the database

* Using MongoDB for Database.
* Using NodeJS and Express for BackEnd 
* Using React, Redux for FrontEnd 

### My Approach

* A React app:
  * "/" for home page, listing books.
  * Admin pages accessed via links starting with "/admin".

  * UX:
    * Home page: 
      * Books are listed by cards.
      * Has many categories (tabs).
      * A spinner while loading books.
      * Auto load-more when scroll to bottom (use react-visibility-sensor).

    * Admin:
      * Linear progress bar while requesting.
      * Modal views, just stay at /admin/books, then we can create or update Book in a modal.
      * On **Book List Admin page**:
        * Has **Create** button.
        * Has **Delete** option by clicking the down-arrow button.
        * **Show more** button is diplayed if more books could be loaded.

      * Display success and error notifications when create/update/delete Book (using react-toastify) => Just turn off the backend for quickly test :D.

  * Use [create-react-app](https://github.com/facebook/create-react-app) template:

    * Use redux, redux-saga for handling *Books CRUD requests*.
    * Use reduxsauce to minimize the boilercode for defining *action types, action creators*.

    * Separate reducers, sagas into functions (and become separate folders) (`store/book/create, list, update, detail, delete`) with a mindset: each functions could be implemented by a single developer, so organize files in a separate folder would help for isolating, easier testing.

    * Inspired the "request" approach, each action (get/gets/create/update/delete) would have tuple of 4 actions TYPES: `REQUEST, START, SUCCEED, FAIL` and 4 action CREATORS: `request(), start(), succeed(), fail()`.

    * Use redux-form for quick form setup.    


* Backend:
  * Use [Loopback.js v3](https://loopback.io/) to reduce boilercode needed for setup data repositories. It was built on-top **Express** so it does satisfy the requirement.
  * Has a model: **Book** `/server/models/book.json` and expose CRUD endpoints `/api/Books`
  * Settings is gathered at `/server/settings.js`, make use of env vars for deployment variants.

* Other:

  * Use Git-flow 
  * Setup the services first (+ MongoDB) then a simple React app, then apply Bootstrap.
