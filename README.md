# DTS Developer Technical Test

### Installation and run
`$ cd /client && npm i && cd ../server && npm i && cd ../`
Make sure Docker Desktop is running.
[Download Docker Desktop](https://www.docker.com/products/docker-desktop/)
`$ docker-compose up --build`
The above should build the [front end](http://localhost:80) the [back end](http://localhost:5000) and the [database](http://localhost:5432)

### Ports
[Client](http://localhost:80) React/Typescript
[Server](http://localhost:5000) Node/Typescript
[DB](http://localhost:5432) Postgresql

### Additional
There is a postman collection included, should you want to run some queries directly at the back end.

## DTS Test Requirements
### Backend API
The backend should be able to:
- Create a task with the following properties:
  - Title
  - Description (optional field)
  - Status
  - Due date/time
- Retrieve a task by ID
- Retrieve all tasks
- Update the status of a task
- Delete a task

### Frontend Application
The frontend should be able to:
- Create, view, update, and delete tasks
- Display tasks in a user-friendly interface

