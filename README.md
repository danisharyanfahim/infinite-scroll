# **Infinite Scroll Movies**

This is a test application that I developed to test out a bunch of features I wished to use on my blog site:
- The site uses SanitIO as a headless CMS to allow for uploading of movie data for the admin of the site (Me). When I originally, created
  this, I didn't know how to use paths from nodeJS to read files directly into NextJS, meaning I had to insert all of the movie data in
  manually. Next time around, I will simply fetch data from a movie API, write that into a JSON file, and then write/post that data into
  SanityIO, to automate the entire process.
- The movie card itself features an image of the movie poster, the title, the release year, the genres, the length of the movie, the
  language originally spoken by the cast within the movie, the rating of the movie ccourtesy of IMBD, and a link to the movies IMBD
  page.
- The card design, while simple, looks clean and modern, and is good enough for something that was cooked up in half an hour

## Features
  - **Infinite Loading**
    - Uses my own intersection observer hook to load in movie cards as you scroll down the page, the number of cards loaded is adjustable
    and this works on all devices regardless of screen-width.
  - **Lazy Loading**
    - Images: Rhis is as easy as setting the loading to lazy. I could have gone a step further and created smaller versions of the images
      which are blurred and load in before the actual image, but converting all of those would have taken too long.
    - Skeleton cards: I create a bunch of skeleton cards with a simple left to right glossy shine animation. First the card data will be
      fetched using sanity's fetch API, if any data is found which matches the query then it will return the length of the data. Afterwards,
      it will generate a specfic number of skeleton cards on the page, if the lenth of the data return from the query is shorter than the
      total number of cards displayed per page (which I have set to 6), then it will simply return the length of the cards. If it is more
      than that, then it will return an ammount of data equal to the total number of cards displayed per page. The skeleton cards will load
      in first, then the second fetch begins, where the data for each individual card is loaded in. It will continue to show the skeleton
      card animations until the movie data for that card has loaded in, then it will be replaced by the actual movie card once it has
      completely loaded in.
  - **Searching** using sanityIO's query feature. I allowed 3 different types of searching:
    1) Basic title search: Will return all movies which contain that word, phrase or letter in the title, accounting for whitespaces.
    2) Category search: By clicking the tags or using a number sign/hashtag in the search bar, you can search movies by genre, allowing
       all movies which are a part of that genre to be indexed within the search.
    3) Release Year search: By adding the key word 'from:' to the search and then specifying the year, the query will fetch all movies in
       the database which were released that year
  
