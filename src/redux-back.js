import createHistory from 'history/createBrowserHistory'

function shallowActionObjCompare(a1, a2) {
    // Object.entries
    for(let key in a1) {
        if(a1[key] !== a2[key]) return false
    }
    return true
}

export const createBackMiddleware = (rootAction, actionTypesThatImpactHistory) => {
    const history = createHistory()
    let prevAction = {} // prevent duplicates
    let current = ""

    // All things that affect nav need to be listed here
    return (store) => {
        // Sometimes trees are rendered twice in development react
        if(window.historyUnlisten) window.historyUnlisten()

        window.historyUnlisten = history.listen((location, action) => {
            if(current !== location.key) { // prevent multiple call issues in program from causing issues in history
                if(action === 'POP') {
                    if(location.state) {
                        // If there are many dispatch commands triggered on switch, this will get called many times.
                        prevAction = location.state
                    } else {
                        prevAction = rootAction
                    }
                    if(prevAction) {
                        // omits dispatching nothing when user is using
                        // entering urls manually
                        current = location.key
                        store.dispatch(prevAction)
                    }
                } else if(action === 'PUSH') {
                    // a consequence of this is that clicking something multiple times
                    // will not add multiple calls to the history
                    if(!shallowActionObjCompare(location.state, prevAction)) {
                        current = location.key
                        prevAction = location.state
                    }
                }
            }
        })

        return (next) => (action) => {
            if(actionTypesThatImpactHistory.findIndex(v=>action.type===v) > -1) {
                if(!shallowActionObjCompare(action, prevAction)) {
                    // don't overwrite history on back dispatch
                    history.push('/', action)
                }
            }
            next(action)
        }
    }
}