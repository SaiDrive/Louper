# Louper Interview

You are given a basic outline of a project. Here we are basically using the MERN stack. Follow the instructions and complete the task.

## Frontend

### Part 1

1. In the App.tsx, we cannot see the list of cards. Find the bug and fix it so that the cards are visible in the frontend.
2. Once the cards are visible, you will find the heights of the cards depend of the text. Modify the card component in "/src/components/Card.tsx" such that the cards have a fixed height and the body of the card is scrollable if the text is very long.
3. Implement the fetchData function:
   a. The fetchData function will send a get request to "https://jsonplaceholder.typicode.com/todos" and fetch the data.
   b. After fetching the data, save the data in a new variable `todos` and render it in the frontend along with the existing two cards.
   (Note: Use the `axios` library for the http requests)
4. Implement the "Upload" button:
   a. The upload button will send the data in the `data` and `todos` variable to the backend server when clicked
   b. Display an alert on successful submission.

### Part 2

1. Implement a socket emit with event name, `get-data` from the frontend which is triggered on clicking a button in the UI called `Socket Fetch`.(Note: Use the already installed socket.io-client library for this)
2. Implement a socket event listener which listens to the `receive-data` event from the backend and receives to the data from the backend and saves it to some variable and renders it in the frontend.

## Backend

### Part 1

1. In the backend folder implement a route "http://localhost:5000/data" which takes the data from the frontend and inserts it into a MongoDB collection.
   (Note: You can use any MongoDB driver you want)

### Part 2

1. Update the given express server to a socket server supporting both HTTP requests and socket connections.(Note: Use the already installed socket.io library for this)
2. Implement a socket event listener with event name, `get-data` which when called, connects to the MongoDB and emits a socket call `receive-data` with the list of todos that are stored in DB from Part 1.

## Database

You have to use a MongoDB instance for this task, which can be a local DB or cloud DB example Atlas. Make sure to use environment variables for storing the DB connection url.

## Project Overview

The `backend` folder has the backend files. Use the config file to set the env variables accordingly. Make new folders to organise your project well. The index.ts is the entrypoint for the backend.

The `src` folder has the frontend files. With index.tsx as the entrypoint. You are free to use CSS but the frontend does have TailwindCSS setup so it is preferrable if you use TailwindCSS.

## Submission

1. Complete the above steps.
2. Remove the node_modules folders and zip the whole code folder.(so that the zip file is smaller in size)
3. Name the zip file with Louper_YOUR_FULL_NAME.zip
4. Reply to the email we sent you with a BRIEF overview of how you went about completing the task, and attach your .zip file to the email.
5. Send the submission by no later than 11am IST on Tuesday 30 May.

Good luck, feel free to reach me with any queries at sayan@louper.io.
