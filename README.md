# Chatterpod (In Progress)

Chatterpod is a social layer built on top of the podcast-focused ListenNotes API that will let you discover and follow podcasts, and save, rate, and discuss your favourite episodes and podcasts with friends.

## Use

The app will be hosted on Heroku soon!

## Technologies

Chatterpod will run on a Heroku server. The back-end REST API is built using Node JS, PostgreSQL/Sequelize, and Express. The front-end will be built with React, and Redux. The app is designed to be responsive and works well on mobile devices. Users create accounts and log in with Google OAuth (with help from Passport.js). 

The podcast info is pulled from the ListenNotes API and cached to reduce the number of calls to the API.

Designed + developed by [Ollie Khakwani](github.com/olliebeannn)
