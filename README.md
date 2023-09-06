## Description
Appoinment api with nestjs framework

## DB

![Alt text](db.diagram.PNG?raw=true "Title")

## API GET APPOINTMENTS

```http
GET /api/appointments
```
```javascript
{
  "code": "0000",
  "message" : "SUCCESS",
  "data"    : [
    {
      "title": "ทดสอบ",
      "description": "รายละเอียด",
      "status": 1,
      "comments": [],
      "createdByName": "นายหนึ่ง",
      "createdByEmail": "test1@gmail.com",
      "createdAt": 1693977620000
  }]
}
```

## API GET APPOINTMENTS BY ID
```http
GET /api/appointments/:id
```
```javascript
{
  "code": "0000",
  "message" : "SUCCESS",
  "data"    : {
    "title": "ทดสอบ",
    "description": "รายละเอียด",
    "status": 1,
    "comments": [],
    "createdByName": "นายหนึ่ง",
    "createdByEmail": "test1@gmail.com",
    "createdAt": 1693977620000
  }
}
```

## API GET APPOINTMENTS STATUS
```http
GET /api/appointments/status
```
```javascript
{
  "code": "0000",
  "message" : "SUCCESS",
  "data"    : [
    {
        "id": 1,
        "status": "To do"
    }
  ]
}
```

## API CREATE APPOINTMENTS COMMENT
```http
POST /api/appointments/comment
```
REQUEST
```javascript
{
  "userId" : 1,
  "appointmentId" : 1,
  "comment"    : "ทดสอบ"
}
```
RESPONSE
```javascript
{
  "code": "0000",
  "message" : "SUCCESS"
}
```

## Installation

```bash
$ docker compose up
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
