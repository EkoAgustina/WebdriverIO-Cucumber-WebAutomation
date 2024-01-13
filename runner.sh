hostName='localhost:8080'
browserName='headless'
cucumberTags='@LoginSuccessfully'

export cucumberTagExpression=${cucumberTags}
export hostName=${hostName}
export browserName=${browserName}

yarn test