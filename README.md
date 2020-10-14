# runogame

Rewrite of my original browser-based multiplayer card game RUNO.

The server is hosted on Google App Engine and client is hosted on Firebase Hosting.

## Deploy Server

```
cd server
gcloud app deploy --project [PROJECT ID]
```

## Deploy Client

```
cd client
npm install
npm run build
firebase deploy --project [PROJECT ID]
```
