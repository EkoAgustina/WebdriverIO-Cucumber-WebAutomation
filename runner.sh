hostName='localhost:8080'
browserName='chrome'
cucumberTags='@LoginSuccessfully'

if [ -z "$hostName" ]; then
  echo "Error: hostName cannot be empty!"
  exit 1
fi

if [ -z "$browserName" ]; then
  echo "Error: browserName cannot be empty!"
  exit 1
fi

if [ -z "$cucumberTags" ]; then
  echo "Error: cucumberTags cannot be empty!"
  exit 1
fi

export cucumberTagExpression=${cucumberTags}
export hostName=${hostName}
export browserName=${browserName}

yarn test