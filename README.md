# Chatterpod (In Progress)

Chatterpod is a social layer built on top of the [ListenNotes podcast search and directory API](https://www.listennotes.com/api/) that will let you discover and follow podcasts, and save, rate, and discuss your favourite episodes and podcasts with friends, and capture your own notes on podcast episodes.

## Use

The app will be hosted on Heroku soon!

## Technologies

Chatterpod will run on a Heroku server. The back-end REST API is built using Node JS, PostgreSQL/Sequelize, and Express. The front-end will be built with React, and Redux. The app is designed to be responsive and works well on mobile devices. Users create accounts and log in with Google OAuth (with help from Passport.js). 

The podcast info is pulled from the ListenNotes API and cached to reduce the number of calls to the API.

## Features

The core set of features will include:

* Searching for podcasts including filtering by genre
* Viewing podcast details (pulled from ListenNotes API), including its most recent episodes
* Discovery of the most popular podcasts right now
* Following podcasts and saving podcast episodes
* Ratings and comments on podcast episodes 

## Screenshots

Podcasts page:

![Podcasts screen]
(https://github.com/olliebeannn/chatterpod/blob/master/screenshots/chatterpod-podcasts.png)

Podcast detail page: 

![Podcast detail screen]
(https://github.com/olliebeannn/chatterpod/blob/master/screenshots/chatterpod-podcastDetail.png)

Episodes page:

![Episodes screen]
(https://github.com/olliebeannn/chatterpod/blob/master/screenshots/chatterpod-episodes.png)

Episode detail page:

![Episode Detail screen]
(https://github.com/olliebeannn/chatterpod/blob/master/screenshots/chatterpod-episodeDetail.png)

Designed + developed by [Ollie Khakwani](github.com/olliebeannn)
