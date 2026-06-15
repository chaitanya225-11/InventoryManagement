pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Fetching source code...'
            }
        }

        stage('Frontend Install') {
            steps {
                dir('frontend/my_project') {
                    bat 'npm install'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend/my_project') {
                    bat 'npm run build'
                }
            }
        }

        stage('Backend Install') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Backend Test') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
        }

        stage('Deploy Backend to Render') {
            steps {
                withCredentials([string(credentialsId: 'RENDER_DEPLOY_HOOK', variable: 'RENDER_HOOK')]) {
                    bat 'curl -X POST "%RENDER_HOOK%"'
                }
            }
        }

        stage('Deploy Frontend to Firebase') {
    steps {
        dir('frontend/my_project') {
            bat 'npm install -g firebase-tools'
            bat 'firebase deploy --only hosting'
        }
    }
}

    post {
        success {
            echo 'Build and Deployment Successful!'
        }

        failure {
            echo 'Build or Deployment Failed!'
        }
    }
}
