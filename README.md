# Currently Viewing App

Shows a list of IP addresses viewing the page

## Installation

The dev server has been tested using node v7.8.0 and v8.1.3, should work with v6.11.0 LTS and above.
The app itself had been tested in Firefox 54, Chrome 57 and 61, Safari 10.1, Safari iOS 10.2

- Install required dependencies with `npm i` or `yarn`
- Start the dev server with `npm start`
- Navigate to `localhost:9999`

## Tech

- Firebase as a "backend" to store and sync data
- React to render views
- Redux with Immutable data for state management
- Redux-Sagas to manage application state
- Webpack for building

## Requirements

Create a single-page web app that:

1. **Shows the list of IP addresses currently viewing the app**
2. **Show IP of the last connected user (separatelly)**
3. **When a new user opens the app, dynamically adds their IP address to the list of IPs**

## Guidelines

- You MUST include installation instructions so that it can be run locally be other developers.
- You MUST publish your solution as a public github repository.
- You SHOULD make extensive use of any React/Redux on frontend. For backend you can use any
- You SHOULD take as little or as long as you need (but don't overdo it). You will not be evaluated on time to complete.
- You SHOULD ask questions if anything specified here is not clear in any way.

## Instructions

1. Fork this github repository using your personal github account
2. Create your solution. Test it. Test it again to be sure. Commit it and push to your personal repo.
3. Submit a PR (pull request) back to this repository indicating your solution is ready for review

## Evaluation Criteria

You will be evaluated with the following in mind:

- Does the solution satisfy the three requirements?
- Does the solution run locally based on the provided instructions?
- Does the solution make good use of tools/frameworks/libraries/APIs?
- Does the implementation follow established best practices (design patterns, language usage, code formatting, etc..)?

Happy coding!


