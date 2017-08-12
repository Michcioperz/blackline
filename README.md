# blackline
simple table of contents kind of thing for js

named after that legendary Area 11 EP album

a "CDN"'d version is at https://weiss.iscute.ovh/f/52d.js

the script looks for elements with `data-blackline` attribute

if `data-blackline` is empty, it assumes the section title should be element's text content

if the found element also has `for` attribute, it will be used to find (using querySelector) the element that has to be scroll-watched

it's visually terrible but I don't care at the moment

it depends on @michcioperz/no-bullshit-onscreen
