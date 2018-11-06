var button = document.getElementById('button');

button.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(activeTabs) {
        chrome.tabs.sendMessage(activeTabs[0].id, {type: 'daily_scrum'});
        window.close();
    });
};