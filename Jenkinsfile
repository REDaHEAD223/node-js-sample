pipeline {
    agent none

    environment {
        GIT_REPO = "https://github.com/REDaHEAD223/node-js-sample.git"
        OC_SERVER = "https://api.rm3.7wse.p1.openshiftapps.com:6443"
        PROJECT = "redahead223-dev"
        APP_NAME = "myapp"
        RUN_TESTS = "true"
    }

    stages {
        stage('Checkout + Node Build') {
            agent {
                docker {
                    image 'node:18'
                    args '-u root'
                }
            }
            steps {
                git url: "${GIT_REPO}", branch: 'master'

                echo "📦 Installing dependencies"
                sh 'npm install'

                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    echo "🧪 Running tests"
                    sh 'npm test'
                }
            }

            post {
                always {
                    echo "📦 Stage completed"
                }
            }
        }

        stage('Deploy to OpenShift') {
            when {
                expression { return env.RUN_TESTS == 'true' }
            }
            agent any
            environment {
                OC_TOKEN = credentials('openshift-token')
            }
            steps {
                echo "🔐 Logging into OpenShift"
                sh "oc login --token=${OC_TOKEN} --server=${OC_SERVER}"

                echo "🚀 Triggering OpenShift build"
                sh "oc start-build ${APP_NAME} --follow -n ${PROJECT}"
            }
        }
    }
}
