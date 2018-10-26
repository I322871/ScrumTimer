var input = document.getElementById('optionInput');
var saveButton = document.getElementById('saveButton');

chrome.storage.sync.get({time: 120}, function(items) {
    input.setAttribute('value', items.time);
});

input.onchange = function(e) {
    if (e.target.value <= 0) {
        saveButton.setAttribute('disabled', true);
    } else {
        saveButton.removeAttribute('disabled');
    }
}

saveButton.onclick = function() {
    chrome.storage.sync.set({time: input.value});
}