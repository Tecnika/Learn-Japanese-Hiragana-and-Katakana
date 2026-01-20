function create_settings_table() {
    let settings = document.querySelector('.setting');
    clear_content(settings);
    var name_table = [
        'Хирагана+Катакана',
        'Хирагана',
        'Катакана',
    ]
    name_table.forEach((name,i)=> {
        let set = document.createElement('input');
        set.type = 'radio';
        set.value = transliterate(name);
        set.name = 'variant';
        if (i===0){
            set.checked = 'checked';
        }
        settings.appendChild(set);
        settings.append(name);
    });
}

function settings_table() {
    create_settings_table();
    
    // Получаем все радио-кнопки
    const radioButtons = document.querySelectorAll('input[name="variant"]');
    
    radioButtons.forEach(element => {
        element.addEventListener('change', (event) => {
            handleKanaChange(event.target.value);
        });
    });
    
    // Находим выбранную радио-кнопку и триггерим событие
    const checkedRadio = document.querySelector('input[name="variant"]:checked');
    if (checkedRadio) {
        handleKanaChange(checkedRadio.value);
    } else {
        // Если ни одна не выбрана, выбираем первую
        const firstRadio = document.querySelector('input[name="variant"]');
        if (firstRadio) {
            firstRadio.checked = true;
            handleKanaChange(firstRadio.value);
        }
    }
}

function handleKanaChange(kana) {
    const content = document.querySelector('.content');
    clear_content(content);
    
    if (kana === 'Hiragana') {
        create_table(hiragana);
    } else if (kana === 'Katakana') {
        create_table(katakana);
    } else {
        // Для режима "Хирагана+Катакана" создаем контейнер для двух таблиц рядом
        createBothTablesSideBySide();
    }
}

// Создание двух таблиц рядом
function createBothTablesSideBySide() {
    const content = document.querySelector('.content');
    
    // Создаем основной контейнер
    const container = document.createElement('div');
    container.className = 'both-kana-container';
    
    // Создаем контейнер для Хираганы
    const hiraganaContainer = document.createElement('div');
    hiraganaContainer.className = 'kana-table-container hiragana-container';
    
    const hiraganaTitle = document.createElement('h2');
    hiraganaTitle.textContent = 'Хирагана';
    hiraganaTitle.className = 'kana-title';
    hiraganaContainer.appendChild(hiraganaTitle);
    
    // Создаем таблицу Хираганы
    create_table_in_container(hiragana, hiraganaContainer);
    
    // Создаем контейнер для Катаканы
    const katakanaContainer = document.createElement('div');
    katakanaContainer.className = 'kana-table-container katakana-container';
    
    const katakanaTitle = document.createElement('h2');
    katakanaTitle.textContent = 'Катакана';
    katakanaTitle.className = 'kana-title';
    katakanaContainer.appendChild(katakanaTitle);
    
    // Создаем таблицу Катаканы
    create_table_in_container(katakana, katakanaContainer);
    
    // Добавляем оба контейнера в основной контейнер
    container.appendChild(hiraganaContainer);
    container.appendChild(katakanaContainer);
    
    // Добавляем в основной контент
    content.appendChild(container);
}
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
// Функция для создания таблицы внутри контейнера
function create_table_in_container(kana, container) {
    let i = 0;
    for (let prop in kana) {
        let table = document.createElement('table');
        let tbody = document.createElement('tbody');
        table.appendChild(tbody);
        create_header(table, i);
        create_subtable(tbody, kana, prop);
        i++;
        container.appendChild(table);
    }
}

// Остальные функции остаются без изменений
function create_header(table, i) {
    let header = document.createElement('caption');
    header.innerHTML = name_table[i];
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