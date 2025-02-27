![IMDB API](https://user-images.githubusercontent.com/51857187/170807293-a52d8141-f743-4501-82e5-55e3d4286e61.jpg)

## Features 🪶

- Search titles
- Search by IMDB ID
- Cacheable Result
- High Performance
- Get episode information
- Get all reviews with full pagination supported
- Get user information
- Get user ratings and reviews
- Get actor information

## Installation 📦

If you anticipate sending a large number of requests, it is recommended that you deploy your own Cloudflare worker. Installation is pretty easy and straight forward. Click the button below to get started.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ngotuananh101/imdb)

After deployed, map the worker to a Domain Name to configure cache. Only Workers deployed to custom domains have access to functional cache operations.

## Run with docker 🐋

- Clone this repository
- Build the image
  ```
  docker build -t imdb-api .
  ```
- Start the process (Deatached)
  ```
  docker run -p 3000:3000 -it -d imdb-api
  ```

## API 📡

| Endpoint                                                                                         | Method | Description                         |
| ------------------------------------------------------------------------------------------------ | ------ | ----------------------------------- |
| `/search?query={query}`                                                                          | GET    | Search titles by title              |
| `/title/{imdb_id}`                                                                               | GET    | Get details of a title              |
| `/reviews/{imdb_id}?option={helpfulness\|date\|votes\|rating}&sortOrder={asc\|desc}`             | GET    | Get reviews of a title              |
| `/title/{imdb_id}/season/{season_id}`                                                            | GET    | Fetch a single season of a series   |
| `/user/{user_id}`                                                                                | GET    | Fetch an user's info                |
| `/user/{user_id}/ratings?ratingFilter={1-10}&sort={most_recent\|oldest\|top_rated\|worst_rated}` | GET    | Fetch an user's ratings and reviews |
| `/name/{name_id}`                                                                                | GET    | (New) Fetch an actor's info         |

## License 🎯

- Made by [PontaDev](https://github.com/ngotuananh101)

### Have a good day 🤘
