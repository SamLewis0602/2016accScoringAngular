# 2016accScoringAngular
This is a simple web application that I wrote to allow my teammates to predict their place in their 3 individual events at the 2016 ACC Championships. When they update their place, it updates their individual points scored as well as the total team score.
## Front-end
The front end of this project is using angular 1 to create custom components that represent the individual table and the relay table.
## API
The API for this project is written in PHP and uses the pg_connect library to query the database to retrieve the swimmers and relays, as well as update the swimmers places when there is a change on the front end.
## Back-end
The back end of this application is a PostgreSQL database that was hosted on my student server space at UNC (no longer active since graduation).
