# PostCSS (fork of) [For Plugin](https://github.com/antyakushev/postcss-for)

[PostCSS] plugin that enables `@for` loop syntax in your CSS.

## Install

    npm install -g postcss-for-var

## Usage

```js
postcss([ require('postcss-for') ])
```

Note, that unlike the Sass `@for`, postcss-for in the example below iterates from 1 to 3 *inclusively*.
```less
$from: 1;
$to: 3;
@for @i from $from to $to {
    .b-@i { width: calc(@i / $to * 100%); }
}
```
the above solution assumes you're using [postcss-simple-vars] and [postcss-calc]

```css
.b-1 {
    width: 33.33333%
}
.b-2 {
    width: 66.66667%
}
.b-3 {
    width: 100%
}
```

This plugin must be set **after** [postcss-nested] and [postcss-simple-vars] but
before [postcss-calc].

`By` keyword is available:

```css
@for @i from 1 to 5 by 2 {
    .b-@i { width: @ipx; }
}
```

```css
.b-1 {
    width: 1px
}
.b-3 {
    width: 3px
}
.b-5 {
    width: 5px
}
```



See [PostCSS] docs for examples for your environment.

[PostCSS]:             https://github.com/postcss/postcss
[postcss-nested]:      https://github.com/postcss/postcss-nested
[postcss-calc]:        https://github.com/postcss/postcss-calc
[postcss-simple-vars]: https://github.com/postcss/postcss-simple-vars
[ci]:                  https://travis-ci.org/antyakushev/postcss-for
[deps]:                https://gemnasium.com/antyakushev/postcss-for
[npm]:                 http://badge.fury.io/js/postcss-for
