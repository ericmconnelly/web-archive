## archive-machine

A web archiving machine using express

## USER FLOW

#### Go to the main page

![main](https://github.com/leeric92/web-archive/blob/master/images/main.png)

#### Enter the url to archive

![typeurl](https://github.com/leeric92/web-archive/blob/master/images/typeurl.png)

#### Receive job ID and check status

![status](https://github.com/leeric92/web-archive/blob/master/images/status.png)

#### After a second, enter the job ID to view result

![result](https://github.com/leeric92/web-archive/blob/master/images/result.png)

## AUTHOR
Eric Le, therealericle@gmail.com

## BROWSER
Chrome

## INSTALLING DEPENDENCIES

Fork and clone this repo to your local machine

Type these commands to get started:


1. Follow this link to install Homebrew (`http://brew.sh/`) if you don't have one
2. `brew install node` if you haven't installed nodejs
3. `brew install mysql` if you haven't installed mysql
4. `npm install` node dependencies
5. In a separate tab of terminal in a same directory, type in `mysql -u root < ./schema.sql`
6. Finally, run `npm start`
7. Go to 'http://localhost:8080'
8. Enjoy using the app

## TECH STACK

### FRONT END

- HTML, CSS, jQuery

### BACK END

- Node/Express
- MySQL

### API

**'/api/job'**

  post '/addjob'         : Add a new job when user type in a new url
  post '/status'         : Get a job status

### DESIGN DECISION

I use Node and Express to run server and construct a RESTful API to allow user to queue up job request and request job status. Node and Express makes it easy to organize application into components and come with a lot of built-in, third-party middlewares such as url-parser, morgan and cors.

On the front end, I use simple HTML and CSS to construct the view and input field. Because no data binding is necessary, I avoid using framework such as Angular or React.







