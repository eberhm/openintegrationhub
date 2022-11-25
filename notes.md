
# Developing in local
## Setting up the project

- Change dev-tools/minikube/1.1-CodeVolume/sourceCodeVolume and dev-tools/minikube/1.1-CodeVolume/sourceCodeVolumeMACOS.yaml path to this projects' folder

- Configure Docker Desktop resources:
  - https://openintegrationhub.github.io/docs/3%20-%20GettingStarted/LocalInstallationGuide.html#requirements

```sh
./devtools/minikube/setup-dockerDesktop.sh
```


## To Start playing around

go to 
```
http://web-ui.example.com/auth
```

Username: ta1@example.com
Pass: 1234


Users and Passwords are in openintegrationhub/dev-tools/minikube/setup-dockerDesktop.sh:11

# Things I did to get it working (for troubleshooting):

- Code Volume specific for MACOS with Docker Desktop instead of minikube
  - Changed dev-tools/minikube/1.1-CodeVolume/sourceCodeVolume and dev-tools/minikube/1.1-CodeVolume/sourceCodeVolumeMACOS.yaml path to this projects' folder

- Increased CPU in docker desktop from 2 to 3
  - https://openintegrationhub.github.io/docs/3%20-%20GettingStarted/LocalInstallationGuide.html#requirements

- Customized setup script in dev-tools/minikube/setup-dockerDesktop.sh

- Added Nginx ingress. References:
https://kubernetes.github.io/ingress-nginx/deploy/#docker-desktop
https://www.michaelrose.dev/posts/k8s-ingress-docker-desktop/
  - You do not need to do this part as it is already in customized script

- Some resources adjustement
  - ils was failing because OOM it was needed to increase the memory together other services
  - if some services is failing try to changed the memory limits and apply using
   ```kubectl apply -f <path>```

- snapshot services was failing: 
  ```> snapshots-service@0.4.3 start:container
  > ts-node-dev ./src/app.ts | bunyan

  sh: ts-node-dev: not found
  sh: bunyan: not found
  npm ERR! Lifecycle script `start:container` failed with error:
  npm ERR! Error: command failed
  npm ERR!   in workspace: snapshots-service@0.4.3
  npm ERR!   at location: /usr/src/app/services/snapshots-service
  npm notice
  npm notice New patch version of npm available! 8.19.2 -> 8.19.3
  npm notice Changelog: <https://github.com/npm/cli/releases/tag/v8.19.3>
  npm notice Run `npm install -g npm@8.19.3` to update!
  npm notice ```

-  Go to ./services/snapshots-service and execute
  ```VERSION=latest npm run build:docker  ```
  and 

```kubectl apply -f /Users/beatriz.martin/Documents/Hack/openintegrationhub/dev-tools/minikube/4-Services/snapshots-service/service.yaml```

* UNTIL HERE *


# Flows

You need to create a component
Then with the component you create a flow.
Everytime that in a step you emit some data, this will be passed as parameter in the next step: See https://github.com/bmjuan/oih-dummy-test for examples


 {
  url: "http://testURL.com",
  token: "dsjhbsjdkbdksj"
}
{
  name: 'Onlyfy Rest test',
  description: 'Testing Onlyfy REST API',
  graph: {
    nodes: [
      {
        id: 'step_1',
        componentId: '636a84f87a3217786945f809',
        function: 'httpRequestTrigger',
        name: 'Call REST Endpoint',
        description: 'Call REST Endpoint',
        fields: {
          reader: {
            url: '\'https://api.prescreenapp.io/v1/job\'',
            method: 'GET',
            headers: [
              {
                key: 'Content-Type',
                value: '\'application/json\''
              }
            ]
          },
          auth: {
            type: 'API Key Auth',
            apiKey: {
              headerName: 'apikey',
              headerValue: 'krN3OL4YzOptP2OIvMejfOe2ruKfUS3t'
            }
          }
        }
      },
      {
        id: 'step_2',
        componentId: '636a7d757a3217786945f7f3',
        function: 'upsertObject',
        name: 'Step2 upsertObject',
        description: 'upsertObject call'
      }
    ],
    edges: [
      {
        source: 'step_1',
        target: 'step_2'
      }
    ]
  },
  type: 'ordinary',
  owners: [
    {
      id: '636a7b0c3dfe20b731f37e99',
      type: 'user'
    }
  ],
  cron: '',
  id: '636b6676136d7eb5afd1da0d'
}








  curl 'http://skm.example.com/api/v1/auth-clients' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: en,es;q=0.9,de-DE;q=0.8,de;q=0.7' \
  -H 'Authorization: Bearer YOUR_OIH_BEARER_TOKEN' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  --data-raw '{"name":"MS Teams oAuth2", "type":"OA2_AUTHORIZATION_CODE", "redirectUri" : "http://localhost:31415/api/v1/callback", "predefinedScope" : "offline_access","endpoints" : {"auth" : "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?prompt=select_account&scope={{scope}}&response_mode=query&state={{state}}&redirect_uri={{redirectUri}}&response_type=code&client_id={{clientId}}","token" : "https://login.microsoftonline.com/common/oauth2/v2.0/token","userinfo" : "https://login.microsoftonline.com/common/openid/userinfo"},"clientId" : "YOUR_MS_APP_ID","clientSecret" : "YOUR_CRED_SECRET","mappings" : {"externalId" : {"source" : "access_token","key" : "unique_name"},"scope" : {"key" : "scope"}}}' \
  --compressed \
  --insecure

