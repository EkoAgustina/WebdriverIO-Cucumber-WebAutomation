browserName='chrome'
tags='@LoginSuccessfully'

echo $browserName
echo $tags

npm run test -- --browserName=$browserName --cucumberTags=$tags