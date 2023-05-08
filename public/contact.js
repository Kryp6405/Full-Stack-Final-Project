$(document).ready(function() {
    $('#dataTable').DataTable();
});

const map = L.map('map').setView([41, -74], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/*
const markers = [];
const loadPlaces = async () => {
    const response = await axios.get('/contacts');
    const tbody = document.querySelector('tbody');
    while(tbody.firstChild){
        console.log("response" + response.data.contacts)
        tbody.removeChild(tbody.firstChild);
    }
    if(response && response.data && response.data.contacts) {
        for(const c of response.data.contacts){
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
            if(user)
                html +=`
                    <div class='container'>
                        <div class='row'> 
                            <div class='col-6'>
                                <a class='btn btn-primary' href='/'+c.id role='button'></a>
                                    <img class='img-fluid edbtns' src='/edit.svg')></img>
                            </div>
                            <div class='col-6'>
                                <button class='btn btn-danger' type='button' data-bs-toggle='modal' data-bs-target='#staticBackdrop2'></button> 
                                    <img class='img-fluid edbtns src='/delete.svg'></img>
                            </div>
                        </div>
                    </div>
                `;
            tr.innerHTML = html;
            tbody.appendChild(tr);
        }
    }
}

const on_row_click = (e) => {
    console.log(e.target) // this is the element clicked
    console.log(e.target.tagName) // prints the element type (ie. TD)
    let row = e.target;
    if (e.target.tagName.toUpperCase() === 'TD') {
        row = e.target.parentNode;
    }
    const lat = row.dataset.lat;
    const lng = row.dataset.lng;
    map.flyTo(new L.LatLng(lat, lng));
}
*/