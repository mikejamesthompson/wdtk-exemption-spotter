// Attempt to detect exemption only when button
// is pressed (which triggers the WDTKDetectExemption
// message)
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "WDTKDetectExemption" ) {
      detectExemption();
    }
  }
);

function detectExemption() {

  // Get all messages from the authority and cast to array
  var responses = document.getElementsByClassName("incoming");
  responses = Array.from(responses);

  // Set up regex to match common ways authorities reference exemptions
  var regex = /\b((section|s(\.)?)\s?[0-9]+)(\([0-9a-z]+\))?(\s?\([0-9a-z]{1}\))?/gi;

  // Arrays to track what exemptions have been used across
  // all responses
  var reasons = [];
  var reasonsUsed = [];

  // Loop through all responses from the authority to see if any
  // of them contain something that looks like an exemption
  responses.forEach(function(response){

    var matches = [];
    var match;

    // Keep applying the regex until there's no more matches
    while( ( match = regex.exec(response.innerHTML) ) !== null ) {
      matches.push(match);
    }

    // Loop through all matches to identify exactly which
    // exemption was used for each one
    matches.forEach(function(match) {

      var exemptionUsed = match[1].toLowerCase();

      // The variable exemptions is defined in exemptions.js
      exemptions.forEach(function(exemption) {
        if(exemption.searchStrings.includes(exemptionUsed)) {

          var reason = {
            name: exemption.name,
            reason: exemption.reason,
            more: exemption.reference,
          }

          // Only add it to our list of exemptions used
          // if it's not there already
          if( ! reasonsUsed.includes(reason.name)) {
            reasons.push(reason);
            reasonsUsed.push(reason.name);
          }

          // Highlight the relevant text in the page
          var search = match[0];
          var replacement = "<span style=\"background-color: yellow\">" + match[0] + "</span>";
          response.innerHTML = response.innerHTML.replace(search, replacement);

        }
      });

    });

  });

  // Create list html containing exemptions and references
  if( reasons.length > 0 ) {

    // Generate explanation list
    var listHTML = "<ul>";
    reasons.forEach(function(reason){
      listHTML = listHTML + "<li><strong>" + reason.name + ":</strong> " + reason.reason + " For more information, see: <a href=\"" + reason.more + "\" target=\"_blank\">" + reason.more + "</a></li>";
    });
    listHTML = listHTML + "</ul>";

    var explanationHTML = "<p>The authority rejected this request using:</p>" + listHTML;

  } else {

    var explanationHTML = "<p>No exemption found</p>";

  }

  // Add the explanation element
  var explanation = document.createElement('div');
  explanation.className = "exemption-explanation";
  explanation.innerHTML = explanationHTML;
  document.getElementById('left_column').appendChild(explanation);

}
