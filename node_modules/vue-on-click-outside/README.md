# vue-on-click-outside

vue-on-click-outside is a [Vue](https://vuejs.org/) directive which calls a method whenever a click event is registered *outside* of the element the directive was bound to. The most obvious use case is to close an element whenever someone clicks outside of it.

## Installation

```bash
npm install vue-on-click-outside --save

# or if you prefer yarn
yarn add vue-on-click-outside
```

## Usage

vue-on-click-outside provides a mixin and directive export. You may use either of them to register the directive globally or locally.

```js
// global directive
import Vue from 'vue'
import { directive as onClickOutside } from 'vue-on-click-outside' 
Vue.directive('on-click-outside', onClickOutside)

// local mixin
import { mixin as onClickOutside } from 'vue-on-click-outside'
const MyComponent = {
  mixins: [onClickOutside]
}
export default MyComponent
```

If you’ve registered the directive inside of your component you’re good to go and can use it in your templates.

```html
<template>
  <button type="button" class="i-am-a-popover-trigger" @click="open"></button>  
  <div class="i-am-a-popover close-me-by-clicking-outside-of-me" 
    v-if="showPopover" v-on-click-outside="close">
    <span>Interesting Text!</span>
  </div>
</template>

<script>
  import { mixin as onClickOutside } from 'vue-on-click-outside'
  export default {
    mixins: [onClickOutside],
    data() {
      return { showPopover: false }
    },
    methods: {
      open() { this.showPopover = true },
      close() { this.showPopover = false }
    }
  }
</script>
```

## How it works 

vue-on-click-outside uses `mouseenter` and `mouseleave` events to determine if the user is still *inside* the element. This should account for content that is dynamically removed on click events and is the primary distinction to the existing [vue-clickaway](https://github.com/simplesmiler/vue-clickaway) library.
Once a user clicks on something the click event bubbles up the DOM tree until it reaches the `documentElement`. A click listener on the `documentElement` then looks for elements that were not targetted by the click event and calls the callback you provided via the directive.
 
If you use vue-on-click-outside multiple times on a single page it will only ever create one single `documentElement` click listener and two event listeners for your element. If you **know** that your element won’t contain any dynamically created/removed content you can also use the `static` modifier of the directive (turning `v-on-click-outside="close"` into `v-on-click-outside.static="close"`). It will switch to a different strategy that works without the two event listeners per element. 
 
## Caveats
 
Some JavaScript code will make it appear as if their content is inside your element but in fact it is absolutely positioned from the `body` element. A lot of datepicker, tooltip, popover and many more libraries rely on this kind of behaviour. Look out for *static* modes or options that allow you to attach their root element to your element, that uses the directive (or some element inside the tree of your element). 
