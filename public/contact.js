$(document).ready(function() {
    $('#dataTable').DataTable();
});

const map = L.map('map').setView([41, -74], 14);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


const markers = [];
const loadPlaces = async () => {
    const response = await axios.get('/contacts');
    const tbody = document.querySelector('tbody');
    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
    }
    if(response && response.data && response.data.contacts) {
        for(let c of response.data.contacts){
            marker = L.marker([c.latitude, c.longitude]).addTo(map)
                .bindPopup(`<b>${c.title} ${c.first_name} ${c.last_name}</b><br/>${c.address}`);
                markers.push(marker);
            const tr = document.createElement('tr');
            tr.dataset.lat = c.latitude;
            tr.dataset.lng = c.longitude;
            tr.onclick = on_row_click;
            var html = `
                <td>${c.title} ${c.first_name} ${c.last_name}</td>
                <td>${c.phone}</td>
                <td>${c.email}</td>
                <td>${c.address} ${c.latitude}/${c.longitude}</td>
                <td>
            `;
            if(c.contact_by_phone === 'on')
                html += `
                    <div>
                        <input type="checkbox" id="phone" disabled="disabled" checked="checked" />
                        <label for="phone">Phone</label>
                    </div>
                `;
            else
                html += `
                    <div>
                        <input type="checkbox" id="phone" disabled="disabled" />
                        <label for="phone">Phone</label>
                    </div>
                `;
            if(c.contact_by_email === 'on')
                html += `
                    <div>
                        <input type="checkbox" id="phone" disabled="disabled" checked="checked" />
                        <label for="phone">Email</label>
                    </div>
                `;
            else
                html += `
                    <div>
                        <input type="checkbox" id="phone" disabled="disabled" />
                        <label for="phone">Email</label>
                    </div>
                `;
            if(c.contact_by_mail === 'on')
                html += `
                    <div>
                        <input type="checkbox" id="phone" disabled="disabled" checked="checked" />
                        <label for="phone">Mail</label>
                    </div>
                `;
            else
                html += `
                    <div>
                        <input type="checkbox" id="phone" disabled="disabled" />
                        <label for="phone">Mail</label>
                    </div>
                `;
            if(response.data.user){
                html +=`
                    <td>
                        <div class='d-flex justify-content-center gap-4'>
                            <a class='btn btn-primary' href='/${c.id}' role='button'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </a>
                            <button class='btn btn-danger' type='button' data-bs-toggle='modal' data-bs-target='#staticBackdrop${c.id}'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                </svg>
                            </button>
                            <div id='staticBackdrop${c.id}' class='modal fade' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
                                <div class='modal-dialog'>
                                    <div class='modal-content'>
                                        <div class='modal-header'>
                                            <h1 id='staticBackdropLabel' class='modal-title fs-5'>Delete Contact</h1>
                                            <button class='btn-close' type='button' data-bs-dismiss='modal' aria-label='Close'></button>
                                        </div>
                                        <div class='modal-body'>
                                            <h2 class='fs-5'>${c.title} ${c.first_name} ${c.last_name}</h2>
                                            <p>Are you sure you want to delete this contact?</p>
                                        </div>
                                        <div class='modal-footer'>
                                            <button class='btn btn-secondary' type='button' data-bs-dismiss='modal'>Cancel</button>
                                            <form action='/${c.id}/remove_contact' method='post'>
                                                <button class='btn btn-success' type='submit'>Confirm</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                `;
                console.log("html", html);
            }
            tr.innerHTML = html;
            tbody.appendChild(tr);
        }
    }
}

const on_row_click = (e) => {
    let row = e.target;
    if (e.target.tagName.toUpperCase() === 'TD') {
        row = e.target.parentNode;
    }
    const lat = row.dataset.lat;
    const lng = row.dataset.lng;
    map.flyTo(new L.LatLng(lat, lng));
}