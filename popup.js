var button = document.getElementById('button');

button.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(activeTabs) {
        chrome.tabs.sendMessage(activeTabs[0].id, {type: 'check_existence'}, function(msg) {
            msg = msg || {};
            if (msg.status !== 'loaded') {
                chrome.tabs.executeScript(activeTabs[0].id, {file: 'myScript.js'}, function() {
                    chrome.tabs.sendMessage(activeTabs[0].id, {type: 'daily_scrum'});
                    window.close();
                });
            } else {
                chrome.tabs.sendMessage(activeTabs[0].id, {type: 'daily_scrum'});
                window.close();
            }
        });
    });
};