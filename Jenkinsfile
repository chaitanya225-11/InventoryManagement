pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Downloading Code from GitHub'
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

        stage('Build Application') {
            steps {
                bat '''
                cd frontend\\my_project
                npm run build
                '''
            }
        }

        stage('Run Application') {
            steps {
                bat '''
                cd frontend\\my_project
                start cmd /c npm run dev -- --host 0.0.0.0 --port 8000
                '''
            }
        }
    }

    post {
        success {
            echo 'Application Running on Port 8000'
        }

        failure {
            echo 'Build Failed!'
        }
    }
}
