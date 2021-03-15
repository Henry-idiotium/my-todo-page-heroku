# my-todo-page-heroku Description
This app was a learning curve for me to getting to understand the world of cloud computing, which has up and down (mostly down, tho).
This app was built with NodeJS as a language of choice, PostgreSQL as a database addon on Heroku and other dependencies can be seen in the [package.json](https://github.com/Henry-idiotium/my-todo-page-heroku/blob/main/cloud-todo-page/package.json).
The content table below serve the purpose of providing understanding to beginers the process of deploying an app to Heroku. 

# Content Table — Deployment process
### 1.	Git configuration
#### 1.1.	Git init
Initialize a  **.git**  file to manage changes for the project folder.

#### 1.2.	Git add
Git add set the changes to the staging area. The figure below, use  ```$ git add .```  means that it add the current directory.

#### 1.3.	Git commit
Git commits to saving the changes to the local repository and prepare to push to the public repository.
```
$ git commit -am 'reasons'
```

#### 1.4.	Git move to branch main 
Change to branch main and destroy the branch master to avoid the term. The purpose of such a step is from the GitHub suggestion.
```
$ git checkout -b main
$ git branch -D master
```
### 2.	Heroku configuration 
#### 2.1.	Heroku login
Heroku provide two login methods: via the terminal or the web, which only differ in the command line, the additional of  ```-i```  command in ```heroku login```. The purpose is to ensure authentication in different wifi (wire) connections.

#### 2.2.	Heroku create
Initialize a cloud app (instance) with the name of my-second-todo-page.
```
$ heroku create your-app-name
```

#### 2.3.	Heroku git remote
Link the local repository to the Heroku app repository.
```
$ heroku git:remote -a your-app-name
```

#### 2.4.	Git push heroku main
Upload the commit to the Heroku repository.
```
$ git push heroku main
```
### 3.	DB configuration
#### 3.1.	Provisioning Heroku Postgres
Configuring the Heroku app with a database addon. Can be done with the command line below or via the web. (depend on your reference)
```
$ heroku addons:create heroku-postgresql:hobby-dev
```

#### 3.2.	Initialize schema and seed
To be able to have the app become a RESTful API, it must have a similar schema to the one it builds up with.
```
$ heroku psql
```
After open the heroku postgres cli the schema can be manually type, or using the folowing command to make it do it for you. ([schema.sql](https://github.com/Henry-idiotium/my-todo-page-heroku/blob/main/cloud-todo-page/schema.sql))
```
your-app-name-database=>  \i project-folder/schema.sql
```

### 4.	Test Solution
Type ```$ heroku open``` in the terminal to open the app.
