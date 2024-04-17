# Factorial Code Challenge

## Requirement

We need a Frontend + Backend application that allows you to post and visualize metrics. Each metric will have: Timestamp, name, and value. The metrics will be shown in a timeline and must show averages per minute/hour/day. The metrics will be persisted in the database.

## Stack

- Ruby on Rails as the backend
- Rspec test framework
- Reactjs for the frontend
- PostgreSQL as the database

## Setup in a minute
- Clone the repo
- Ensure you have docker installed and running (see https://www.docker.com/)
- Run the command in the root directory `docker-compose build`, this will download all the necessary images and dependencies.
- Run the command `docker-compose run` to start the services in the docker-compose file(rails, react and postgresql)
- On your browser, visit localhost:5173 to see the app in development.

## Running Tests(backend)
- After the setup is complete, open a terminal in the root directory
- Run `docker-compose run api bundle exec rspec`
- If you run into a migration error, run the command `docker-compose run api bundle exec rails db:migrate RAILS_ENV=test`, then try to run the test command again

## Assumptions
A React client is used to consume an API built using Ruby on Rails.
A model `metrics` is used to store data(`timestamp, value, name`).
Raw sql was written to properly return the average data, this can also be done using ActiveRecord queries(I lean towards using sql query though)

## Possible Improvements
- **Metrics Category Model**: A model with a one-to-many relationship with the metrics model is needed(this should be the expected DB design), it can be called `metric_category`, this will help reduce data redundancy and improve data integrity
- **Add test on the client side**: Test is needed on the client side, Jest, Enzyme or any other JS compatible framework can be used.
- **Authentication**: Add authentication for a more secure and controlled access, this can easily be done by either using JWT, SSO or any other form of authentication deemed fit.
- **Authrorization**: This is needed to prevent unauthorized access to certain parts of the system
- **Chart Visualization**: Charts are needed to further visualize the data on the client side.
- **Separate repos for API and Client**: I would favour using separate repos for the API and Client, this will prevent conflicts and accidental changes.
