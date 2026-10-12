// ========================================
// GOOGLE APPS SCRIPT API
// ========================================

const API_URL =
"https://script.google.com/macros/s/AKfycbzaE8G0fvL5_LKRh62e4SJckdYy0ecSh9gTgWEh65W2_rxjXl1DgitLHJGsx6sWqpo2MA/exec";


let allRecords = [];


// ========================================
// LOAD DATA
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    loadData();

    document
        .getElementById("searchInput")
        .addEventListener("input", searchData);

});


function loadData() {

    fetch(API_URL)

        .then(function(response) {

            if (!response.ok) {

                throw new Error(
                    "Unable to connect to the API."
                );

            }

            return response.json();

        })

        .then(function(data) {

            console.log("DATA RECEIVED:", data);

            allRecords = data.record || [];

            displayData(allRecords);

            updateStatistics(allRecords);

        })

        .catch(function(error) {

            console.error(error);

            document.getElementById("loading").innerHTML =
                "⚠ CONNECTION ERROR<br><br>" +
                "Unable to retrieve database.";

        });

}


// ========================================
// DISPLAY DATA
// ========================================

function displayData(records) {

    const tableBody =
        document.getElementById("tableBody");

    const loading =
        document.getElementById("loading");


    tableBody.innerHTML = "";

    loading.style.display = "none";


    records.forEach(function(record, index) {

        const row =
            document.createElement("tr");


        // ID

        const idCell =
            document.createElement("td");

        idCell.textContent =
            String(index + 1).padStart(3, "0");

        row.appendChild(idCell);


        // NAME

        const nameCell =
            document.createElement("td");

        nameCell.textContent =
            record.name;

        row.appendChild(nameCell);


        // AGE

        const ageCell =
            document.createElement("td");

        ageCell.textContent =
            record.age;

        row.appendChild(ageCell);


        // PROFESSION

        const professionCell =
            document.createElement("td");

        professionCell.textContent =
            record.profession;

        row.appendChild(professionCell);


        // AGE GROUP

        const ageGroupCell =
            document.createElement("td");

        ageGroupCell.textContent =
            record.ageGroup;

        row.appendChild(ageGroupCell);


        // GENDER

        const genderCell =
            document.createElement("td");

        genderCell.textContent =
            record.gender;

        row.appendChild(genderCell);


        tableBody.appendChild(row);

    });


    document.getElementById("totalCount").textContent =
        records.length;

}


// ========================================
// STATISTICS
// ========================================

function updateStatistics(records) {

    let male = 0;

    let female = 0;


    records.forEach(function(record) {

        if (
            String(record.gender).toLowerCase()
            === "male"
        ) {

            male++;

        }


        if (
            String(record.gender).toLowerCase()
            === "female"
        ) {

            female++;

        }

    });


    document.getElementById("maleCount").textContent =
        male;


    document.getElementById("femaleCount").textContent =
        female;

}


// ========================================
// SEARCH
// ========================================

function searchData() {

    const searchValue =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    if (searchValue === "") {

        displayData(allRecords);

        updateStatistics(allRecords);

        return;

    }


    const filtered =
        allRecords.filter(function(record) {

            return (

                String(record.name)
                    .toLowerCase()
                    .includes(searchValue)

                ||

                String(record.age)
                    .toLowerCase()
                    .includes(searchValue)

                ||

                String(record.profession)
                    .toLowerCase()
                    .includes(searchValue)

                ||

                String(record.ageGroup)
                    .toLowerCase()
                    .includes(searchValue)

                ||

                String(record.gender)
                    .toLowerCase()
                    .includes(searchValue)

            );

        });


    displayData(filtered);

    updateStatistics(filtered);

}