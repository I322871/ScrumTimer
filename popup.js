var button = document.getElementById('button');
chrome.storage.sync.get({isStarted: false}, function(items) {
    if (!items.isStarted) {
        button.innerHTML = 'Start Daily Meeting';
    } else {
        button.innerHTML = 'End Daily Meeting';
    }
});

button.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(activeTabs) {
        chrome.storage.sync.get({isStarted: false}, function(items) {
            if (!items.isStarted) {
                chrome.tabs.sendMessage(activeTabs[0].id, {action: 'start'});
                button.innerHTML = 'End Daily Scrum';
                chrome.storage.sync.set({isStarted: true});
            } else {
                chrome.tabs.sendMessage(activeTabs[0].id, {action: 'end'});
                button.innerHTML = 'Start Daily Scrum';
                chrome.storage.sync.set({isStarted: false});
            }
        })
    });
};