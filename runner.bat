@ECHO OFF

::================================Configuration=============================================
set hostname=localhost:8080

::driver options : MicrosoftEdge, firefox, chrome, headless
set browserName=headless

set tags=@LoginSuccessfully
::==========================================================================================

call npm run test -- --myHostname="%hostname%" --browserName="%browserName%" --cucumberTags="%tags%"

::allure generate --clean && allure open
