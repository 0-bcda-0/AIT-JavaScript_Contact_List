//* Globalna funkcija za dohvacanje podataka iz local storage-a 
export const getContacts = () => {
    const existingContacts = localStorage.getItem("contacts");

    let existingContactsArray;

    if (existingContacts) {
        existingContactsArray = JSON.parse(existingContacts);

        // U slucaju da nema podataka u local storage-u, kreiramo prazan array
        if (!Array.isArray(existingContactsArray)) {
            existingContactsArray = [];
        }
    } else {
        existingContactsArray = [];
    }

    return existingContactsArray;
};