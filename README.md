# ELot
 Welcome to the ELot ReadMe! ELot is a simulated market storefront inspired by Ebay and Gamestop.

 This caused an idea to where what if you had a store that had news from the users and products from the users as well, only being a middleman company?

 This shows the idea, with Products, both Traditional and Electronic, articles on these topics, a Transaction and Cart system, and finally a Review System for purchased products.

 ## Tech Stack

### Frameworks and Libraries:
![Static Badge](https://img.shields.io/badge/Javascript-grey?style=for-the-badge&logo=javascript)
![Static Badge](https://img.shields.io/badge/React-333c46?style=for-the-badge&logo=react)
![Static Badge](https://img.shields.io/badge/Redux-purple?style=for-the-badge&logo=redux)
![Static Badge](https://img.shields.io/badge/Python-blue?style=for-the-badge&logo=python&logoColor=gold)
![Static Badge](https://img.shields.io/badge/Flask-black?style=for-the-badge&logo=flask)
![Static Badge](https://img.shields.io/badge/CSS3-blue?style=for-the-badge&logo=css3)
![Static Badge](https://img.shields.io/badge/HTML5-orange?style=for-the-badge&logo=html5&logoColor=white)

### Database:
![Static Badge](https://img.shields.io/badge/HTML5-blue?style=for-the-badge&logo=Postgresql&logoColor=white)
### Hosting:
![Static Badge](https://img.shields.io/badge/Render-black?style=for-the-badge&logo=Render&logoColor=white)
## Wiki Articles
[Feature List](https://github.com/PR55/Capstone-Project/wiki/MVP-Features) | [Schema](https://github.com/PR55/Capstone-Project/wiki) | [User Stories](https://github.com/PR55/Capstone-Project/wiki/User-Stories)

## Screenshots

### NavBar
<img src='https://github.com/user-attachments/assets/cff8af3e-137f-414b-a5b3-949129d2b83f' width='75%'/>

### Homepage
<img src='https://github.com/user-attachments/assets/d2fa628a-bbb8-4695-b257-b72b68d39750' width='75%'/>

### Product Browser
<img src='https://github.com/user-attachments/assets/382021a9-3770-451b-b6cc-139cf8cd9ac6' width='75%'/>

### Product Browser Pagination
<img src='https://github.com/user-attachments/assets/0d2edab3-913b-41ee-b08b-a6fcf03c5749' width='75%'/>
<img src='https://github.com/user-attachments/assets/14a4b99c-2412-495b-b813-8bd76bc5ad0b' width='75%'/>

### Product Browser Filter and Add to Cart
<img src='https://github.com/user-attachments/assets/0ff8bbb9-18a9-4132-8bf0-3533414abb33' width='75%'/>

### Homepage
<img src='https://github.com/user-attachments/assets/d070a160-02c7-49f6-989f-fc8e756a22cb' width='75%'/>

# API Documentation
## User Routes `/api/users`

### Endpoint `GET /`
Description: Queries for all users and returns them in a list of user dictionaries

Authentication: Logged In

Response 200 OK:
```json
{
    "users":[
        {
            "id":1,
            "username":"demo",
            "email":"demo@aa.io"
        }
    ]
}
```

### Endpoint `GET /:userId`
Description: Queries for a specific user, getting all info needed to see their profile

Parameters:

* `:userId` Id of the user

Response 200 OK:
```json
{
    "user":{
            "id":1,
            "username":"demo",
            "email":"demo@aa.io",
            "products":[
                {
                    "id":1,
                    "name":"Conker's Bad Fur Day",
                    "description":"Product Description",
                    "isTraditional":false,
                    "images":[
                        {
                            "id":1,
                            "imageUrl":"URL"
                        }
                    ],
                    "owner":{
                        "id":1,
                        "username":"demo",
                        "email":"demo@aa.io"
                    },
                    "price":13.99,
                    "purchased":false,
                    "tags":[
                        {
                            "id":1,
                            "tag":"Nintendo"
                        }
                    ],
                    "timeCreated":"TimeCreated",
                    "timeUpdated":"TimeUpdated",
                }
            ],
            "articles":[
                {
                    "id":1,
                    "title":"Article Title",
                    "body":"Article Body",
                    "owner":{
                        "id":1,
                        "username":"demo",
                        "email":"demo@aa.io"
                    },
                    "tags":[
                        {
                            "id":1,
                            "tag":"Nintendo"
                        }
                    ],
                    "imageUrl":"Article Image URL",
                    "timeCreated":"TimeCreated",
                    "timeUpdated":"TimeUpdated",
                }
            ],
            "madeReviews":[
                {
                    "id":1,
                    "reviews":"Review Text",
                    "rating":3,
                    "owner":{
                        "id":1,
                        "username":"demo",
                        "email":"demo@aa.io"
                    },
                    "product":4,
                    "timeUpdated":"Last Creation or Update Time"
                }
            ]
        }
}
```

Respone 404 Not Found:
```json
{
    "message":"User does not exist"
}
```

### Endpoint `GET /products`
Description: Queries for all products belonging to the current logged in user

Authentication: Logged In

Response 200 OK:
```json
{
    "products":[
        {
            "id":1,
            "name":"Conker's Bad Fur Day",
            "description":"Product Description",
            "isTraditional":false,
            "images":[
                {
                    "id":1,
                    "imageUrl":""
                }
            ],
            "owner":{
                "id":1,
                "username":"demo",
                "email":"demo@aa.io"
            },
            "price":13.99,
            "purchased":false,
            "tags":[
                {
                    "id":1,
                    "tag":"Nintendo"
                }
            ],
            "timeCreated":"TimeCreated",
            "timeUpdated":"TimeUpdated",
        }
    ]
}
```

### Endpoint `GET /articles`
Description: Queries for all articles of the current logged in user

Authentication: Logged In

Response 200 OK:
```json
{
    "articles":[
        {
            "id":1,
            "title":"Article Title",
            "body":"Article Body",
            "owner":{
                "id":1,
                "username":"demo",
                "email":"demo@aa.io"
            },
            "tags":[
                {
                    "id":1,
                    "tag":"Nintendo"
                }
            ],
            "imageUrl":"Article Image URL",
            "timeCreated":"TimeCreated",
            "timeUpdated":"TimeUpdated",
        }
    ]
}
```

## Auth Routes `/api/auth`

### Endpoint `GET /`
Description: Authenticates a user

Response 200 OK:
```js
{
    "user":{
        id:1,
        username:"demo",
        email:"demo@aa.io"
    }
}
```

Respone 401 Unauthorized:
```js
{
    "message":"unauthorized"
}
```

### Endpoint `POST /login`
Description: Logs in a user

Request:
```json
{
    "email" :"demo@aa.io",
    "password" : "USERPASSWORD"
}
```

Response 200 OK:
```json
{
    "user":{
        "id":1,
        "username":"demo",
        "email":"demo@aa.io"
    }
}
```

Respone 401 Unauthorized:
```json
{
    "email":[
        "Data Required",
        "Email Provided not found"
    ],
    "password":[
        "Data Required",
        "No such user exists",
        "Password was incorrect"
    ],
}
```

### Endpoint `GET /logout`
Description: Logs out the current user

Response 200 OK:
```json
{
    "message": "User logged out"
}
```

## Endpoint `POST /signup`
description: Signs up a new user to the site

request:
```json
{
    "username":"navi",
    "email":"lookatme@aa.io",
    "password":"S0M3C00LP4SSW0RD",
}
```

Response 200 OK:
```json
{
    "id":2,
    "email":"lookatme@aa.io",
    "username":"navi"
}
```

Response 401:
```json
{
    "username":["Username is already in use","Data Required"],
    "email":["Email is already in use","Data Required"],
    "password":"Data Required",
}
```

## Endpoint `GET /unauthorized`
Description: Returns an unauthorized JSON when flask-login authentication fails

Response 401:
```json
{
    "message":"Unauthorized"
}
```


## Product Routes `/api/products`

## ENDPOINT `GET /`
Description: Grab all products from the database

Response 200 OK:
```json
{
    "products":[
        {
            "id":1,
            "name":"Conker's Bad Fur Day",
            "description":"Product Description",
            "isTraditional":false,
            "images":[
                {
                    "id":1,
                    "imageUrl":""
                }
            ],
            "owner":{
                "id":1,
                "username":"demo",
                "email":"demo@aa.io"
            },
            "price":13.99,
            "purchased":false,
            "tags":[
                {
                    "id":1,
                    "tag":"Nintendo"
                }
            ],
            "timeCreated":"TimeCreated",
            "timeUpdated":"TimeUpdated",
        }
    ]
}
```

## ENDPOINT `GET /:productId`
Description: Grab a single product from the database

Parameters:

* `:productId` Id of the product

Response 200 OK:
```json
{
    "product":{
        "id":1,
        "name":"Conker's Bad Fur Day",
        "description":"Product Description",
        "isTraditional":false,
        "images":[
            {
                "id":1,
                "imageUrl":""
            }
        ],
        "owner":{
            "id":1,
            "username":"demo",
            "email":"demo@aa.io"
        },
        "price":13.99,
        "purchased":false,
        "tags":[
            {
                "id":1,
                "tag":"Nintendo"
            }
        ],
        "timeCreated":"TimeCreated",
        "timeUpdated":"TimeUpdated",
    }
}
```

Response 404:
```json
{
    "message":"Product Not Found",
    "errors":{
        "product":"Product does not exist"
    }
}
```

## ENDPOINT `POST /`
Description: Make a new product in the database

Authentication: Logged In

Request:
```json
{
    "name":"Pokemon Emerald",
    "description":"Travel throguh the hoenn region to stop team aqua and magma!",
    "price":95.99,
    "tags":[
        "Pokemon",
        "Nintendo",
        "GameBoy Advance",
    ],
    "isTraditional":false,
    "image":"Valid Image File",
}
```

Response 200 OK:
```json
{
    "product":{
        "id":2,
        "name":"Pokemon Emerald",
        "description":"Travel throguh the hoenn region to stop team aqua and magma!",
        "isTraditional":false,
        "images":[
            {
                "id":2,
                "imageUrl":"AWS URL"
            }
        ],
        "owner":{
            "id":1,
            "username":"demo",
            "email":"demo@aa.io"
        },
        "price":95.99,
        "purchased":false,
        "tags":[
            {
                "id":3,
                "tag":"Pokemon",
            },
            {
                "id":4,
                "tag":"Nintendo",
            },
            {
                "id":5,
                "tag":"GameBoy Advance",
            },
        ],
        "timeCreated":"TimeCreated",
        "timeUpdated":"TimeUpdated",
    }
}
```

Response 400:
```json
{
    "message":"Bad Request",
    "errors":{
        "name":"Data Required",
        "description":"Data Required",
        "price":"Data Required",
        "tags":"Data Required",
        "isTraditional":"Data Required",
        "image":[
            "File is Required",
            "Not a valid file type"
        ],
    }
}
```

## ENDPOINT `PUT /:productId`
Description: Update a single product in the database

Authentication: Logged In, Owner of the Product

Parameters:

* `:productId` Id of the product

Request:
```json
{
    "name":"Pokemon Emerald 2",
    "description":"Travel throguh the hoenn region to stop team aqua and magma!",
    "price":97.99,
    "tags":[
        "Pokemon",
        "GameBoy Advance",
    ],
    "isTraditional":false,
    "addImage":true,
    "deleteImages":true,
    "image":"Valid Image File",
}
```

Response 200 OK:
```json
{
    "product":{
        "id":2,
        "name":"Pokemon Emerald 2",
        "description":"Travel throguh the hoenn region to stop team aqua and magma!",
        "isTraditional":false,
        "images":[
            {
                "id":2,
                "imageUrl":"NEW AWS URL"
            }
        ],
        "owner":{
            "id":1,
            "username":"demo",
            "email":"demo@aa.io"
        },
        "price":97.99,
        "purchased":false,
        "tags":[
            {
                "id":3,
                "tag":"Pokemon",
            },
            {
                "id":4,
                "tag":"GameBoy Advance",
            },
        ],
        "timeCreated":"TimeCreated",
        "timeUpdated":"TimeUpdated",
    }
}
```
Response 404:
```json
{
    "message":"Product Not Found",
    "errors":{
        "product":"Product does not exist"
    }
}
```

Response 400:
```json
{
    "message":"Bad Request",
    "errors":{
        "name":"Data Required",
        "description":"Data Required",
        "price":"Data Required",
        "tags":"Data Required",
        "isTraditional":"Data Required",
        "addImage":"Data Required",
        "deleteImages":"Data Required",
        "image":"Not a valid file type",
    }
}
```

Response 401 Unauthorized:
```json
{
    "message":"Not the owner of the product post"
}
```

## ENDPOINT `DELETE /:productId`
Description: Delete a single product from the database

Authentication: Logged In, Owner of the Product

Parameters:

* `:productId` Id of the product

Response 200 OK:
```json
{
    "id":1
}
```

Response 404:
```json
{
    "message":"Product Not Found",
    "errors":{
        "product":"Product does not exist"
    }
}
```
Response 401 Unauthorized:
```json
{
    "message":"Not the owner of the product post"
}
```

## Image Routes `/api/images`

## EndPoint `POST /:productId`
Description: Add one photo to a specific product

Authentication: Logged In, Owner of the Product

Parameters:

* `:productId` Id of the product

Request:
```json
{
    "image":"Image File"
}
```

Response 200 OK:
```json
{
    "product":{
        "id":2,
        "name":"Pokemon Emerald",
        "description":"Travel throguh the hoenn region to stop team aqua and magma!",
        "isTraditional":false,
        "images":[
            {
                "id":2,
                "imageUrl":"AWS URL"
            },
            {
                "id":3,
                "imageUrl":"NEW AWS URL"
            }
        ],
        "owner":{
            "id":1,
            "username":"demo",
            "email":"demo@aa.io"
        },
        "price":97.99,
        "purchased":false,
        "tags":[
            {
                "id":3,
                "tag":"Pokemon",
            },
            {
                "id":4,
                "tag":"GameBoy Advance",
            },
        ],
        "timeCreated":"TimeCreated",
        "timeUpdated":"TimeUpdated",
    }
}
```

Response 400:
```json
{
    "message":"Bad Request",
    "errors":{
        "image":[
            "File is Required",
            "Not a valid file type"
        ],
    }
}
```

Response 404:
```json
{
    "message":"Product Not Found",
    "errors":{
        "product":"Product does not exist"
    }
}
```
Response 401 Unauthorized:
```json
{
    "message":"Not the owner of the product post"
}
```

## Endpoint `DELETE /:imageId`
Description: Delete a specific image from the database

Authentication: Logged In, Owner of the Product

Parameters:

* `:imageId` Id of the image

Response 200 OK:
```json
{
    "product":{
        "id":2,
        "name":"Pokemon Emerald",
        "description":"Travel throguh the hoenn region to stop team aqua and magma!",
        "isTraditional":false,
        "images":[
            {
                "id":3,
                "imageUrl":"AWS URL"
            }
        ],
        "owner":{
            "id":1,
            "username":"demo",
            "email":"demo@aa.io"
        },
        "price":97.99,
        "purchased":false,
        "tags":[
            {
                "id":3,
                "tag":"Pokemon",
            },
            {
                "id":4,
                "tag":"GameBoy Advance",
            },
        ],
        "timeCreated":"TimeCreated",
        "timeUpdated":"TimeUpdated",
    }
}
```

Response 404:
```json
{
    "message":"Image could not be found"
}
```

Response 401 Unauthorized:
```json
{
    "message":"Must be the owner to perform this action"
}
```

## Article Routes `/api/articles`

## Endpoint `GET /`
Description: Get all articles in the database
Response 200 OK:
```json
{
    "articles":[
        {
            "id":1,
            "title":"Article Title",
            "body":"Article Body",
            "owner":{
                "id":1,
                "username":"demo",
                "email":"demo@aa.io"
            },
            "tags":[
                {
                    "id":1,
                    "tag":"Nintendo"
                }
            ],
            "imageUrl":"Article Image URL",
            "timeCreated":"TimeCreated",
            "timeUpdated":"TimeUpdated",
        }
    ]
}
```

## Endpoint `GET /:articleId`
Description: Get one article in the database

Parameters:

* `:articleId` Id of the article

Response 200 OK:
```json
{
    "article":{
        "id":1,
        "title":"Article Title",
        "body":"Article Body",
        "owner":{
            "id":1,
            "username":"demo",
            "email":"demo@aa.io"
        },
        "tags":[
            {
                "id":1,
                "tag":"Nintendo"
            }
        ],
        "imageUrl":"Article Image URL",
        "timeCreated":"TimeCreated",
        "timeUpdated":"TimeUpdated",
    }
}
```

Response 404:
```json
{
    "message":"Article not found"
}
```


## Endpoint `POST /`
Description: Make a new article in the database

Authentication: Logged In

Request:
```json
{
    "title":"This is my article!",
    "body":"I wonder what I should write?",
    "tags":["Co-Op"],
    "image":"IMAGE FILE"
}
```

Response 200 OK:
```json
{
    "article":{
        "id":2,
        "title":"This is my article!",
        "body":"I wonder what I should write?",
        "owner":{
            "id":1,
            "username":"demo",
            "email":"demo@aa.io"
        },
        "tags":[
            {
                "id":1,
                "tag":"Co-Op"
            }
        ],
        "imageUrl":"NEW AWS URL",
        "timeCreated":"TimeCreated",
        "timeUpdated":"TimeUpdated",
    }
}
```

Response 400:
```json
{
    "message":"Bad Request",
    "errors":{
        "title":"Data Required",
        "body":"Data Required",
        "tags":"Data Required",
        "image":[
            "File Required",
            "Not a valid file type"
        ]
    }
}
```

## Endpoint `PUT /:articleId`
Description: Update an article in the database

Authentication: Logged In, Owner of the Article

Parameters:

* `:articleId` Id of the article

Request:
```json
{
    "title":"This is my article 2!",
    "body":"I wonder what I should write? There are so many options!",
    "tags":["Co-Op"],
    "changeImage":true,
    "image":"IMAGE FILE"
}
```

Response 200 OK:
```json
{
    "article":{
        "id":2,
        "title":"This is my article 2!",
        "body":"I wonder what I should write? There are so many options!",
        "owner":{
            "id":1,
            "username":"demo",
            "email":"demo@aa.io"
        },
        "tags":[
            {
                "id":1,
                "tag":"Co-Op"
            }
        ],
        "imageUrl":"NEW AWS URL",
        "timeCreated":"TimeCreated",
        "timeUpdated":"TimeUpdated",
    }
}
```

Response 400:
```json
{
    "message":"Bad Request",
    "errors":{
        "title":"Data Required",
        "body":"Data Required",
        "tags":"Data Required",
        "changeImage":"Data Required",
        "image":"Not a valid file type"
    }
}
```

Response 404:
```json
{
    "message":"Article not found"
}
```

Response 401 Unauthorized:
```json
{
    "message":"Must be owner of the Article"
}
```

## Endpoint `DELETE /:articleId`
Description: Delete an article in the database

Authentication: Logged In, Owner of the Article

Parameters:

* `:articleId` Id of the article

Response 200 OK:
```json
{
    "id":2
}
```

Response 404:
```json
{
    "message":"Article not found"
}
```

Response 401 Unauthorized:
```json
{
    "message":"Must be owner of the Article"
}
```

## Transaction Routes `/api/transactions`

## Endpoint `GET /`
Description: Get all transactions that are related to the current user

Response 200 OK:
```json
{
    "transactions":[
        {
            "id":1,
            "owner":{
                "id":1,
                "username":"demo",
                "email":"demo@aa.io",
            },
            "status":"pending",
            "products":[
                {
                    "id":1
                    // Product Info
                },
                {
                    "id":2
                    // Product Info
                },
                {
                    "id":4
                    // Product Info
                },
            ]
        }
    ]
}
```

## Endpoint `GET /:transactionId`
Description: Get one Transaction by the Id

Response 200 OK:
```json
{
    "transaction":{
        "id":1,
        "owner":{
            "id":1,
            "username":"demo",
            "email":"demo@aa.io",
        },
        "status":"pending",
        "products":[
            {
                "id":1
                // Product Info
            },
            {
                "id":2
                // Product Info
            },
            {
                "id":4
                // Product Info
            },
        ]
    }
}
```

Reponse 404:
```json
{
    "message":"Transaction could not be found"
}
```

## Endpoint `POST /`
Description: Make a purchase and insert a new transaction entry and the corresponding transaction detail entries to the database

Authentication: Login Required

Request:
```json
///MUST BE A STRINGIFIED JSON
{
    "products":[
        5,6,7,8
    ]
}
```

Response 200 OK:
```json
{
    "id":2,
    "owner":{
        "id":1,
        "username":"demo",
        "email":"demo@aa.io",
    },
    "status":"pending",
    "products":[
        {
            "id":5
            // Product Info
        },
        {
            "id":6
            // Product Info
        },
        {
            "id":7
            // Product Info
        },
        {
            "id":8
            // Product Info
        },
    ]
}
```

Response 400:
```json
{
    "message":"Bad Request",
    "errors":{
        "products":"Need at least 1 product id"
    }
}
```

## Endpoint `PUT /:transactionId`
Description: Edit a transaction to remove products from the order

Authentication: Login Required

Parameters:

* `:transactionId` id of the Transaction

Request:
```json
///MUST BE A STRINGIFIED JSON
{
    "products":[
        5,6,8
    ]
}
```

Response 200 OK:
```json
{
    "id":1,
    "owner":{
        "id":1,
        "username":"demo",
        "email":"demo@aa.io",
    },
    "status":"pending",
    "products":[
        {
            "id":5
            // Product Info
        },
        {
            "id":6
            // Product Info
        },
        {
            "id":8
            // Product Info
        },
    ]
}
```

Response 400:
```json
{
    "message":"Bad Request",
    "errors":{
        "products":"Need at least 1 product id"
    }
}
```

Reponse 404:
```json
{
    "message":"Transaction could not be found"
}
```

Response 401 Unauthorized:
```json
{
    "message":"Not the owner of this transaction"
}
```

## Endpoint `DELETE /:transactionId`
Description: Delete a specific transaction

Authentication: Login Required

Parameters:

* `:transactionId` id of the Transaction

Response 200 OK:
```json
{
    "id":1
}
```

Reponse 404:
```json
{
    "message":"Transaction could not be found"
}
```

Response 401 Unauthorized:
```json
{
    "message":"Not the owner of this transaction"
}
```

## Endpoint `PATCH /`
Description: Runs time comparisons to update the shipping status of a all transactions belonging to the current user for the frontend

Authentication: Login Required

Response 200 OK:
```json
{
    "verify":"a"
}
```

## Review Routes `/api/reviews`

## EndPoint `GET /`
Description: Get all of the current users reviews

Authentication: Login Required

Response 200 OK:
```json
{
    "reviews":[
        {
            "id":1,
            "rating":3,
            "review":"An alright game",
            "product":{
                "id":1,
                "name":"Conker's Bad Fur Day"
            },
            "owner":{
                "id":1,
                "user":"demo",
                "user":"demo@aa.io",
            }
        }
    ]
}
```

## EndPoint `GET /:reviewId`
Description: Get a review by the Id

Parameters:

* `:reviewId` id of the Review

Response 200 OK:
```json
{
    "review":{
        "id":1,
        "rating":3,
        "review":"An alright game",
        "product":{
            "id":1,
            "name":"Conker's Bad Fur Day"
        },
        "owner":{
            "id":1,
            "user":"demo",
            "user":"demo@aa.io",
        }
    }
}
```

Response 404:
```json
{
    "message":"Review does not exist"
}
```

## EndPoint `GET /user/:userId`
Description: Get all of the reviews about a users products

Parameters:

* `:userId` id of the User

Response 200 OK:
```json
{
    "reviews":[
        {
            "id":1,
            "rating":3,
            "review":"An alright game",
            "product":{
                "id":1,
                "name":"Conker's Bad Fur Day"
            },
            "owner":{
                "id":1,
                "user":"demo",
                "user":"demo@aa.io",
            }
        }
    ]
}
```

## EndPoint `POST /:productId`
Description: Post a new review related to a specific product

Authentication: Login Required

Parameters:

* `:productId` id of the Product

Response 200 OK:
```json
{
    "review":{
        "id":1,
        "rating":3,
        "review":"An alright game",
        "product":{
            "id":1,
            "name":"Pokemon Emerald"
        },
        "owner":{
            "id":1,
            "user":"demo",
            "user":"demo@aa.io",
        }
    }
}
```

Response 401:
```json
{
    "message":"Bad Request",
    "errors":{
        "review":"Data Required",
        "rating":"Data Required",
    }
}
```

## EndPoint `PUT /:reviewId`
Description: Update a specific review

Authentication: Login Required

Parameters:

* `:reviewId` id of the Review

Response 200 OK:
```json
{
    "review":{
        "id":1,
        "rating":4,
        "review":"A fantastic game",
        "product":{
            "id":1,
            "name":"Pokemon Emerald"
        },
        "owner":{
            "id":1,
            "user":"demo",
            "user":"demo@aa.io",
        }
    }
}
```

Response 401:
```json
{
    "message":"Bad Request",
    "errors":{
        "review":"Data Required",
        "rating":"Data Required",
    }
}
```

Response 404:
```json
{
    "message":"Review does not exist"
}
```

Response 401 Unauthorized:
```json
{
    "message":"Not the owner of this review"
}
```

## EndPoint `DELETE /:reviewId`
Description: Delete a specific review

Authentication: Login Required

Parameters:

* `:reviewId` id of the Review

Response 200 OK:
```json
{
    "id":1
}
```

Response 404:
```json
{
    "message":"Review does not exist"
}
```

Response 401 Unauthorized:
```json
{
    "message":"Not the owner of this review"
}
```

## To Do

### Products

* Clean up detail page styling
* Set a max price ($999,999.99?)

### Articles

* Properly record the spacing between lines
* Add a comment feature, rating the writers of articles

## Contact Info
* [LinkedIn](https://www.linkedin.com/in/kyle-joel-flores/)
