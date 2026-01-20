function create_settings_table() {
    let settings = document.querySelector('.setting');
    clear_content(settings);
    
    const settingsContainer = document.createElement('div');
    settingsContainer.className = 'compact-settings table-settings';
    settings.appendChild(settingsContainer);
    
    // Заголовок и быстрые кнопки (компактный стиль)
    const settingsHeader = document.createElement('div');
    settingsHeader.className = 'table-settings-header';
    
    const title = document.createElement('h3');
    title.className = 'table-settings-title';
    title.textContent = 'Таблицы каны';
    
    const quickActions = document.createElement('div');
    quickActions.className = 'table-quick-actions';
    
    // Быстрые кнопки выбора типа
    const quickButtons = [
        {type: 'both', label: 'Обе', dataValue: 'both'},
        {type: 'hiragana', label: 'あ', dataValue: 'hiragana'},
        {type: 'katakana', label: 'ア', dataValue: 'katakana'}
    ];
    
    quickButtons.forEach(btn => {
        const quickBtn = document.createElement('button');
        quickBtn.type = 'button';
        quickBtn.textContent = btn.label;
        quickBtn.className = 'table-quick-btn';
        quickBtn.dataset.type = btn.dataValue;
        quickActions.appendChild(quickBtn);
    });
    
    settingsHeader.appendChild(title);
    settingsHeader.appendChild(quickActions);
    settingsContainer.appendChild(settingsHeader);
    
    // Основная строка настроек (компактная)
    const mainRow = document.createElement('div');
    mainRow.className = 'table-main-row';
    
    // Левая часть: выбор типа каны
    const leftColumn = document.createElement('div');
    leftColumn.className = 'table-left-col';
    
    const kanaLabel = document.createElement('label');
    kanaLabel.className = 'table-type-label';
    kanaLabel.textContent = 'Тип:';
    
    const kanaSelect = document.createElement('select');
    kanaSelect.className = 'compact-select table-type-select';
    
    // ИЗМЕНЕНИЕ 1: Добавлены preview с символами каны
    const typeOptions = [
        {value: 'both', label: 'Хирагана + Катакана', preview: 'あ+ア'},
        {value: 'hiragana', label: 'Хирагана', preview: 'あいうえお'},
        {value: 'katakana', label: 'Катакана', preview: 'アイウエオ'}
    ];
    
    typeOptions.forEach(option => {
        const optElement = document.createElement('option');
        optElement.value = option.value;
        // ИЗМЕНЕНИЕ: добавлен preview в текст опции
        optElement.textContent = `${option.label} (${option.preview})`;
        kanaSelect.appendChild(optElement);
    });
    
    leftColumn.appendChild(kanaLabel);
    leftColumn.appendChild(kanaSelect);
    
    // Правая часть: переключатель транскрипции
    const middleColumn = document.createElement('div');
    middleColumn.className = 'table-middle-col';
    
    const transcriptionCheckbox = document.createElement('input');
    transcriptionCheckbox.type = 'checkbox';
    transcriptionCheckbox.className = 'table-transcription-checkbox';
    transcriptionCheckbox.checked = true;
    
    const transcriptionLabel = document.createElement('label');
    transcriptionLabel.className = 'table-transcription-label';
    transcriptionLabel.textContent = 'Транскрипция';
    
    middleColumn.appendChild(transcriptionCheckbox);
    middleColumn.appendChild(transcriptionLabel);
    
    // Кнопка обновления
    const rightColumn = document.createElement('button');
    rightColumn.className = 'table-apply-btn';
    rightColumn.textContent = 'Применить';
    
    mainRow.appendChild(leftColumn);
    mainRow.appendChild(middleColumn);
    mainRow.appendChild(rightColumn);
    settingsContainer.appendChild(mainRow);
    
    // Функция обновления таблицы
    const updateTable = () => {
        handleKanaChange(kanaSelect.value, transcriptionCheckbox.checked);
    };
    
    // Обработчики для выпадающего списка
    kanaSelect.addEventListener('change', function() {
        updateTable();
        // Обновляем активную быструю кнопку
        quickButtons.forEach(btn => {
            const btnElement = document.querySelector(`[data-type="${btn.dataValue}"]`);
            if (btnElement) {
                const isActive = btn.dataValue === this.value;
                btnElement.classList.toggle('table-quick-btn-active', isActive);
            }
        });
    });
    
    // Обработчики для быстрых кнопок
    quickButtons.forEach(btn => {
        const btnElement = document.querySelector(`[data-type="${btn.dataValue}"]`);
        if (btnElement) {
            btnElement.addEventListener('click', function() {
                kanaSelect.value = btn.dataValue;
                updateTable();
                // Обновляем все быстрые кнопки
                quickButtons.forEach(b => {
                    const bElement = document.querySelector(`[data-type="${b.dataValue}"]`);
                    if (bElement) {
                        bElement.classList.toggle('table-quick-btn-active', b.dataValue === btn.dataValue);
                    }
                });
            });
        }
    });
    
    // Обработчики для чекбокса и кнопки
    transcriptionCheckbox.addEventListener('change', updateTable);
    rightColumn.addEventListener('click', updateTable);
    
    // Устанавливаем начальное состояние быстрых кнопок
    setTimeout(() => {
        const activeBtn = document.querySelector('[data-type="both"]');
        if (activeBtn) {
            activeBtn.classList.add('table-quick-btn-active');
        }
    }, 10);
    
    // Первоначальная загрузка
    updateTable();
}

function settings_table() {
    create_settings_table();
}

