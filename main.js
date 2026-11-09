let users = [];

// Filter elements
const searchProduct = document.getElementById("searchProduct");
const filterCategory = document.getElementById("filterCategory");


// Load data from localStorage
if (localStorage.getItem("users")) {

    users = JSON.parse(localStorage.getItem("users"));

    displayUserInput();
}


// ADD / UPDATE PRODUCT
userform.addEventListener("submit", (event) => {

    event.preventDefault();

    const pidInput = pid.value.trim();
    const pnameInput = pname.value.trim();
    const priceInput = price.value.trim();
    const quantityInput = pquant.value.trim();

    if (
        pidInput &&
        pnameInput &&
        priceInput &&
        quantityInput
    ) {

        const editindex = editStatus.value;


        // ADD PRODUCT
        if (editindex === "") {

            users.push({
                pid: pidInput,
                pname: pnameInput,
                price: priceInput,
                pquant: quantityInput
            });

        }


        // UPDATE PRODUCT
        else {

            users[editindex] = {
                pid: pidInput,
                pname: pnameInput,
                price: priceInput,
                pquant: quantityInput
            };

            editStatus.value = "";
        }


        sessionStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        displayUserInput();

        userform.reset();

    } else {

        alert("Please complete the form");

    }

});


// DISPLAY PRODUCTS
function displayUserInput() {

    tablebody.innerHTML = "";

    const searchValue =
        searchProduct.value.toLowerCase().trim();

    const categoryValue =
        filterCategory.value;


    users.forEach((item, index) => {

        // Product name filter
        const nameMatch =
            item.pname
                .toLowerCase()
                .includes(searchValue);


      
        if (nameMatch && category) {

            tablebody.innerHTML += `
                <tr>

                    <th>${index + 1}</th>

                    <td>${item.pid}</td>

                    <td>${item.pname}</td>

                    <td>${item.price}</td>

                    <td>${item.pquant}</td>

                    <td>

                        <button
                            onclick="editUser(${index})"
                            class="btn btn-warning">
                            Edit
                        </button>

                        <button
                            onclick="deleteUser(${index})"
                            class="btn btn-danger">
                            Delete
                        </button>

                    </td>

                </tr>
            `;
        }

    });
}

// EDIT PRODUCT
function editUser(userIndex) {

    const userInput = users[userIndex];

    pid.value = userInput.pid;
    pname.value = userInput.pname;
    category.value = userInput.category;
    price.value = userInput.price;
    pquant.value = userInput.pquant;

    editStatus.value = userIndex;
}


// DELETE PRODUCT
function deleteUser(userIndex) {

    if (confirm("Are you sure you want to delete the data?")) {

        users.splice(userIndex, 1);

        sessionStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        displayUserInput();
    }
}