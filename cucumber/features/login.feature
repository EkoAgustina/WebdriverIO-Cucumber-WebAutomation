Feature: Login
  @SmokeTest @LoginSuccessfully
  Scenario: User successfully login with a valid account
    Given User open "https://www.saucedemo.com/"
    And Fill "login:usernameField" with data "user_testData:username"
    And Fill "login:passwordField" with data "user_testData:password"
    And User click "login:loginButoon"
    Then Element "homePage:home_header" is displayed
    Then User take screenshot with file name "Successfully_Login"



  # edge:
  #   image: selenium/node-edge:latest
  #   shm_size: 2gb
  #   depends_on:
  #     - selenium-hub
  #   environment:
  #     - SE_EVENT_BUS_HOST=selenium-hub
  #     - SE_EVENT_BUS_PUBLISH_PORT=4442
  #     - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
  #     - SE_NODE_MAX_SESSIONS=2
  #     - VNC_NO_PASSWORD=1
  # chrome:
  #   image: selenium/node-chrome:4.0.0-beta-1-prerelease-20201208
  #   container_name: node-chrome
  #   volumes:
  #     - /dev/shm:/dev/shm
  #   depends_on:
  #     - selenium-hub
  #   environment:
  #     - SE_EVENT_BUS_HOST=selenium-hub
  #     - SE_EVENT_BUS_PUBLISH_PORT=4442
  #     - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
  #   ports:
  #     - "5900"