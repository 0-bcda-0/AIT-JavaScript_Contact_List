//* Global function for getting contacts from local storage
export const getContacts = () => {
    const existingContacts = localStorage.getItem("contacts");

    let existingContactsArray;

    if (existingContacts) {
        existingContactsArray = JSON.parse(existingContacts);

        // No data, set empty array
        if (!Array.isArray(existingContactsArray)) {
            existingContactsArray = [];
        }
    } else {
        existingContactsArray = [];
    }

    return existingContactsArray;
};