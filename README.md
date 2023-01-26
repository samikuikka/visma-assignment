
# Visma Solutions - programming task

## About the app

The implementation is small Node application written in TypeScript.
Validation is done using Zod TypeScript-schema validation library.

From the assignment handout, I inferred that the identity-management would be a server which is contacted through various different application with API calls. We have 3 types of different type of requests that are used in the application. This assignment tries to make sure that requests are validated and type-safe, thus the implementation focuses on validating the incoming requests to identity-management service.

I created a self-validating class "IdentitfiedRequest" which takes an URL and returns the path and URLSearchParams as key value pairs. For unvalid requests, the new instance of the class IdentifiedRequest gives an Error, thus I can catch the errors when the new instance of the class is created.

Then this Class could be used when new requests come to the identity-management server. By creating the new IdentityRequest where the request url is set as parameter, we can use the requests with knowledge that the parameters of the requests are in the right format. 

I really did not run into any worth-mentioning challenges while implementing. This is due to using test-driven-development in the process. I created many unit tests which showed me the bugs in the application and overall made the development much more structured. The biggest challenge was ambiguity of the client , thus I tried to make as generic class for validating requests as possible.

Client part of the assignment was bit ambiguous and implementation could be improved when getting more information about the client and what it should actually do. In this project I considered it to be router (e.g., API route of Express.js).  The assignment mentions many times about "create a class", thus I created a class for this problem. However, if the requests is send to an API endpoint, I could do the same validation logic in custom middleware (or functions). To further improve the application I would need more info about the context the class would be used.

## Running the application
I created unit tests for the Class which can be run with npm test command. (Node needed)
```bash
npm i
npm test
```