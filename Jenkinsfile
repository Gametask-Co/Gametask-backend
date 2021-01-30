def configFile = ''
def buildImage = 'node:14.15.1-alpine'

continuousDelivery(configFile) {
  docker.image(buildImage).inside() {
    sh ""
  }
}
