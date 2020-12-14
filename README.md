# Beta Console Deploy Script

A [Google Apps Script](https://developers.google.com/apps-script/overview) for
the [Beta Programs Google
Sheet](https://docs.google.com/spreadsheets/d/10SJbUuMWgc-ACOzNydXL16vE_fDwJIP92G4_L8XUhrQ/edit)
which triggers the [GitHub Action](https://github.com/consoledotdev/betaconsole/actions?query=workflow%3ADeploy)
that will deploy the
[Beta Console site](https://github.com/consoledotdev/betaconsole). This makes
it easy for anyone to deploy the latest beta list. It uses a [GitHub Personal
Access token](https://github.com/settings/tokens) and basic authentication with
the GitHub REST API. Credentials are stored in the [Properties
Service](https://developers.google.com/apps-script/guides/properties).

## Local development

This script is [bound](https://developers.google.com/apps-script/guides/bound)
to the Google Sheet container. You can access it from Tools > Script Editor
within the sheet but using `clasp` is preferred.

1. [Install `clasp`](https://developers.google.com/apps-script/guides/clasp).
2. Clone this repo.
3. Ensure you have the latest copy of the code by cloning into the repo:

`gclasp clone 1FCVykdTwjxzM_iwFmQI6yn2HplwZltzccOLUphqoiAKTbP1u7aWUpmCO`

3. Push any changes up to the live version: `clasp push` or have it watch for
   changes with `clasp push --watch`.

## Debugging

Check the live [Apps Script
dashboard](https://script.google.com/home/projects/1FCVykdTwjxzM_iwFmQI6yn2HplwZltzccOLUphqoiAKTbP1u7aWUpmCO/executions?run_as=1).
