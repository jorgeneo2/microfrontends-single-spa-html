
# Coexisting Angular Microfrontends

Main guide: https://github.com/joeldenning/coexisting-angular-microfrontends

This is a starter-kit / example repository for people who want to have multiple angular microfrontends coexist within a single page. Each
of the angular applications was created and is managed by Angular CLI.

It uses [single-spa](https://single-spa.js.org) to pull this off, which means that you can even add React, Vue, or other frameworks as
additional microfrontends.

For mapping routes to applications it uses [single-spa-layout](https://single-spa.github.io/single-spa.js.org/docs/layout-overview/).

## An important note
The root-html-file project should also be in its own repo. This is what lets different teams and developers be in
charge of different microfrontends.

Follow tags:
- "WITH LOCAL SCRIPT LOADING ./src/loadAssets.js"       : load the loadAssets.js in a script tag.
- "WITH SCRIPT LOADING load-assets"                     : load the loadAssets.js inside method Promise.all wait for the load to finish load-assets.
- "WITH SCRIPT LOADING load-assets USING Promise.all"   : load the loadAssets.js operations in parallel and wait for all to finish.
- "SIMPLE MICROFRONTEND REGISTRATION"                   : load the microfrontend in a simple way.
- "REGISTRATION GENERATING MICROFRONTEND ROUTES"        : load several microfrontend with their respective route.

## Local development -- all at once
It is preferred to only run one app at a time. But if you need to run them all locally, you can do so with the following instructions

```sh
# First terminal tab
cd root-html-file
npm install
npm start
```
```sh
# Second terminal tab
git clone https://github.com/jorgeneo2/header.git
cd header
npm i
npm start:local
```
Test: http://localhost:4201/main.js

```sh
# Third  terminal tab
git clone https://github.com/jorgeneo2/footer.git
cd footer
npm i
npm start
```
Test: http://localhost:4202/main.js

Now go to http://localhost:4200 in a browser. Note that you can change any of the ports for the projects by modifying the Import Map inside of
root-html-file/index.html.

If you get serious about deploying your code, you'll want to make it no longer necessary to boot up all of the apps in order to do anything.
When you get to that point, check out [import-map-overrides](https://github.com/joeldenning/import-map-overrides/), which lets you go to
a deployed environment and override the [Import Map](https://github.com/WICG/import-maps) for just one microfrontend at a time. The
import-map-overrides library is already loaded in the index.html of root-html-file, so you can start using it immediately. You can make your
deployed environment overridable, just like you can do overrides on http://coexisting-angular-microfrontends.surge.sh

## More documentation
Go to https://github.com/CanopyTax/single-spa-angular to learn how all of this works.

## Compatibility
Fetch: https://caniuse.com/fetch
