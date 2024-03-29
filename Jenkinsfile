pipeline{
    agent any
    tools {
        nodejs "node18.6.1"
        allure "allure-commandline"
    }
    parameters{
        string(name: "Repositories", defaultValue: "", trim: true, description: "Please enter your Repositories")
        string(name: "Branch", defaultValue: "", trim: true, description: "Please enter your Branch")
        string(name: "Host", defaultValue: "", trim: true, description: "Please enter Host Name")
        string(name: "Tags", defaultValue: "@", trim: true, description: "Please enter the desired tags")
    }
    stages{
        stage('Project preparation'){
            steps{
                git branch: '$Branch', url: '$Repositories'
                echo '------------------------>Install a package and it\'s dependencies<-----------------------'
                script{
                    sh '''
                    git branch
                    npm install
                    '''
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
                    sh '''
                    npm run test -- --myHostname=$Host --cucumberTags=$Tags
                    '''
                }
            }
        }
        stage('Publish Report'){
            steps{
                allure jdk: '', results: [[path: 'reporter/allure-results']]
                cucumber buildStatus: 'null', customCssFiles: '', customJsFiles: '', failedFeaturesNumber: -1, failedScenariosNumber: -1, failedStepsNumber: -1, fileIncludePattern: '**/*.json', jsonReportDirectory: 'reporter/cucumber/jsonReport/', pendingStepsNumber: -1, skippedStepsNumber: -1, sortingMethod: 'ALPHABETICAL', undefinedStepsNumber: -1
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