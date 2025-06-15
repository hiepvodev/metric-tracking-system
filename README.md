# Metric tracking system app

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Prisma CLI](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-sql-typescript-postgres)
- [Postgres](https://www.postgresql.org/download/)

### Installation

1. Clone the repo
   ```sh
   git clone

    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Start the server
    ```sh
    npm run dev
    ```

4. Config DATABASE_URL in .env and run those command to migrate db and run seed data
    ```sh
    npm run migrate
    npm run seed
    ```
4. Open [http://localhost:5000/api/v1/](http://localhost:5000/api/v1/) to view it in the browser.

## Usage
- Use Postman for test the APIs

1. Create a Metric
POST /metrics
Request Body (JSON)
```
{
  "userId": 1,
  "type": "distance",
  "value": 100,
  "unit": "m",
  "date": "2025-06-15T09:00:00Z"
}
```
Response:

```
{
  "id": 1,
  "userId": 1,
  "type": "distance",
  "value": 100,
  "unit": "m",
  "date": "2025-06-15T09:00:00.000Z"
}

```
2. Get Metrics by Type
GET /metrics
Query Parameters: userId, type, unit

Example
GET /metrics?userId=1&type=distance&unit=cm

Response:

```
[
  {
    "id": 1,
    "userId": 1,
    "type": "distance",
    "value": 10000,
    "unit": "cm",
    "date": "2025-06-15T09:00:00.000Z"
  }
]
```
3. Get Metric Chart (Latest Record Per Day)
GET /metrics/chart

Query Parameters: userId, type, unit, period

Example
GET /metrics/chart?userId=user_123&type=temperature&period=2m&unit=C

Response:
```
[
  {
    "date": "2025-05-14T08:00:00.000Z",
    "value": 36.5,
    "unit": "C"
  },
  {
    "date": "2025-06-15T09:00:00.000Z",
    "value": 37.1,
    "unit": "C"
  }
]

```


### Prisma

1. Create a new Prisma project
    ```sh
    npx prisma init
    ```

2. Create a new Prisma migration
    ```sh
    npx prisma migrate dev --name init
    ```

3. Generate Prisma client
    ```sh
    npx prisma generate
    ```

4. Start Prisma Studio
    ```sh
    npx prisma studio
    ```
