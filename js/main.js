// Main script start here :

// Function for loading data by API:
const loadPhoneData = async (searchText, dataLimit) => {
    const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(URL);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
};

// Function for display data in UI:
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById("phones-container");
    phonesContainer.innerHTML = "";

    // Display 12 phones only:
    const showAll = document.getElementById("show-all");
    if (dataLimit && phones.length > 12) {
        phones = phones.slice(0, 12);
        showAll.classList.remove("d-none");
    } else {
        showAll.classList.add("d-none");
    }

    // Display error message when no phone found:
    if (phones.length === 0) {
        document.getElementById("warning-msg").classList.remove("d-none");
        toggleSpinner(false);
    } else {
        document.getElementById("warning-msg").classList.add("d-none");
    }

    phones.forEach((phone) => {
        const phoneDiv = document.createElement("div");
        phoneDiv.innerHTML = `<div class="col">
                <div class="card p-2 p-xl-4">
                    <img src="${phone.image}" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">
                            
                        </p>
                        <button id="details-btn" onclick = "loadPhoneDetails('${phone.slug}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">More details</button>
                    </div>
                </div>
            </div>`;
        phonesContainer.appendChild(phoneDiv);
        // Stop loading spinner here:
        toggleSpinner(false);
        // console.log(phone);
    });
    // console.log(phones);
};

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhoneData(searchText, dataLimit);
    // console.log(searchText);
};
// Search event add:
document.getElementById("search-btn").addEventListener("click", function () {
    // Start loading spinner here:
    processSearch(12);
});

// Search input field enter key handler:
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter')
    {
        processSearch(12);
    }
})

const toggleSpinner = (isLoading) => {
    const loadingSection = document.getElementById("spinner");
    if (isLoading) {
        loadingSection.classList.remove("d-none");
    } else {
        loadingSection.classList.add("d-none");
    }
};

// Load all data wheb clicked show all button:
// The method using here it's not the best way

document.getElementById("show-all-btn").addEventListener("click", function () {
    processSearch();
});

//  load phone details:
const loadPhoneDetails = async (id) => {
    const URL = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(URL);
    const data = await res.json();
    displayPhoneDetails(data.data);
};

// Display phone details:
const displayPhoneDetails = data => {
    const modalDialogField = document.getElementById('modal-container');
    modalDialogField.innerHTML = `<div class="modal-content">
    <div class="modal-header">
        <h1 class="modal-title fs-5" id="phoneDetailModalLabel">${data.name}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                    <div class="modal-body">
                        <img src = "${data.image}">
                        <h5><b>Brand </b> : <span>${data.brand}</span></h5>
                        <p><b>Storage varients</b> : <span>${data.mainFeatures.storage}</span></p>
                        <p><b>Display size</b> : <span>${data.mainFeatures.displaySize}</span></p>
                        <p><b>Chipset</b> : <span>${data.mainFeatures.chipSet}</span></p>
                        <p><b>Memory varients</b> : <span>${data.mainFeatures.memory}</span></p>
                        <p><b>Release date</b> : <span>${data.releaseDate}</span></p>
                    </div>
                <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
</div>`
    
    // console.log(data);
}


loadPhoneData("a");