function handleKanaChange(kana, showTranscription = true) {
    const content = document.querySelector('.content');
    clear_content(content);
    
    if (kana === 'Hiragana' || kana === 'hiragana') {
        create_table(hiragana, showTranscription);
    } else if (kana === 'Katakana' || kana === 'katakana') {
        create_table(katakana, showTranscription);
    } else {
        createBothTablesSideBySide(showTranscription);
    }
}

function create_table(kana, showTranscription = true, skip = false) {
    let content = document.querySelector('.content');
    if (!skip) {
        clear_content(content);
    }
    
    // Создаем контейнер для таблицы
    const tableContainer = document.createElement('div');
    tableContainer.className = 'kana-table-full-container';
    content.appendChild(tableContainer);
    
    let i = 0;
    for (let prop in kana) {
        // Контейнер для подтаблицы с заголовком
        const subtableContainer = document.createElement('div');
        subtableContainer.className = 'kana-subtable-container';
        
        // ЗАГОЛОВОК ПОДТАБЛИЦЫ (отдельный элемент, НЕ ячейка таблицы)
        const subtableHeader = document.createElement('div');
        subtableHeader.className = 'kana-subtable-header';
        subtableHeader.textContent = name_table[i] || `Таблица ${i + 1}`;
        subtableContainer.appendChild(subtableHeader);
        
        // Сама таблица
        let table = document.createElement('table');
        table.className = 'kana-table';
        let tbody = document.createElement('tbody');
        
        // Создаем содержимое таблицы
        create_subtable(tbody, kana, prop, showTranscription);
        table.appendChild(tbody);
        subtableContainer.appendChild(table);
        
        tableContainer.appendChild(subtableContainer);
        i++;
    }
}

function create_subtable(tbody, kana, chapter, showTranscription = true) {
    for (let i = 0; i < kana[chapter].length; i++) {
        let row = document.createElement('tr');
        row.className = 'kana-table-row';
        
        for (let j = 0; j < kana[chapter][i].length; j++) {
            let cell = document.createElement('td');
            cell.className = 'kana-table-cell';
            
            const kanaChar = kana[chapter][i][j];
            
            if (kanaChar && kanaChar.trim() !== '') {
                if (showTranscription) {
                    const ruTrans = Kana_ru[chapter] && Kana_ru[chapter][i] && Kana_ru[chapter][i][j] || '';
                    const enTrans = Kana_en[chapter] && Kana_en[chapter][i] && Kana_en[chapter][i][j] || '';
                    
                    // КОРРЕКТНАЯ структура: символ каны сверху, транскрипции снизу
                    cell.innerHTML = `
                        <div class="kana-char">${kanaChar}</div>
                        <div class="kana-transcription-ru">${ruTrans}</div>
                        <div class="kana-transcription-en">${enTrans}</div>
                    `;
                } else {
                    // Без транскрипции - только символ каны
                    cell.innerHTML = `<div class="kana-char-only">${kanaChar}</div>`;
                }
            } else {
                // Пустая ячейка
                cell.innerHTML = '&nbsp;';
            }
            
            row.appendChild(cell);
        }
        
        tbody.appendChild(row);
    }
}

function createBothTablesSideBySide(showTranscription = true) {
    const content = document.querySelector('.content');
    
    const container = document.createElement('div');
    container.className = 'both-kana-container';
    
    // Хирагана
    const hiraganaContainer = document.createElement('div');
    hiraganaContainer.className = 'kana-side-container hiragana-side';
    
    const hiraganaTitle = document.createElement('h2');
    hiraganaTitle.className = 'kana-side-title hiragana-title';
    hiraganaTitle.textContent = 'Хирагана';
    hiraganaContainer.appendChild(hiraganaTitle);
    
    // Создаем таблицы хираганы
    let hiraIndex = 0;
    for (let prop in hiragana) {
        const subtableContainer = document.createElement('div');
        subtableContainer.className = 'kana-subtable-container';
        
        const subtableHeader = document.createElement('div');
        subtableHeader.className = 'kana-subtable-header';
        subtableHeader.textContent = name_table[hiraIndex] || `Таблица ${hiraIndex + 1}`;
        subtableContainer.appendChild(subtableHeader);
        
        let table = document.createElement('table');
        table.className = 'kana-table';
        let tbody = document.createElement('tbody');
        
        create_subtable(tbody, hiragana, prop, showTranscription);
        table.appendChild(tbody);
        subtableContainer.appendChild(table);
        
        hiraganaContainer.appendChild(subtableContainer);
        hiraIndex++;
    }
    
    // Катакана
    const katakanaContainer = document.createElement('div');
    katakanaContainer.className = 'kana-side-container katakana-side';
    
    const katakanaTitle = document.createElement('h2');
    katakanaTitle.className = 'kana-side-title katakana-title';
    katakanaTitle.textContent = 'Катакана';
    katakanaContainer.appendChild(katakanaTitle);
    
    // Создаем таблицы катаканы
    let kataIndex = 0;
    for (let prop in katakana) {
        const subtableContainer = document.createElement('div');
        subtableContainer.className = 'kana-subtable-container';
        
        const subtableHeader = document.createElement('div');
        subtableHeader.className = 'kana-subtable-header';
        subtableHeader.textContent = name_table[kataIndex] || `Таблица ${kataIndex + 1}`;
        subtableContainer.appendChild(subtableHeader);
        
        let table = document.createElement('table');
        table.className = 'kana-table';
        let tbody = document.createElement('tbody');
        
        create_subtable(tbody, katakana, prop, showTranscription);
        table.appendChild(tbody);
        subtableContainer.appendChild(table);
        
        katakanaContainer.appendChild(subtableContainer);
        kataIndex++;
    }
    
    container.appendChild(hiraganaContainer);
    container.appendChild(katakanaContainer);
    content.appendChild(container);
}