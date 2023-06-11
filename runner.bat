@ECHO OFF

::================================Configuration=============================================
::driver options : MicrosoftEdge, firefox, chrome, headless
set browserName=chrome

set tags=@LoginSuccessfully
::==========================================================================================

if defined browserName (
    if defined tags (
        call npm run test -- --browserName="%browserName%" --cucumberTags="%tags%"
    )
    else (
        echo tags IS REQUIRED!
        timeout /t 3 /nobreak > NUL
    )
)
else (
    echo browserName IS REQUIRED!
    timeout /t 3 /nobreak > NUL
)
::allure generate --clean && allure open
