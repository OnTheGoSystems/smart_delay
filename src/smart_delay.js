/*
MIT License

Copyright (c) 2019 Vitaly Tarasenko, https://github.com/tarvit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

export default class SmartDelay {
  constructor(action, period) {
    this.action = action;
    this.period = period;
    this.timer = null;
  }

  execute() {
    this.action();
    this.timer = null;
  }

  executeDelayed() {
    if(this.isWaiting()) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(()=>{ this.execute() }, this.period);
  }

  isWaiting() {
    return !this.isDone();
  }

  isDone() {
    return !this.timer;
  }

  release() {
    if(this.timer) clearTimeout(this.timer);
    this.timer = null;
  }
}

global.smartDelayWorkers = {};

SmartDelay.getSingleton = (id, action, period) => {
  if(!global.smartDelayWorkers[id]) {
    global.smartDelayWorkers[id] = new SmartDelay(action, period);
  }
  global.smartDelayWorkers[id].action = action;
  return global.smartDelayWorkers[id]
};

SmartDelay.executeDelayedAction = (id, action, period) => {
  SmartDelay.getSingleton(id, action, period).executeDelayed();
};

SmartDelay.get = (action, period) => {
  return new SmartDelay(action, period);
};
