pipeline{
    agent any
    tools {nodejs "node18.6.1"}
    parameters{
        string(name: "Repositories", defaultValue: "", trim: true, description: "Please enter your Repositories")
        choice(name: "Browser", choices: ["headless"], description: "Please select a browser")
        string(name: "Tags", defaultValue: "@", trim: true, description: "Please enter the desired tags")
    }
    stages{
        stage('Project preparation'){
            steps{
                git "$params.Repositories"
                echo '------------------------>Install a package and it\'s dependencies<-----------------------'
                script{
                    sh 'npm install'
                    sleep(time: 1, unit: "SECONDS")
                }
            }
        }
        stage('Build containers'){
            steps{
                echo '------------------->Builds and starts containers for a service defined<-------------------'
                script{
                    sh 'docker-compose up -d'
                    sleep(time: 1, unit: "SECONDS")
                }
            }
        }
        stage('Test'){
            steps{
                echo '------------------------------------>Running test<------------------------------------'
                script{
                    sleep(time: 1, unit: "SECONDS")
                    sh 'npm run test -- --browserName=$Browser --cucumberTags=$Tags'
                }
            }
        }
        stage('Publish Report'){
            steps{
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
    post {
        always {
            echo '--------------------->Stops and removes containers for a service defined<---------------------'
            script{
                sh 'docker-compose down'
                sleep(time: 1, unit: "SECONDS")
            }
            cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true,
                    patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                               [pattern: '.propsfile', type: 'EXCLUDE']])
        }
    }
}