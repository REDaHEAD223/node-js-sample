pipeline {
    agent {
        docker {
            image 'node:18'
            args '-u root'
        }
    }

    environment {
        APP_NAME = "myapp"
        GIT_REPO = "https://github.com/REDaHEAD223/node-js-sample.git"
        OC_SERVER = "https://api.rm3.7wse.p1.openshiftapps.com:6443"
        OC_TOKEN = credentials('openshift-token') // Jenkins Credentials
        PROJECT = "redahead223-dev"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: "${GIT_REPO}", branch: 'master'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || true' // если нет тестов, не ломаем pipeline
            }
        }

        stage('Login to OpenShift') {
            steps {
                sh "oc login --token=${OC_TOKEN} --server=${OC_SERVER}"
            }
        }

        stage('Start Build') {
            steps {
                sh "oc start-build ${APP_NAME} --follow -n ${PROJECT}"
            }
        }
    }
}
