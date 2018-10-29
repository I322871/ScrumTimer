'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({time: 120, scrumUrls: ['sapjira.wdf.sap.corp']});
    
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {urlContains: 'sapjira.wdf.sap.corp'},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    chrome.storage.sync.get({scrumUrls: []}, function(data) {
        if (data.scrumUrls.filter(url => tab.url.includes(url)).length){
            chrome.tabs.executeScript(tabId, {file: 'myScript.js'});
        }
    });
});
