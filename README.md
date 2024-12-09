<p align="center">
  <img src="./screenshot.png" width=800 title="ui design">
</p>

# Todo app challenge

1. Functionality:

   - Users can create, edit, and delete to-do items.
   - Users can mark to-do items as complete.
   - The app should display a list of all to-do items.

2. Technical Specifications:
   - Frontend: React Native with TypeScript.
   - Backend: Node.js with a backend framework of your choice
   - Database: Choose a database suitable for your backend framework
   - Authentication: Implement simple session-based authentication. No need for detailed user profiles (name, last name, email are not required)
   - Concurrency: The app should support multiple users concurrently.
   - Cross-Platform Compatibility: The app must compile and run on Android, iOS, and web.

## Pre-requisites

- Docker and docker compose installed ([download link](https://www.docker.com/)).
- No services running on localhost port 8080, 8081 and 3307.

### Run APP with Docker (web version only)

```
# Run app
docker compose up -d
```

- Now you can open your browser and go to http://localhost:8081
- In some cases the first time you run the app with docker it hangs out with a loading spinner. If you reload the browser it'll work correctly

```
# Stop app
docker compose down -v
```

### Run backend tests with Docker (front end tests coming soon!)

```
docker-compose run backend-test
```

### Run APP with iOS Simulator, Android emulator or Android device

- follow instructions in /client/todo-app/README.md file

### Features

- create tasks items using the input at the bottom and the + button to submit
- edit tasks titles by simply clicking/tapping on the task item and typing. When tapping somewhere else app will save the changes
- mark a task as cmopleted by clicking/tapping the checkbox
- delete a task by clicking/tapping the trash bin icon

## Technology

- Programming languaje: Typescript
- APP Frameworks: React Native with Expo, Node, Express
- Database: MySQL
- Containers: Docker, Docker-compose

### More details

- more details can be found in client/todo-app/[README.md](/client//todo-app/README.md) and in server/[README.md](/server/README.md)
