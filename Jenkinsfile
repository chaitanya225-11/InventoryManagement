pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Downloading Code'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                cd frontend\\my_project
                npm install
                '''
            }
        }

        stage('Build React App') {
            steps {
                bat '''
                cd frontend\\my_project
                npm run build
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t inventorymanagement .'
            }
        }

        stage('Run Container') {
            steps {
                bat 'docker rm -f inventorymanagement-container'
                bat 'docker run -d --name inventorymanagement-container -p 80:80 inventorymanagement'
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }

        failure {
            echo 'Deployment Failed!'
        }
    }
}
