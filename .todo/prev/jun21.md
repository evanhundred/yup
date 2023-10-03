## June 21

notes from `store/businesses.js`

```js
{"title":"Server Error",
"message":"ActiveRecord::RecordNotFound - Couldn't find Business with 'id'=22",
"stack":["app/controllers/api/businesses_controller.rb:15:in `show'"]}

Response {
type: "basic",
url: "http://localhost:3000/api/businesses/22",
redirected: false,
status: 500,
ok: false,
statusText: "Internal Server Error",
headers: Headers(21),
body: ReadableStream, bodyUsed: false
}

dispatch(receiveErrors(data));
```

this was the error returned with the previous implementation of Business Show Page.
new version solves this by checking `businessId` param with total number of businesses in the database.
