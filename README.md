# catch-game

## Getting Set Up

- run database containers
```
docker-compose up --build
```
- run backend
```
cd backend
npm install
npx prisma migrate dev
npm start
```

- run frontend
```
cd frontend
npm install
npm start
```

## APIs 

Below is a list of the API's for the application.

1. ***POST*** `/api/game` - It creates a game record in the database and returns current ranking of the game.

1. ***GET*** `/api/leaderboard` - Returns a list of top 100 players.
