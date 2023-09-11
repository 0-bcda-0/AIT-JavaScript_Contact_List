import { getContacts } from "../globals.js";

export const renderContact = () => {

    //* Getting data from local storage
    const existingContacts = getContacts();

    //* Loop through array and render data
    existingContacts.forEach(contact => {

        contact.dateOfBirth = formatDate(contact.dateOfBirth);

        const markup = `
        <tr id="clickableRow" data-href="/sites/newContact.html?ID=${contact.id}&Disbled=true" name="${contact.id}">
            <td>${contact.name}</td>
            <td>${contact.surname}</td>
            <td>${contact.dateOfBirth}</td>
            <td>${contact.street}</td>
            <td>${contact.postalCode}</td>
            <td>${contact.phonePrefix} / ${contact.phoneNumber}</td>
            <td>
                <a href="?ID=${contact.id}" class="btn">
                    <lord-icon class="row-icon"
                        src="../icon/delete.json"
                        target="a.btn"
                        trigger="loop-on-hover"
                        delay="500"
                        colors="primary:#5B5B5B">
                    </lord-icon>
                </a>
                <a href="/sites/newContact.html?ID=${contact.id}" class="btn">
                    <lord-icon class="row-icon"
                        src="../icon/edit.json"
                        target="a.btn"
                        trigger="loop-on-hover"
                        delay="500"
                        colors="primary:#F89B3E">
                    </lord-icon>
                </a>
            </td>
        </tr>
        `;
        document.querySelector("#tbody").insertAdjacentHTML("beforeend", markup);
    });

    //* Add event listener to row
    document.querySelectorAll("#clickableRow").forEach(el => {
        el.addEventListener("click", () => {
            window.location.href = el.dataset.href;
        });
    });
};

export const rowHighlight = () => {
    if (new URLSearchParams(window.location.search).has("hl")) {

        const id = new URLSearchParams(window.location.search).get("hl");
        
        // Select the first element with the specified name attribute
        const element = document.querySelector(`[name="${id}"]`);

        if (element) {
            // Add the "highlight" class to the selected element
            element.classList.add("highlight");

            // Set a timeout to remove the "highlight" class after 3 seconds
            setTimeout(() => {
                element.classList.remove("highlight");
            }, 3000);
        }
    }
};

//* Format date of birth to dd.mm.yyyy
function formatDate(date) {
    const dateOfBirth = new Date(date);

    const day = dateOfBirth.getDate();
    const month = dateOfBirth.getMonth() + 1;
    const year = dateOfBirth.getFullYear();

    return `${day}.${month}.${year}`;
}

//* Create popup
export const popup = (id) => {
    const markup = `
    <div class="popup" id="popup">
            <div class="popup-title">Potvrdi brisanje kontakta id. ${id}</div>
            <div class="popup-button-container">
                <a href="?delid=${id}" class="btn-orange">Obriši</a>
                <a href="../" class="btn-gray">Odustani</a>
            </div>
        </div>
    `;
    document.querySelector("body").insertAdjacentHTML("beforeend", markup);
};

//* Delete contact 
export const deleteContact = (id) => {
    const existingContacts = getContacts();

    const index = existingContacts.findIndex(el => el.id === id);

    existingContacts.splice(index, 1);

    const updatedData = JSON.stringify(existingContacts);

    localStorage.setItem("contacts", updatedData);

    window.location.href = "../index.html";
};