# SWStarter

## Requirements

- NodeJS (only for development)
- docker
- docker-compose
- `mongo` docker image (only for development)

## Development

- Open 3 terminals on this folder
  - First terminal:
    - `$ docker run -p 27017:27017 mongo`
  - Second terminal:
    - `$ cd frontend`
    - `$ npm install`
    - `$ npm run dev`
  - Third terminal:
    - `$ cd backend`
    - `$ npm install`
    - `$ npm run dev`
- Open `http://localhost:3000` on your browser

## Building and Running

- Open a terminal on this folder
- Run:
  - `$ docker compose up`
- Open `http://localhost:3000` on your browser
- Also, check `http://localhost:3000/stats`
