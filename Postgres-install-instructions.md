# Suggested PostgreSQL installation instructions

  **These instructions are to install postres locally on a mac for testing purposes.**

## Instructions via Homebrew only:

### First, make sure your Homebrew is up to date.

`brew update`

> this is suggested

### Then, upgrade everything within homebrew.

`brew upgrade`

> this will take a while to complete, and is a safety precaution

### To install postgres

`brew install postgresql`

### Starting/Stopping Postgres

*starting*
`brew services start postgresql`

*stopping*
`brew services stop postgresql`

postgres will be running on port 5432

## Creating Database

Run the following in command line:
`CREATEDB my_db;`

***Suggested***
`CREATEDB vacay_planner`

Log into postgresql from your newly created databases:
`psql my_db`

## Setting up Users and Permissions

You will need to setup a user to be able to access your DB so you don't use the root user (which is just *bad form*)

While logged into postgresql, create a new user role:
`CREATE ROLE username PASSWORD 'stringInQuotes';`

***Suggested***
`CREATE USER vacay PASSWORD 'planner';`


To check if your user was created, run the following in psql:
`SELECT USER usename FROM pg_user;`

**This username and password combination you will use with sequelize**

## Grant user Database Permissions

Postgres Users must be granted access to your database, so while still logged in as root you'll need to grant permissions to your user so they can access your database

Run the following in psql:
`GRANT ALL PRIVILEGES ON DATABASE my_db TO user;`

***Suggested***
`GRANT ALL PRIVILEGES ON DATABASE vacay_planner TO vacay;`


## That's all for setup

### List of Useful Commands in psql
`\?` help
`\l` list databases
`\c` db_name - connect to database
`\q` quits psql terminal

[other useful stuff](https://www.postgresql.org/docs/10/static/app-psql.html)
