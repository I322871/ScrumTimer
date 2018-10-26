'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({time: 120});
    
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {urlContains: 'sapjira.wdf.sap.corp'},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
