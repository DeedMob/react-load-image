react-image-loader
=================

This is a fork of https://github.com/hzdg/react-imageloader, however many design changes were made and deprecations fixed so it warranted its own repo/package.

This React component allows you to display
content while waiting for the image to load, as well as by showing alternate
content if the image fails to load.

Installing
-----
`npm install react-image-loader`


Usage
-----

```javascript
import React from 'react';
import ImageLoader from 'react-imageloader';

function Preloader(props) {
  return <img src="spinner.gif" />;
}

React.render((
  <ImageLoader
    src="/path/to/image.jpg"
  >
    <img />
    <div>Error!</div>
    <Preloader />
  </ImageLoader>
), document.body);

```


Props
-----

Name        | Type     | Description
------------|----------|------------
`onError`   | function | An optional handler for the [error] event.
`onLoad`    | function | An optional handler for the [load] event.
`src`       | string   | The URL of the image to be loaded, will be passed as the src prop to your first child provided. If you want to use it as a background image, make your first child a react component like Name = (props) => <div style={{backgroundImage: props.src}}/> and do <Name/>


Children
--------
The first child of `ImageLoader` will be rendered when the image is successfully loaded. The `src` prop will be passed to it.

The second child of `ImageLoader` will be rendered when the image load fails.

The third child of `ImageLoader` will be rendered when the image is in the process of loading
