import uniqid from 'uniqid';

import { getContacts } from "../globals.js";

//* Query data to array 
export const inputToArray = () => {
    const query = {
        name: document.querySelector("#name").value,
        surname: document.querySelector("#surname").value,
        dateOfBirth: document.querySelector("#dateOfBirth").value,
        street: document.querySelector("#street").value,
        postalCode: document.querySelector("#postalCode").value,
        phonePrefix: document.querySelector("#phonePrefix").value,
        phoneNumber: document.querySelector("#phoneNumber").value
    };

    return query;
};

//* Save contact 
export const saveToStorage = (contact) => {
    //* Getting data from local storage and save to arrat, if not exist return empty array
    const existingContactsArray = getContacts() || [];

    //* Check if ID exist in local storage
    const index = existingContactsArray.findIndex(el => el.id === contact.id);

    if (index !== -1) {
        //* If exist, update contact 
        existingContactsArray[index] = contact;
    } else {
        //* If not exist, push contact to array
        existingContactsArray.push(contact);
    }

    //* Save to local storage
    const updatedData = JSON.stringify(existingContactsArray);
    localStorage.setItem("contacts", updatedData);
};

//* Create unique ID
export const createUniqueID = (query) => {
    if(!query.id){
        query.id = uniqid();
    }
};

// export const createUniqueID2 = (query) => {
//     if(!query.id){
//         const timestamp = Date.now();
//         const randomString = Math.random().toString(36).substring(2, 5);
        
//         query.id = timestamp + randomString;
//     }
// };

//* Limit date
export const limitDate = (date) => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    const maxDate = yyyy + "-" + mm + "-" + dd;

    document.querySelector(date).setAttribute("max", maxDate);
};

//* Limiting input length
export const limitInputLength = (input) => {
    if (input.value.length > input.maxLength) {
    input.value = input.value.slice(0, input.maxLength);
    }
}
