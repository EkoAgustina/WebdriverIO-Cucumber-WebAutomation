pipeline{
    agent any
    parameters{
        string(name: "Repositories", defaultValue: "", trim: true, description: "Please enter your Repositories")
        choice(name: "Browser", choices: ["chrome", "MicrosoftEdge"], description: "Please select a browser")
        string(name: "Tags", defaultValue: "@", trim: true, description: "Please enter the desired tags")
    }
    stages{
        stage('Build'){
            steps{
                git "$params.Repositories"
                echo '----->Install a package and it\'s dependencies<-----'
                script{
                    bat "npm install"
                }
            }
        }
        stage('Running tests'){
            steps{
                script{
                    sleep(time: 1, unit: "SECONDS")
                    bat "npm run test -- --browserName=$Browser --cucumberTags=$Tags"
                }
            }
        }
        stage('Publish Report'){
            steps{
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
}