@ECHO OFF

::================================Configuration=============================================
set hostname=localhost:8080

::driver options : MicrosoftEdge, firefox, chrome, headless
set browserName=headless

set tags=@SmokeTest
::==========================================================================================

call npm run test -- --myHostname="%hostname%" --browserName="%browserName%" --cucumberTags="%tags%"

call npx kill-port 4444 -y

::allure generate reporter/allure-results --clean && allure open