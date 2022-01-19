# Sandbox Starter

Provides a basic starter template for a sandbox website

## Set-up

1. [Install yarn](https://classic.yarnpkg.com/en/docs/install)
1. Install project dependencies by running `yarn`

## Development

- Start development server by running `yarn start`
- Any top-level `.ejs` files within the `src/ejs` will have `HTMLWebpackPlugins` automatically configured. Files nested within subdirectories will need to be manually added to the Webpack config 
- By default, all pages will have the `main` chunk added (see the keys within the `entry` key in `webpack.config.js`). See `src/main.js` to see all the JS and SCSS files imported into this chunk. 

## Production

Build for production by running `yarn build:prod`
