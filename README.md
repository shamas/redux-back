# redux-back
A lightweight middleware for enabling Back and Forward browser controls for a Single/Multi-page Web Application.

This middleware will record action objects in the browser history stack, replaying the action when user navigates back or forward with browser navigation.

If you already have some screen management with pure redux actions, then this will give you browser history with 0 new actions and no configuration beyond calling the `createBackMiddleware` function.

I used this for subscreen changes that didn't warrant a change in url but wanted the intuitive back action to be available.

## Installation

```shell
$ npm install --save redux-back
```

## Example

```javascript
import {applyMiddleware} from 'redux'
import {createBackMiddleware} from 'redux-back'

const landingPage = {type: EXAMPLE_OPEN_LANDING_PAGE_Action, welcomeMessage: 'Welcome'}
const reduxBack = createBackMiddleware(landingPage, [EXAMPLE_Action1, EXAMPLE_Action2])

let store = createStore(reducers, loadedState, applyMiddleware(...middleware, reduxBack))
```

It can be used with require as

```javascript
const {createBackMiddleware} = require('redux-back')
```

The above code will add actions of type `EXAMPLE_Action1` and `EXAMPLE_Action2` to the browser back and forward buttons.

The `EXAMPLE_OPEN_LANDING_PAGE_Action` provided to the creation script will be used when the user clicks back to the first screen of the session. If any action objects in browser history are null, they won't be dispatched.
