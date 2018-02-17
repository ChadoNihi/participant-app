A React-Redux app for one interview assignment.
The visual design follows "pixel-perfect" requirements.

### TODO
- [ ] Write tests (and follow TDD henceforth)
- [ ] More sophisticated validation
- [ ] Reflect sort option in the URL
- [ ] Add pagination
- [ ] Make the layout responsive despite the instructions.
- [ ] Switch to CSS Grid? (This would simplify CSS but have worse browser support.)
- [ ] Switch to [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules)
- [ ] Allow configuring the app (e.g. required fields) via a config file
- [ ] Automate favicon generation (see e.g. [favicons-webpack-plugin](https://www.npmjs.com/package/favicons-webpack-plugin))

## Run locally
1) `git clone https://github.com/ChadoNihi/participant-app.git && cd participant-app`
2) Install dependencies with `yarn install` (or `npm install`). (See the dependencies in `package.json`.)
3) Run the app in development mode with `yarn start` (or `npm start`). (Open [http://localhost:3000](http://localhost:3000) to view it in the browser.) To build the app for production: `yarn build` (or `npm run build`). (See all available commands in Create React App's [docs.](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#available-scripts).)

## Tests
Run tests with `yarn test` (or `npm test`).
