# Tech Documentation Guideline for Setting up OpenIntegrationHub

## Introduction:
This guide provides step-by-step instructions for setting up the OpenIntegrationHub from the GitHub repository. The OpenIntegrationHub is an open-source platform for developing and deploying integrations between different software applications.

## Prerequisites:

- A local machine running macOS
- Docker Desktop installed on the local machine
- Basic knowledge of using the command line interface

## Step 1: Clone the Repository

- Open the terminal on your local machine and navigate to the directory where you want to store the repository.
- Run the following command to clone the repository:
```sh 
git clone https://github.com/eberhm/openintegrationhub.git
```

## Step 2: Replace the Path in the Repository

- In the cloned repository, search for 'eber.herrera' using any text editor.
- Replace the path to the location of the project in your local machine. It should appear 3 times in the files.

## Step 3: Navigate to dev-tools/minikube Folder

- Open the terminal on your local machine.
- Navigate to the dev-tools/minikube folder inside the cloned repository:
```sh 
cd dev-tools/minikube
```

## Step 4: Run the Script

- Run the setup-dockerDesktop.sh script using the following command:
```sh
./setup-dockerDesktop.sh
```

- The script will request the password for your macOS user. Enter the password when prompted.

## Step 5: Access the OpenIntegrationHub

- Once the script finishes, you should be able to access the OpenIntegrationHub on your local machine by navigating to http://web-ui.example.com/ in your web browser.
- Login using the credentials from here: https://github.com/eberhm/openintegrationhub/blob/c45799b712b02b6536f4b31e15a905b1d5f5dc70/dev-tools/minikube/setup-dockerDesktop.sh#L11
