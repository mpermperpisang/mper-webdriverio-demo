Feature: Login

  Scenario Outline: User doing multiple logins attempt
    Given there is "<username>" login
    When user try to login
    Then validate user <ability> do to <page> page

    Examples:
      | username        | ability | page  |
      | standard_user   | can     | home  |
      | locked_out_user | cannot  | login |
