
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