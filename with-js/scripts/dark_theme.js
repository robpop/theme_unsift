// see https://codyhouse.co/blog/post/dark-light-switch-css-javascript
// for potentially better approach

"use strict";
$(() => {
    // check is dark theme cookie is set and change out dark theme CSS appropriately
    let dark_theme = (document.cookie.match(/^(?:.*;)?\s*major_platform_darktheme\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1];
    if(parseInt(dark_theme)) {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = '../styles/dark-theme.css'; // replace this with the path to the dark-theme.css file on your system
        link.media = 'all';
        head.appendChild(link);
    }
    // show the body once dark-theme styles are added successfully
    $("body").show();
});