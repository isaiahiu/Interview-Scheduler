# Interview Scheduler

Interviewer Scheduler is created as an educational exercise using React, where users can create, edit and delete interview appointments. The focus points are the different environments used in testing and development.

- Build components in isolation: Start with those at the outermost nodes of the component tree (e.g. buttons, individual list items) and work up the tree to the components that need to use the ones built first.
- Retrieve data from an API and render the data using components.
- Manage the visual state of the application including create, edit and delete capabilities.
- Implement advanced React patterns to manage the state and add live updates.

## Final Product

> Add
> ![](https://github.com/isaiahiu/Interview-Scheduler/blob/master/docs/appointment-add.gif?raw=true)

> Edit
> ![](https://github.com/isaiahiu/Interview-Scheduler/blob/master/docs/appointment-edit.gif?raw=true)

> Delete
> ![](https://github.com/isaiahiu/Interview-Scheduler/blob/master/docs/appointment-delete.gif?raw=true)

## Getting Started

- Install all dependencies with `npm install`.
- Run the Webpack Development Server with `npm start`
- Run the Jest Test Framework with the command `npm test`
- Run Storybook Visual Testbed with `npm run storybook`
- Once in the server, user can click on add appointment button to create a new appointment.
- User fills out the form by inputting a name and selecting interviewer, before clicking the Save button.
- User can edit existing appointments by clicking Edit button.

## Technical Specifications

- React
- Webpack
- Babel
- Axios
- Storybook
- Webpack Dev Server
- Testing Library
- Jest

## Project Features

#### Functional

- Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
- Data is persisted by the API server using a PostgreSQL database.
- The client application communicates with an API server over HTTP, using the JSON format.
- Jest tests are used through the development of the project.

#### Behavioural

- [x] Interviews can be booked between Monday and Friday.
- [x] A user can switch between weekdays.
- [x] A user can book an interview in an empty appointment slot.
- [x] Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- [x] A user can cancel an existing interview.
- [x] A user can edit the details of an existing interview.
- [x] The list of days informs the user how many slots are available for each day.
- [x] The expected day updates the number of spots available when an interview is booked or canceled.
- [x] A user is presented with a confirmation when they attempt to cancel an interview.
- [x] A user is shown an error if an interview cannot be saved or deleted.
- [x] A user is shown a status indicator while asynchronous operations are in progress.
- [x] When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- [x] The application makes API requests to load and persist data. We do not lose data after a browser refresh.
