# Sandbox Starter

Provides a basic starter template for a sandbox website

## Set-up

1. [Install yarn](https://classic.yarnpkg.com/en/docs/install)
2. Run `yarn setup` to install project dependencies and [setup deploying from the `build` folder to the GitHub Pages `gh-pages` branch](https://gist.github.com/cobyism/4730490#gistcomment-2375522)
3. [Set-up GitHub pages to work with the `gh-pages` branch](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source) in your repository settings

## Development

Run `yarn start`

### Tips
- All top-level `.ejs` files within the `src/ejs` will have `HTMLWebpackPlugin`s automatically added within `webpack.config.js`. Files nested within subdirectories will need to be manually added to the Webpack config 
- By default, all `.ejs` pages will have the `main` chunk added (see the keys within the `entry` key in `webpack.config.js`). See `src/main.js` to see all the JS and SCSS files imported into this chunk. 
- You need to restart the development server every time an `.ejs` page is added or removed as the entire Webpack config needs to change

## Deployment

Run `yarn deploy`

### Tips

- This is [a GitHub Page deployed from the `gh-pages` branch](https://gist.github.com/cobyism/4730490#gistcomment-2375522).
- This command will both build the production assets and deploy to the `gh-pages` branch so changes will be reflected on the sandbox site.
- You still need to [set-up GitHub pages to work with the `gh-pages` branch](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source) in your repository settings
