# SmartDelay
## Simple library for delaying operations

# Usage example

```js
import { SmartDelay } from "@tarvit/smart_delay";

// execute action
const timeout = 100;
SmartDelay.executeDelayedAction(`your-context-id-here`, ()=> { console.log('exec something') }, timeout);


// use as worker
const worker = SmartDelay.get(`your-dynamic-id`, ()=> {
  console.log('perform your operation')
});

worker.executeDelayed(); // call this to fire a delayed action
worker.isDone();         // check if it is done
worker.isWaiting();      // check if it is in progress
worker.release();        // stop actions
```

