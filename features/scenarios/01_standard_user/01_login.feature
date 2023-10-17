@sample @login @standard_user
Feature: Login - Standard User

  Scenario: User login with standar user successfully
    Given user login with username "standard_user"
    Then validate user is in home page
