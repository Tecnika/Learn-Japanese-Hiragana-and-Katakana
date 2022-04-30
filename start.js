function create_table(kana) {
    let content = document.querySelector('.content');
    clear_content(content)
        // Adding the entire table to the body tag

    let i = 0;
    for (let prop in kana) {
        let table = document.createElement('table');
        let tbody = document.createElement('tbody');
        table.appendChild(tbody);
        create_header(table, i);
        create_subtable(tbody, kana, prop);
        i++;
        content.appendChild(table);
    }

}

function create_header(table, i) {
    let header = document.createElement('caption');
    header.innerHTML = name_table[i];
    // header.text_align = center;
    table.appendChild(header);
}

function create_subtable(tbody, kana, chapter) {
    for (let i = 0; i < kana[chapter].length; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < kana[chapter][i].length; j++) {
            let row_data = document.createElement('td');
            row_data.innerHTML = kana[chapter][i][j] + enter + Kana_ru[chapter][i][j] + enter + Kana_en[chapter][i][j];
            row.appendChild(row_data);
            tbody.appendChild(row);
        }
    }

}

function clear_content(doc) {
    doc.innerHTML = '';
}