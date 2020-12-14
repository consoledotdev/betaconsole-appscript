/**
 * Beta Console Deploy App Script
 *
 * Shows a menu in the Beta Programs Google Sheet to make it easy to trigger
 * the GitHub action that deploys the site.
 *
 */

/**
 * Create menu in Sheets UI
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Deploy')
    .addItem('Deploy to test', 'deployTest')
    .addItem('Deploy to production', 'deployProd')
    .addToUi();
}

function deployTest() {
  var result = deploy("test");

  if (result === false) {
    deploy("test");
  }
}

function deployProd() {
  SpreadsheetApp.getUi()
    .alert('Deploying to production is not allowed yet!');
}

/**
 * Authorizes and makes a request to the GitHub API.
 */
function deploy(environment) {
  // PropertiesService to store the token
  var userProperties = PropertiesService.getUserProperties();
  var githubToken = userProperties.getProperty('GITHUB_TOKEN');
  var environment = environment || "test"
  var ui = SpreadsheetApp.getUi();

  // If we already have the token stored then can issue the request
  // https://docs.github.com/en/free-pro-team@latest/rest/reference/actions#create-a-workflow-dispatch-event
  if (githubToken) {
    var url = 'https://api.github.com/repos/consoledotdev/betaconsole/actions/workflows/deploy.yml/dispatches';
    var response = UrlFetchApp.fetch(url, {
      contentType: 'application/vnd.github.v3+json',
      headers: {
        // Using basic auth with a personal token
        // If we use an OAuth2 app then we have to store the secret in the code
        // Also tried GitHub Apps but those tokens expire after 10 minutes or 1
        // hour, and also need the secret in the code
        Authorization: 'Basic ' + Utilities.base64Encode(githubToken)
      },
      method: 'POST',
      payload: JSON.stringify({
        'ref': 'main', // main branch
        'inputs': {
          'environment': environment
        }
      })
    });

    var responseCode = response.getResponseCode();

    if (responseCode == 204) { // Doesn't return any content
      if (environment == 'test') {
        var deployUrl = 'https://betaconsole-test.consoledev.workers.dev/';
      } else {
        var deployUrl = 'https://console.dev/beta';
      }

      var htmlOutput = HtmlService.createHtmlOutput(
          '<p><a href="https://github.com/consoledotdev/betaconsole/actions?query=workflow%3ADeploy" '
          + 'target="_blank">Check status</a>. <a href="'
          + deployUrl + '" target="_blank">View site</a>.</p>')
        .setHeight(100);

      SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Deploy started');

      return true
    }
  } else {
    // Collect the personal token for auth and save it in the properties
    // service: https://developers.google.com/apps-script/guides/properties
    var result = ui.prompt(
      'GitHub authentication',
      'Please register a new GitHub personal access token from '
      + 'https://github.com/settings/tokens with repo scope, then enter it '
      + 'below with your GitHub username in the form username:token',
      ui.ButtonSet.OK_CANCEL);

    // Process the user's response.
    var button = result.getSelectedButton();
    var newGithubToken = result.getResponseText();
    if (button == ui.Button.OK) {
      userProperties.setProperty('GITHUB_TOKEN', newGithubToken);
    }

    return false
  }
}
