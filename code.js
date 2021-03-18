/**
 * Beta Console Apps Script
 *
 * Shows two menus in the Beta Programs Google Sheet to:
 *
 * 1) Deploy: Make it easy to trigger the GitHub action that deploys the site.
 * 2) Newsletter: Get the HTML code to copy into the MailChimp template.
 *
 */

/**
 * Create menu in Sheets UI
 */
function onOpen() {
    var ui = SpreadsheetApp.getUi();

    // Newsletter menu
    ui.createMenu("Newsletter")
        .addItem("Get MailChimp code", "getMCCode")
        .addItem("Get Tweets", "getTweets")
        .addToUi();
}

/**
 * Newsletter
 */

// These need to be in the script and not the library because createTemplateFromFile
// is scoped to the calling script. If it's in the library, the template file must
// also be in the library.
function getMCCode() {
    // Create HTML from template
    var html = HtmlService.createTemplateFromFile("mailchimp.html")
        .evaluate()
        .setHeight(180);

    // Build title
    var title = "Mailchimp code for " + LibMailchimpHTML.getNextThurs();

    // Show modal
    SpreadsheetApp.getUi().showModalDialog(html, title);
}

function getTweets() {
    // Create HTML from template
    var html = HtmlService.createTemplateFromFile("tweets.html")
        .evaluate()
        .setSandboxMode(HtmlService.SandboxMode.IFRAME)
        .setHeight(180);

    // Build title
    var title = "Tweets for " + LibMailchimpHTML.getNextThurs();

    // Show modal
    SpreadsheetApp.getUi().showModalDialog(html, title);
}
