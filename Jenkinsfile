pipeline {
  agent any
  stages {
    stage('Test and Deploy') {
      when { anyOf {  branch 'master'; } }
      steps {
        sh '''rm Jenkinsfile README.md
ls'''
        withCredentials(bindings: [file(credentialsId: '15862533-4746-4599-9b5e-8c5da18a3d65', variable: 'DEV_BIM_FRONTEND_PEM')]) {
          sh '''
                scp -r -o StrictHostKeyChecking=no  -i $DEV_BIM_FRONTEND_PEM ./*  ubuntu@bim.modeloapp.com:/home/ubuntu/api-samples/
             '''
        }
      }
    }
    
    stage('Deploy Develop') {
      when { anyOf {  branch 'develop'; } }
      steps {
        sh '''rm Jenkinsfile README.md
ls'''
        withCredentials(bindings: [file(credentialsId: '15862533-4746-4599-9b5e-8c5da18a3d65', variable: 'DEV_BIM_FRONTEND_PEM')]) {
          sh '''
                scp -r -o StrictHostKeyChecking=no  -i $DEV_BIM_FRONTEND_PEM ./*  ubuntu@api-samples-develop.modeloapp.com:/home/ubuntu/api-samples-develop/
             '''
        }
      }
    }
  }
  options {
      // retry(3)
      timeout(time: 30, unit: 'MINUTES')
  }
}
