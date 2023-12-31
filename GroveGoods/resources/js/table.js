// function deleteRow(button) {
//     var row = button.parentNode.parentNode;
//     row.parentNode.removeChild(row);
// }

async function deleteRow(button) {
    var row = button.parentNode.parentNode;
    var contactId = row.getAttribute('data-id');
    const username = 'admin';
    const password = 'password';

    try {
        const response = await fetch("/api/contact", {
            method: "DELETE",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: contactId })
        });

        if (response.ok) {
            row.parentNode.removeChild(row);
        } else {
            // Handle errors here, for example:
            console.error('Failed to delete the contact with response status:', response.status);
        }
    } catch (error) {
        console.error('Error during fetch:', error);
    }
}

async function salePost(){
        const response = await fetch("api/sale", {method: "POST", body: JSON.stringify({message_obj:"TEXT"}),
                    header: {
                    "Content-Type":" application/json"
            }})
        const message_obj = await response.json();

        const whatever =
            {body: JSON.stringify({message_obj:"TEXT"}),
                    header: {
                    "Content-Type":" application/json"
            }};

        if (message_obj.active) {
            // get the sale banner and set text message to message_obj
            const sale = document.getElementById('Sale Banner')
            sale.innerText = message_obj.message
            sale.style.display = "block";
        }
        else {
            // Hide Sale banner
            sale.style.display = "none";
        }

        response.status

}


function updateCountdown() {
    var now = new Date();
    dateCells.forEach(function (cell) {
        var appointmentDate = new Date(cell.getAttribute('data-date'));
        var timeDifference = appointmentDate - now;
        if (timeDifference > 0) {
            var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            cell.innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
        } else {
            cell.innerHTML = 'PAST';
        }
    });
}

setInterval(updateCountdown, 1000);