Feature: Inventory
  @addProduct
  Scenario: User successfully added item to the cart
    Given User open "https://www.saucedemo.com/"
    And Fill "login:usernameField" with data "user_testData:username"
    And Fill "login:passwordField" with data "user_testData:password"
    And User click "login:loginButoon"
    Then Element "homePage:home_header" is displayed
    And User click "homePage:add_backpack"
    And User click "homePage:add_jacket"
    And User click "homePage:cart"
    Then Element "cart:list_cart1" is equal with data "cartData:backpack"
    Then Element "cart:list_cart2" is equal with data "cartData:jacket"
    Then User take screenshot with file name "CART"