# Signup-api

You can able to create register user for the accounts specified, with all CRUD operations in it

**Steps to run locally**

1. Go to run and run the command
   `touch .env`
2. add the below code for env
   ```
   TOKEN_SECRET=asdfasjflasjdflas
   TOKEN_EXPIRY=1d
   DATABASE_CONNECTION=mongodb://mongo/signup
   ```
3. run `docker-compose up`

That's it you are done,

1. Open up server, use `localhost:3000`
2. Open up mongo server in web, use `localhost:1234`

**End point documentation**
https://documenter.getpostman.com/view/3547695/T17AjAzd
