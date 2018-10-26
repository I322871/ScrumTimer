var button = document.getElementById('button');

button.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(activeTabs) {
        chrome.storage.sync.get({isStarted: false}, function(items) {
            if (!items.isStarted) {
                chrome.tabs.sendMessage(activeTabs[0].id, {action: 'start'});
                chrome.storage.sync.set({isStarted: true});
            } else {
                chrome.tabs.sendMessage(activeTabs[0].id, {action: 'end'});
                chrome.storage.sync.set({isStarted: false});
            }
        })
    });
};