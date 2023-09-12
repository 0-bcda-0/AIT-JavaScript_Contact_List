import * as SaveContact from "./models/SaveContact.js";
import * as contactList from "./views/contactList.js";
import { getContacts } from "./globals.js";


const saveContact = () => {
    //* Query data to array
    const query = SaveContact.inputToArray();

    // Check if ID exists
    query.id = new URLSearchParams(window.location.search).get("ID");

    if(query){
        //* Validating data
        //! MAX LENGTH MAKNUT IZ HTML-A
        
        //* Create unique ID and add to query
        SaveContact.createUniqueID(query);

        //* Save contact to local storage
        SaveContact.saveToStorage(query);

        //* Redirect to List page
        window.location.href = "../index.html?hl=" + query.id;
        //? Dodat highlight na row koji je dodat na 3 sekunde 
        
    }
};



//! INIT
document.addEventListener("DOMContentLoaded", () => {
    //! index.html
    if (document.querySelector("#tbody")) {

        // Popup check
        new URLSearchParams(window.location.search).get("ID") ? contactList.popup(new URLSearchParams(window.location.search).get("ID")) : console.log("Popup not requested");

        // Delete check
        new URLSearchParams(window.location.search).get("delid") ? contactList.deleteContact(new URLSearchParams(window.location.search).get("delid")) : console.log("Delete not requested");

        // Render contact list
        contactList.renderContact();

        // Highlight row
        contactList.rowHighlight(); 
}

    //! newContact.html
    if (document.querySelector("#contactForm")) {

        //* View only mode 
        if(new URLSearchParams(window.location.search).get("Disbled")){
            // Disable all inputs
            document.querySelectorAll("input").forEach(el => {
                el.classList.add("input-disabled");
            });
            document.querySelector("#phonePrefix").classList.add("input-disabled");

            // Remove buttons
            document.querySelector("#submit").remove();
            document.querySelector("#reset").remove();

        }

        //* Edit mode 
        const id = new URLSearchParams(window.location.search).get("ID");
        if (id) {
            const existingContacts = getContacts();
            const contact = existingContacts.find(el => el.id === id);

            document.querySelector("#name").value = contact.name;
            document.querySelector("#surname").value = contact.surname;
            document.querySelector("#dateOfBirth").value = contact.dateOfBirth;
            document.querySelector("#street").value = contact.street;
            document.querySelector("#postalCode").value = contact.postalCode;
            document.querySelector("#phonePrefix").value = contact.phonePrefix;
            document.querySelector("#phoneNumber").value = contact.phoneNumber;
        }

        // Limiting date of birth input
        const dateOfBirth = "#dateOfBirth"
        SaveContact.limitDate(dateOfBirth);

        // Limiting input length on load
        window.addEventListener("load", function () {
            let phoneNumber = document.getElementById("phoneNumber");
            phoneNumber.addEventListener("input", () => {
                SaveContact.limitInputLength(phoneNumber);
            });

            let postalCode = document.getElementById("postalCode");
            postalCode.addEventListener("input", () => {
                SaveContact.limitInputLength(postalCode);
            });
        });

        //* Save contact
        document.querySelector("#contactForm").addEventListener("submit", (e) => {
            e.preventDefault();
            saveContact();
        });
    }
});



