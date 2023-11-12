pipeline {
  agent any // will be auto run in any builder that idle

  parameters {
    string name: 'BRANCH', defaultValue: 'master', description: 'Define branch to run automation scenarios'
    string name: 'TAGGING', defaultValue: '@sample', description: 'Define tag to run specific automation scenarios'
    choice name: 'NECESSITY', choices: ['pull_request', 'regression', 'daily_run'], description: 'Define purpose to run automation scenarios'
    choice name: 'BROWSER', choices: ['chrome', 'firefox'], description: 'Define browser to run automation scenarios'
    choice name: 'ENV', choices: ['Pre-Production', 'Production'], description: 'Define env to run automation scenarios'
    booleanParam name: 'UPDATE_ENV', defaultValue: false, description: 'Choose if any env update'
    booleanParam name: 'UPDATE_DOCKER', defaultValue: false, description: 'Choose if any docker update'
  }

  options {
    skipDefaultCheckout()
  }

  stages {
    stage('Preparation') {
      parallel {
        stage('Display Name') {
          steps {
            script {
              currentBuild.displayName = "#${currentBuild.number}_${NECESSITY}"
            }
          }
        }

        stage('SCM') {
          steps {
            script {
              println "Pulling branch. . . => ${BRANCH}"

              checkout changelog: false, poll: false,
              scm: [
                $class: 'GitSCM',
                branches: [[name: params.BRANCH]],
                doGenerateSubmoduleConfigurations: false,
                extensions: [
                  [$class: 'CleanBeforeCheckout'],
                  [$class: 'CheckoutOption', timeout: 10],
                  [$class: 'CloneOption', noTags: true, reference: '', shallow: true, timeout: 10]
                ],
                userRemoteConfigs: [[
                  credentialsId: 'mpermperpisang',
                  url: 'https://github.com/mpermperpisang/mper-wdio-demo.git',
                  refspec: '+refs/heads/'+params.BRANCH+':refs/remotes/origin/'+params.BRANCH
                ]]
              ]
            }
          }
        }

        stage('Configuration') {
          steps {
            script {
              if (UPDATE_ENV == 'true') {
                build job: "env_config", wait: true
              }
            }
          }
        }

        stage('Clean up unused Docker Compose') {
          steps {
            script {
              sh '''
                docker image prune -a -f || true
                docker container prune -f || true
                docker builder prune -a -f
              '''
            }
          }
        }
      }
    }

    stage('Dependencies') {
      parallel {
        stage('Copy Build Artifact') {
          steps {
            echo 'Copying artifact from env_config'
            copyArtifacts(projectName: 'env_config', filter:'.env_web', optional: true);
            sh 'mv .env_web .env'
          }
        }

        stage('Install Dependencies') {
          steps {
            script {
              sh 'make ci-deps'
            }
          }
        }
      }
    }

    stage('Run API Automation') {
      steps {
        script {
          sh "npm run testAPI"
        }
      }
    }

    stage('Run Web Automation') {
      steps {
        catchError(stageResult: 'FAILURE') {
          script {
            if (BROWSER == 'chrome') {
              sh "make dockerChrome"
            } else {
              sh "make dockerFirefox"
            }
          }
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: "allure-results/*, allure-report/*", fingerprint: true

      script {
        allure([
          includeProperties: false,
          jdk: '',
          properties: [],
          reportBuildPolicy: 'ALWAYS',
          results: [[path: './allure-results']]
        ])
      }
    }
    success {
      // send notif to chat
      // record percentage
    }
    failure {
      // send notif to chat
      // record percentage
    }
    unstable {
      // send notif to chat
      // record percentage
    }
  }
}
