# BLOG JSON API

JSON API implemented with Typescript. Allows to manage anonymous blogs and their comments.
This version was builded with Express framework and Mongoose ODM.

## Start

1. run `npm install`
2. start mongod service
3. run `npm run compile`
4. run `npm run start`

## Considerations

- Endpoint of blogs is localhost:3000/blogs/:id
- Endpoint of comments is localhost:3000/blogs/:id/comments/:id
- API only allows JSON

## API examples

> Examples of the usage of the API can be found as Postman documentation [here](https://documenter.getpostman.com/view/9673662/SWE9YGJ3?version=latest)
