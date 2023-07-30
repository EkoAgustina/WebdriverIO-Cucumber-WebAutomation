Feature: Login
  @SmokeTest @LoginSuccessfully
  Scenario: User successfully login with a valid account
    Given User open "https://www.saucedemo.com/"
    And Fill "login:usernameField" with data "user_testData:username"
    And Fill "login:passwordField" with data "user_testData:password"
    And User click "login:loginButoon"
    Then Element "homePage:home_header" is displayed
    Then User take screenshot with file name "Successfully_Login"