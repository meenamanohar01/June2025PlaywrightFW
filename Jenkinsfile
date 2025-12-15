pipeline {
    agent any

    tools {
        nodejs 'NodeJS_20'   // Use Node 20 LTS
    }

    environment {
        CI = 'true'
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}\\.cache\\ms-playwright"
        EMAIL_RECIPIENTS = 'meena.manohar01@gmail.com,bodkeshashi12@gmail.com'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timestamps()
        timeout(time: 60, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages {

        /* ================= ESLINT ================= */
        stage('🔍 ESLint Analysis') {
            steps {
                bat 'npm ci'

                script {
                    def lintExit = bat(
                        script: 'npm run lint',
                        returnStatus: true
                    )

                    if (lintExit != 0) {
                        echo '⚠️ ESLint issues found'
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
            post {
                always {
                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'eslint-report',
                        reportFiles: 'index.html',
                        reportName: 'ESLint Report'
                    ])
                }
            }
        }

        /* ================= DEV ================= */
        stage('🔧 DEV Tests') {
            steps {
                bat 'npx playwright install chromium'

                powershell '''
                    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue allure-results
                    New-Item -ItemType Directory allure-results | Out-Null
                '''

                script {
                    env.DEV_TEST_STATUS =
                        bat(script: 'npx playwright test --grep "@login" --config=playwright.config.dev.ts',
                            returnStatus: true) == 0 ? 'success' : 'failure'
                }
            }
        }

        /* ================= QA ================= */
        stage('🔍 QA Tests') {
            steps {
                powershell '''
                    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue allure-results
                    New-Item -ItemType Directory allure-results | Out-Null
                '''

                script {
                    env.QA_TEST_STATUS =
                        bat(script: 'npx playwright test --grep "@login" --config=playwright.config.qa.ts',
                            returnStatus: true) == 0 ? 'success' : 'failure'
                }
            }
        }

        /* ================= STAGE ================= */
        stage('🎯 STAGE Tests') {
            steps {
                script {
                    env.STAGE_TEST_STATUS =
                        bat(script: 'npx playwright test --grep "@login" --config=playwright.config.stage.ts',
                            returnStatus: true) == 0 ? 'success' : 'failure'
                }
            }
        }

        /* ================= PROD ================= */
        stage('🚀 PROD Tests') {
            steps {
                script {
                    env.PROD_TEST_STATUS =
                        bat(script: 'npx playwright test --grep "@login" --config=playwright.config.prod.ts',
                            returnStatus: true) == 0 ? 'success' : 'failure'
                }
            }
        }

        /* ================= FINAL DECISION ================= */
        stage('✅ Pipeline Verdict') {
            steps {
                script {
                    if (
                        env.DEV_TEST_STATUS == 'failure' ||
                        env.QA_TEST_STATUS == 'failure' ||
                        env.STAGE_TEST_STATUS == 'failure' ||
                        env.PROD_TEST_STATUS == 'failure'
                    ) {
                        error('❌ One or more environments failed')
                    }
                }
            }
        }
    }

    /* ================= POST ================= */
    post {
        success {
            script {
                try {
                    slackSend color: 'good',
                              message: "✅ Playwright Pipeline SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
                } catch (e) {
                    echo 'Slack failed (ignored)'
                }
            }
        }

        unstable {
            script {
                try {
                    slackSend color: 'warning',
                              message: "⚠️ Playwright Pipeline UNSTABLE: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
                } catch (e) {
                    echo 'Slack failed (ignored)'
                }
            }
        }

        failure {
            script {
                try {
                    slackSend color: 'danger',
                              message: "❌ Playwright Pipeline FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
                } catch (e) {
                    echo 'Slack failed (ignored)'
                }
            }
        }
    }
}
