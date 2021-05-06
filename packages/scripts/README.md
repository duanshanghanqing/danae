# a front end build script tool

## install

    npm install danae-scripts

    or

    yarn add danae-scripts

## support

    vue and reacr project

## dev

    danae-scripts start

    default port 3000
    open http://localhost:3000

## build

    danae-scripts build

# support you to extend your own webpack profile


    webpack.config.js

        // development stage
        if (process.env.NODE_ENV === 'development') {
            module.exports = {
                ...
            }
        } else {
            module.exports = {
                ...
            }
        }
