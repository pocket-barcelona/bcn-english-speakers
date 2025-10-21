# How to setup a Directus Flow to deploy the website to Github Pages from Directus

More help here: https://github.com/directus/directus/discussions/12591

## Create github PAT (personal access token)
https://github.com/settings/apps


Go to **Directus -> Settings -> Flows**

Method: `POST`
URL: `https://api.github.com/repos/pocket-barcelona/bcn-english-speakers/dispatches`

Headers: (get Github PAT first)

```
Accept: application/vnd.github.v3+json
Content-Type: application/json
Authorization: token XXX
```

Request body:
```json
{
  "event_type": "Deploy from Directus"
}
```

## Screenshots

![Step 1](./_assets/flow-1.png)
![Step 2](./_assets/flow-2.png)
![Step 3](./_assets/flow-3.png)
![Step 4](./_assets/flow-4.png)