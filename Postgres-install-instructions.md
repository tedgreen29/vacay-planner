#Suggested PostgreSQL installation instructions#

  **These instructions are to install postres locally on a mac for testing purposes.**

##Instructions via Homebrew only:##

###First, make sure your Homebrew is up to date.###

    `brew update`

    > this is suggested

###Then, upgrade everything within homebrew.###

    `brew upgrade`

    > this will take a while to complete, and is a safety precaution

###To install postgres###

    `brew install postgresql`

###Starting/Stopping Postgres###

    *starting*
    `brew services start postgresql`

    *stopping*
    `brew services stop postgresql`

    postgres will be running on port 5432


##Setting up Users and Permissions##

    In a new terminal window, run the following command:
    `psql`

    This should show something similar to the following:
    `mycomputeruser=#`

---------------------------------------------------------
    if you've setup a password, use the following syntax:
    `psql -d mydb -U myuser`
---------------------------------------------------------

    You will need to setup a user to be able to access your DB so you don't use the root user (which is just ***bad form***)

    Do so by running the following command:
    `CREATE USER username PASSWORD 'stringInQuotes';`

    To check if your user was created:
    `SELECT usename FROM pg_user;`

    **This username and password combination you will use with sequelize**

##Creating Database and Schema##

    TBD