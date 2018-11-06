var div = document.createElement('div');
div.classList.add('scurm_timer');
div.style['display'] = 'flex';
div.style['flex-direction'] = 'column';
div.style['align-items'] = 'center';
var alertInterval;

var childDiv = document.createElement('div');
div.appendChild(childDiv);
childDiv.style['display'] = 'flex';
childDiv.style['flex-direction'] = 'row';

var goButton = document.createElement('button');
childDiv.appendChild(goButton);
goButton.innerHTML = 'GO!';
goButton.style['width'] = '200px';
goButton.style['height'] = '40px';
goButton.style['font-size'] = '20px';
var interval;

var countDown = document.createElement('p');
childDiv.appendChild(countDown);
countDown.style['margin-left'] = '100px';
countDown.style['font-size'] = '28px';
countDown.style['margin-top'] = '0';
var storageTime = 0;

goButton.onclick = function() {
    _clearAlert();
    var time = storageTime;
    _setTimeToCountDown(time);
    
    if (interval) {
        clearInterval(interval);
    }
    
    interval = setInterval(function() {
        time--;
        _setTimeToCountDown(time);
        if (!time) {
            clearInterval(interval);
            _alert();
        }
    }, 1000);
}

_setTimeToCountDown = function(time) {
    var min = Math.floor(time/60);
    var sec = time % 60;
    if (sec < 10) {
        sec = '0' + sec;
    }
    countDown.innerHTML = min + ':' + sec;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'check_existence') {
        sendResponse({status: 'loaded'});
    } else if (request.type === 'daily_scrum') {
        if (interval) {
            clearInterval(interval);
        }
        _clearAlert();
        if(!document.body.firstChild.classList || !document.body.firstChild.classList.contains('scurm_timer')) {
            document.body.insertBefore(div, document.body.firstChild);
            chrome.storage.sync.get({time: 120}, function(items) {
                storageTime = items.time;
                _setTimeToCountDown(storageTime);
            });
        } else {
            document.body.removeChild(document.body.firstChild);
        }
    }
});

_alert =  function() {
    div.style.backgroundColor = 'rgb(255, 0, 0)';
    alertInterval = setInterval(function() {
        if (div.style.backgroundColor  === 'rgb(245, 245, 245)') {
            div.style.backgroundColor = 'rgb(255, 0, 0)';
        } else {
            div.style.backgroundColor = 'rgb(245, 245, 245)';
        }
    }, 1000);
}

_clearAlert =  function() {
    if (alertInterval) {
        clearInterval(alertInterval);
    }
    div.style.backgroundColor = 'rgb(245, 245, 245)';
}