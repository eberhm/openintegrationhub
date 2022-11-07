
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