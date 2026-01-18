function create_table(kana, skip = false) {
    let content = document.querySelector('.content');
    if (!skip) {
        clear_content(content)
    }
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
function transliterate(text) {
    const translitMap = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
        'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
        'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch',
        'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '',
        'э': 'e', 'ю': 'yu', 'я': 'ya',

        // Заглавные буквы
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
        'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
        'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
        'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
        'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch',
        'Ш': 'Sh', 'Щ': 'Shch', 'Ъ': '', 'Ы': 'Y', 'Ь': '',
        'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
    };
    return text.split('').map(char => {
        // Если символ есть в карте транслитерации, заменяем его
        if (translitMap[char]) {
            return translitMap[char];
        }
        // Иначе оставляем как есть (для английских букв, цифр, спецсимволов)
        return char;
    }).join('');
}