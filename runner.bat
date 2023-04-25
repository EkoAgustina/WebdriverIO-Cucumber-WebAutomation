@ECHO OFF

::================================Configuration=============================================
::driver options : MicrosoftEdge, firefox, chrome

set browserName=chrome

set tags=@addProduct
::==========================================================================================

call npm run test -- --browserName="%browserName%" --cucumberTags="%tags%"

::allure generate --clean && allure open
