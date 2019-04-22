# SmartDelay
## Simple library for delaying operations

# Usage example

```js
import { SmartDelay } from "@tarvit/smart_delay";

// Use as function

const id = "your-context-id-here"; // create an id for your action (so you can execute same actions in different contexts)
const timeout = 100; // set your delay
const action = ()=> { console.log('exec something') }; // define your action
SmartDelay.executeDelayedAction(id, action, timeout); // fire delayed action, it will be executed 100ms later if not another fire. it will be delayed every time your fire it and can be executed only once per 100ms.


// Use as worker
const worker = SmartDelay.get(`your-dynamic-id`, ()=> {
  console.log('perform your operation')
});

worker.executeDelayed(); // call this to fire a delayed action
worker.isDone();         // check if it is done
worker.isWaiting();      // check if it is in progress
worker.release();        // stop actions
```

