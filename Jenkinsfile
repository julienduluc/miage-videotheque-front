String DOCKER_IMAGE_NAME = 'scalio-front'
String APP_VERSION = params.APP_VERSION ?: 'latest'
String REGISTRY_URL = 'http://127.0.0.1:30400'
Boolean DEPLOY = params.DEPLOY ?: false

echo '####### BUILD PARAMETERS #######'
echo '$params'
echo '####### BUILD PARAMETERS #######'

node {
  stage 'Stage Clean'
  cleanWs()

  stage 'Stage Checkout'
  checkout scm

  stage 'Stage Build'
  sh 'npm install'
  sh 'npm run-script build'

  if (DEPLOY) {
    stage 'Stage Docker'
    docker.withRegistry("${REGISTRY_URL}") {
      def customImage = docker.build("${DOCKER_IMAGE_NAME}:${APP_VERSION}")
      customImage.push()
    }
  }
}
