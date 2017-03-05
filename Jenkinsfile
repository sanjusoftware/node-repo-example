#!groovy

@NonCPS
def jsonParse(def json) {
    return new groovy.json.JsonSlurperClassic().parseText(json);
}

node("master") {
    def prop = readProperties(file:'/var/jenkins_home/userContent/application.properties');
    def env_prop = readFile("/var/jenkins_home/userContent/environment.properties");
    String buildNumber = env.BUILD_NUMBER;
    def slaveId = "node-builder-$buildNumber";
    def JENIUS_DEV = 'jenius2-dev';
    def JENIUS_JENKINS = 'jenius2';
    def applicationId = 'card-management-service';

    stage ("oc login"){
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'OSE-J2USER', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
            sh "oc login -u ${USERNAME} -p ${PASSWORD} ${prop['OSE_URL']} --insecure-skip-tls-verify";
            sh "oc project $JENIUS_JENKINS";
        }
    }

    stage ("create jenkins slave"){
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'JENKINS', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
            sh "java -jar ${prop['JENKINS_CLI']} -s ${prop['JENKINS_URL']} get-node SLAVE --username $USERNAME --password $PASSWORD | java -jar ${prop['JENKINS_CLI']} -s ${prop['JENKINS_URL']} create-node $slaveId --username $USERNAME --password $PASSWORD";
            sh "oc new-app --image-stream=${prop['BUILDER_IMAGE']} --name=$slaveId -e=JENKINS_URL=${prop['JENKINS_IP_WITH_PORT']} -e=SLAVE_ID=$slaveId -e=JENKINS_USER=$USERNAME -e=JENKINS_PASSWORD=$PASSWORD";
        }
    }   

    try {
        node (slaveId) {
            stage ("login to OC"){
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'OSE-J2USER', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                    sh "oc login -u ${USERNAME} -p ${PASSWORD} ${prop['OSE_URL']} --insecure-skip-tls-verify";
                    sh "oc project $JENIUS_JENKINS";
                }
            }

            stage ("setup-npm-config") {
                sh "npm config set strict-ssl false";
                sh "npm config set http-proxy http://10.1.72.56:3333";
                sh "npm config set https-proxy http://10.1.72.56:3333";
                sh "npm config set registry=https://nexus3-devops-infra.devops.dev.corp.btpn.co.id/repository/npm-central";
            }
            stage ("run-unit-tests"){
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'GIT_LAB', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']])
                {
                    sh "rm -rf card-mgmt-srv"
                    sh "git -c http.sslVerify=false clone https://$USERNAME:$PASSWORD@10.1.129.174/jenius2/card-mgmt-srv.git";
                    sh "cd card-mgmt-srv && ls"
                    dir("card-mgmt-srv"){
                        sh "npm install --quiet";
                        sh "npm run cov";
                    }
                }
            }
            /* stage ("publish-test-coverage"){
                    dir("card-mgmt-srv"){
                        sh '''#!/bin/bash -l
                            echo $0
                            bash <(curl -s https://codecov.io/bash) -t 8518f18f-8eb2-458d-8b1a-88525d5569c1 -s ./artifacts/coverage -F unittests
                            ''';
                    }
            } */

            def cleanVersion;
            stage ("build-image"){
                dir("card-mgmt-srv") {
                    cleanVersion = jsonParse(readFile("package.json")).version.toLowerCase().replace(".", "-");
                    sh "echo vesion is : ${cleanVersion}"
                    sh "oc new-build . --context-dir='.' --name='${applicationId}-${cleanVersion}-${buildNumber}' -D='-' < Dockerfile";
                    sh "oc start-build ${applicationId}-${cleanVersion}-${buildNumber} --from-dir=. --follow";

                    try { sh "oc tag ${applicationId}-${cleanVersion}:latest -d" } catch (e) {};
                    sh "oc tag ${applicationId}-${cleanVersion}-${buildNumber}:latest ${applicationId}-${cleanVersion}:${buildNumber}";
                    sh "oc tag ${applicationId}-${cleanVersion}-${buildNumber}:latest ${applicationId}-${cleanVersion}:latest";
                }
            }

            stage ("deploy-to-dev"){
                 writeFile(file:"environment.properties", text:env_prop);
                try {
                    sh "oc new-app --image-stream=${JENIUS_JENKINS}/${applicationId}-${cleanVersion}:latest --name=${applicationId} --env-file=environment.properties -n ${JENIUS_DEV}";
                    sh "oc expose service ${applicationId} -n ${JENIUS_DEV}";
                } catch(e) {
                    sh "oc rollout latest ${applicationId} -n ${JENIUS_DEV}"
                }
            }
        }
    } catch (e){
        throw e;
    } finally {
        stage ("clean up"){
            sh "oc delete dc $slaveId";
            //sh "oc delete service $slaveId";
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'JENKINS', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                sh "java -jar ${prop['JENKINS_CLI']} -s ${prop['JENKINS_URL']} delete-node $slaveId --username $USERNAME --password $PASSWORD";
            }
        }
    }
}
