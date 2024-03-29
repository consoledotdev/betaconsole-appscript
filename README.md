# Beta Console Apps Script

A [Google Apps Script](https://developers.google.com/apps-script/overview) for
the [Console](https://console.dev) [Beta Programs Google
Sheet](https://docs.google.com/spreadsheets/d/10SJbUuMWgc-ACOzNydXL16vE_fDwJIP92G4_L8XUhrQ/edit)
which shows custom menus:

1. **Newsletter:**
    1. Get the HTML code to copy into the MailChimp template. Uses
       [lib-mailchimphtml](https://github.com/consoledotdev/lib-mailchimphtml).
    2. Create draft Tweets.

## Open development

This repository is public, but is not currently open source. Feel free to read,
copy, or use any aspect of this code. However, it is published without support,
warranty, or guarantees of any kind. We have opened the repo to give a view
into how we run [Console](https://console.dev) rather than for it to be
independent, release-quality code.

## Local development

This script is [bound](https://developers.google.com/apps-script/guides/bound)
to the Google Sheet container. You can access it from Tools > Script Editor
within the sheet but using `clasp` is preferred.

1. [Install `clasp`](https://developers.google.com/apps-script/guides/clasp).
2. Clone this repo.
3. Ensure you have the latest copy of the code by cloning into the repo:

```
clasp login
clasp clone 1FCVykdTwjxzM_iwFmQI6yn2HplwZltzccOLUphqoiAKTbP1u7aWUpmCO
```

3. Push any changes up to the live version: 
```
clasp push 1FCVykdTwjxzM_iwFmQI6yn2HplwZltzccOLUphqoiAKTbP1u7aWUpmCO
``` 
or have it watch for changes with `clasp push --watch`.

## Debugging

Check the live [Apps Script dashboard](https://script.google.com/home/all).
