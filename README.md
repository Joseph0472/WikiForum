### A WikiForum App

## Introduction

Wikipedia is one of the most popular online resources, so on average, people spend quite a bit of time on Wikipedia;
 
yet there is surprisingly little social interaction possibility. 

The talk pages on Wikipedia are predominantly for editorial discussions and not for general discussion on a topic and also have some drawbacks, being basically just a wikipage. 

This project is about building a social media web app around Wikipedia that may offer functions such as forum, recommender, commenting and Q&A functions.

Various ways of linking to Wikipedia content/importing content are possible, ideal would be a system where one can annotate questions and comments directly to specific points in the text.

## Core Feature
One can annotate questions and comments directly to specific points in the text


## Some Tech/Dependencies in use
React: Mainly invovled

Scss: Css style control

React router: Solving routing issues

Antd: style misc like avatars and something

Moment.js: handle posts, request with fake date within json

Jquery: an old way to handle ajax

Nomdemon: hot fresh dev tool

 ## Wiki api
get the content and handle exceptions(e.g. no such article)

 ## Done - Features
Nav bar

Basic page layout

Fetch wiki article content

Data base: structure(login, wikiarticle-blog)

Optimize fetching wiki article content: 
    what if the response is only a title?
    what if the response is a series of related hyperlink?
    what if the input is a random string
 
Login function
 
Optimize the layout of article content

Anotate the article

Home page: update articles in database(by getting json?)

  ## Notes of some features / components

  * The fetch wiki pages api is now done in Jquery and in render() by ajax rather than in componentWillMount() : This will cause empty content when access it.
