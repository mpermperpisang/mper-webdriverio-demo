@login @locked_out_user
Feature: Login - Locked Out User

  Scenario: User failed to login because of lock out
    Given user login with username "locked_out_user"
    But user can not continue login process
    Then validate user still in login page
