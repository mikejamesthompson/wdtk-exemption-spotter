# WDTK FOI Exemption Spotter
This is a proof of concept to show that spotting exemptions in WDTK requests and giving subsequent advice could be made to work relatively simply.

It's by no means complete: some more specific exemptions (like section 22a: https://www.foiman.com/archives/1119) probably won't be picked up properly at the moment. Also, the advice given should be a lot better. It doesn't work when the authority has answered in an attached PDF, DOC, etc. file. And it can't distinguish between an exemption that is mentioned because it may apply and ones that definitely do apply.

## Installation

As this is not a properly packaged extension, in order to install and play around with it, follow the advice here: https://developer.chrome.com/extensions/getstarted#unpacked

- Content.js contains the JavaScript that's doing the work
- Background.js holds the code that monitors for clicks on the extension's action button
- Exemptions.js contains a JavaScript object with all the exemption data

## Use

Test it out on requests shown on this page:
https://www.whatdotheyknow.com/search/status:rejected/all
