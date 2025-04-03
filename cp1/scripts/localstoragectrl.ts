
function setLocalStorageItems(itemName: string, value: any){
    const localStorageItem = JSON.stringify(value);
    localStorage.setItem(itemName, localStorageItem);
}

function getLocalStorageItem(itemName: string){
    const item = localStorage.getItem(itemName);
    if(itemName && item){
        return JSON.parse(item);
    }
    return null;
}

(window as any).getLocalStorageItem = getLocalStorageItem;
(window as any).setLocalStorageItems = setLocalStorageItems;