# parallax-element.js

jQuery plugin that creates parallax effect for specific element. 

## Usage and Defaults

The scroll animation speed is based upon either a `data-speed` attribute in a html tag or the `defaultSpeed` option.

The speed value (integer) should be kept between `-1` and `1`.

A positive number makes the element appear to scroll slowly downward, while a negative integer makes the element appear to scroll slowly upward.

Javascript file:

```javascript
// Default usage
$('.element').parallaxElement();

// Options
$('.element').parallaxElement({
  defaultSpeed:  0.2,   // Integer - Default speed if `data-speed` is not present
  useOffset:     true,  // Boolean - Whether or not to start animations below bottom of viewport
  defaultOffset: 200,   // Distance before element appears to start animation
  disableMobile: false, // Boolean - allow function to run on mobile devices
  minWidth:      false  // Integer - minimum width the function should fire
});
```

To assign different speeds to indivudual elements, use the `data-speed` attribute in html:

```html
<div class="element" data-speed="0.1">
  <!-- do stuff -->
</div>

<div class="element" data-speed="0.2">
  <!-- do stuff -->
</div>

<div class="element" data-speed="-0.1">
  <!-- do stuff -->
</div>

```


## Browserify

Make sure to shim jQuery and then simply require the file:

```
require('parallax-element');

$('.element').parallaxElement({
  defaultSpeed: 0.1
});

```
