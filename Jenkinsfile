pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND  = "sarveshkumar7/rag-backend"
        DOCKER_IMAGE_FRONTEND = "sarveshkumar7/rag-frontend"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-creds',
                    url: 'https://github.com/SarveshKumar7/Intelligent-Document-Analyst-using-Deep-Learning-RAG--FullStack.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE_BACKEND}:${IMAGE_TAG} ./Backend"
                sh "docker build -t ${DOCKER_IMAGE_FRONTEND}:${IMAGE_TAG} ./Frontend"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker push ${DOCKER_IMAGE_BACKEND}:${IMAGE_TAG}"
                    sh "docker push ${DOCKER_IMAGE_FRONTEND}:${IMAGE_TAG}"
                    sh "docker tag ${DOCKER_IMAGE_BACKEND}:${IMAGE_TAG} ${DOCKER_IMAGE_BACKEND}:latest"
                    sh "docker tag ${DOCKER_IMAGE_FRONTEND}:${IMAGE_TAG} ${DOCKER_IMAGE_FRONTEND}:latest"
                    sh "docker push ${DOCKER_IMAGE_BACKEND}:latest"
                    sh "docker push ${DOCKER_IMAGE_FRONTEND}:latest"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh "kubectl set image deployment/rag-backend backend=sarveshkumar7/rag-backend:${IMAGE_TAG} --kubeconfig=\$KUBECONFIG"
                    sh "kubectl set image deployment/rag-frontend frontend=sarveshkumar7/rag-frontend:${IMAGE_TAG} --kubeconfig=\$KUBECONFIG"
                    sh "kubectl rollout status deployment/rag-backend --kubeconfig=\$KUBECONFIG"
                    sh "kubectl rollout status deployment/rag-frontend --kubeconfig=\$KUBECONFIG"
                }
            }
        }
    }

    post {
        success { echo 'Deployment successful!' }
        failure { echo 'Pipeline failed. Check logs.' }
    }
}