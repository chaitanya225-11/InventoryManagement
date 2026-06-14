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
