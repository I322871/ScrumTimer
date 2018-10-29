var timeInput = document.getElementById('timeInput');
var urlInput = document.getElementById('urlInput');
var saveButton = document.getElementById('saveButton');
var inputStatus = {
    timeInput: true,
    urlInput: true
}

chrome.storage.sync.get({time: 120, scrumUrls: []}, function(items) {
    timeInput.setAttribute('value', items.time);
    urlInput.setAttribute('value', items.scrumUrls.join('; '));
});

timeInput.onchange = function(e) {
    if (e.target.value <= 0) {
        saveButton.setAttribute('disabled', true);
        inputStatus.timeInput = false;
        return;
    } else if (inputStatus.urlInput) {
        saveButton.removeAttribute('disabled');
    }
    inputStatus.timeInput = true;
}

urlInput.onchange = function(e) {
    if (!e.target.value.length) {
        saveButton.setAttribute('disabled', true);
        inputStatus.urlInput = false;
        return;
    } else if (inputStatus.timeInput) {
        saveButton.removeAttribute('disabled');
    }
    inputStatus.urlInput = true;
}

saveButton.onclick = function() {
    var urls = urlInput.value.split(';');
    for (var i in urls) {
        urls[i] = urls[i].trim();
    }
    urls = urls.filter(url => url.length);
    
    var urlConditions = [];
    urls.forEach(url => urlConditions.push(new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlContains: url},
    })));
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: urlConditions,
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
    
    chrome.storage.sync.set({time: timeInput.value, scrumUrls: urls});
}