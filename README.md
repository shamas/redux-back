# redux-back
A lightweight middleware for enabling Back and Forward browser controls for a Single/Multi-page Web Application

## Installation

```shell
$ npm install --save redux-back
```

## Example

```javascript
import {applyMiddleware} from 'redux'
import {createBackMiddleware} from 'redux-back'

const landingPage = {type: DEFAULT_PAGE_Action, welcomeMessage: 'Welcome'}
const reduxBack = createBackMiddleware(landingPage, [CHANGE_PAGE_Action, OPEN_REPLY_SCREEN_Action])

let store = createStore(reducers, loadedState, applyMiddleware(...middleware, reduxBack))
```

It can be used with require as

```javascript
const {createBackMiddleware} = require('redux-back')
```

The above code will add actions of type `CHANGE_PAGE_Action` and `OPEN_SEND_SCREEN_Action` to the browser back and forward buttons.

The `DEFAULT_PAGE_Action` provided to the creation script will be used when the user clicks back to the first screen of the session. Usually this action is generated in an action creator script in your ./actions/ directory.
