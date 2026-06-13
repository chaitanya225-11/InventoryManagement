pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                bat '''
                cd frontend\\my_project
                npm install
                '''
            }
        }

        stage('Build') {
            steps {
                bat '''
                cd frontend\\my_project
                npm run build
                '''
            }
        }
    }

    post {
        success {
            echo 'Build Successful!'
        }

        failure {
            echo 'Build Failed!'
        }
    }
}
