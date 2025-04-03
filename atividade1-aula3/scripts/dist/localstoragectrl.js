"use strict";
function setLocalStorageItems(itemName, value) {
    const localStorageItem = JSON.stringify(value);
    localStorage.setItem(itemName, localStorageItem);
}
function getLocalStorageItem(itemName) {
    const item = localStorage.getItem(itemName);
    if (itemName && item) {
        return JSON.parse(item);
    }
    return null;
}
window.getLocalStorageItem = getLocalStorageItem;
window.setLocalStorageItems = setLocalStorageItems;
