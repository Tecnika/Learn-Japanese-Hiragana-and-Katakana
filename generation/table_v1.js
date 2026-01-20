function create_settings_table() {
    let settings = document.querySelector('.setting');
    clear_content(settings);
    
    const settingsContainer = document.createElement('div');
    settingsContainer.className = 'compact-settings';
    
    // Минималистичный заголовок
    const settingsHeader = document.createElement('div');
    settingsHeader.style.cssText = 'grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0;';
    
    const title = document.createElement('h3');
    title.textContent = 'Таблицы каны';
    title.style.cssText = 'margin: 0; font-size: 16px; color: #2d3748;';
    
    const quickActions = document.createElement('div');
    quickActions.style.cssText = 'display: flex; gap: 8px;';
    
    // Быстрые кнопки выбора
    const quickButtons = [
        {type: 'both', label: 'Обе'},
        {type: 'hiragana', label: 'あ'},
        {type: 'katakana', label: 'ア'}
    ];
    
    quickButtons.forEach(btn => {
        const quickBtn = document.createElement('button');
        quickBtn.type = 'button';
        quickBtn.textContent = btn.label;
        quickBtn.style.cssText = 'padding: 6px 10px; font-size: 14px; border: 1px solid #cbd5e0; border-radius: 6px; background: white; cursor: pointer; transition: all 0.2s;';
        quickBtn.addEventListener('click', () => {
            handleKanaChange(btn.type);
            // Обновляем активную кнопку
            quickButtons.forEach(b => {
                const btnElement = document.querySelector(`[data-type="${b.type}"]`);
                if (btnElement) {
                    btnElement.style.background = b.type === btn.type ? '#4299e1' : 'white';
                    btnElement.style.color = b.type === btn.type ? 'white' : '#4a5568';
                    btnElement.style.borderColor = b.type === btn.type ? '#3182ce' : '#cbd5e0';
                }
            });
        });
        quickBtn.dataset.type = btn.type;
        quickActions.appendChild(quickBtn);
    });
    
    settingsHeader.appendChild(title);
    settingsHeader.appendChild(quickActions);
    settingsContainer.appendChild(settingsHeader);
    
    // Основная строка настроек
    const mainRow = document.createElement('div');
    mainRow.style.cssText = 'grid-column: 1 / -1; display: grid; grid-template-columns: 1fr auto; gap: 15px; align-items: center;';
    
    // Левая часть: выбор типа каны с превью
    const leftColumn = document.createElement('div');
    leftColumn.style.cssText = 'display: flex; align-items: center; gap: 12px;';
    
    const kanaLabel = document.createElement('label');
    kanaLabel.textContent = 'Тип:';
    kanaLabel.style.cssText = 'font-weight: 600; color: #4a5568; font-size: 14px; flex-shrink: 0;';
    
    const kanaSelect = document.createElement('select');
    kanaSelect.className = 'compact-select';
    kanaSelect.style.cssText = 'flex: 1; margin: 0;';
    
    const kanaOptions = [
        {value: 'both', label: 'Хирагана + Катакана', preview: 'あ+ア'},
        {value: 'hiragana', label: 'Хирагана', preview: 'あいうえお'},
        {value: 'katakana', label: 'Катакана', preview: 'アイウエオ'}
    ];
    
    kanaOptions.forEach(option => {
        const optElement = document.createElement('option');
        optElement.value = option.value;
        optElement.textContent = `${option.label} (${option.preview})`;
        kanaSelect.appendChild(optElement);
    });
    
    leftColumn.appendChild(kanaLabel);
    leftColumn.appendChild(kanaSelect);
    
    // Правая часть: дополнительные настройки
    const rightColumn = document.createElement('div');
    rightColumn.style.cssText = 'display: flex; align-items: center; gap: 10px;';
    
    // Переключатель транскрипции
    const transcriptionToggle = document.createElement('label');
    transcriptionToggle.style.cssText = 'display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 13px; color: #4a5568;';
    
    const transcriptionCheckbox = document.createElement('input');
    transcriptionCheckbox.type = 'checkbox';
    transcriptionCheckbox.checked = true;
    transcriptionCheckbox.style.cssText = 'margin: 0;';
    
    const transcriptionText = document.createElement('span');
    transcriptionText.textContent = 'Транскрипция';
    
    transcriptionToggle.appendChild(transcriptionCheckbox);
    transcriptionToggle.appendChild(transcriptionText);
    
    // Кнопка обновления
    const refreshBtn = document.createElement('button');
    refreshBtn.textContent = 'Применить';
    refreshBtn.style.cssText = 'padding: 6px 12px; font-size: 13px; background: #4299e1; color: white; border: none; border-radius: 6px; cursor: pointer; flex-shrink: 0;';
    
    rightColumn.appendChild(transcriptionToggle);
    rightColumn.appendChild(refreshBtn);
    
    mainRow.appendChild(leftColumn);
    mainRow.appendChild(rightColumn);
    settingsContainer.appendChild(mainRow);
    
    settings.appendChild(settingsContainer);
    
    // Обработчики событий
    const showTable = () => {
        handleKanaChange(kanaSelect.value, transcriptionCheckbox.checked);
    };
    
    kanaSelect.addEventListener('change', showTable);
    transcriptionCheckbox.addEventListener('change', showTable);
    refreshBtn.addEventListener('click', showTable);
    
    // Устанавливаем активную быструю кнопку
    setTimeout(() => {
        const activeBtn = document.querySelector('[data-type="both"]');
        if (activeBtn) {
            activeBtn.style.background = '#4299e1';
            activeBtn.style.color = 'white';
            activeBtn.style.borderColor = '#3182ce';
        }
    }, 10);
    
    // Первоначальная загрузка
    showTable();
}

function settings_table() {
    create_settings_table();
}

function handleKanaChange(kana) {
    const content = document.querySelector('.content');
    clear_content(content);
    
    // Получаем состояние чекбокса транскрипции
    const transcriptionCheckbox = document.querySelector('input[type="checkbox"]');
    const showTranscription = transcriptionCheckbox ? transcriptionCheckbox.checked : true;
    
    if (kana === 'Hiragana' || kana === 'hiragana') {
        create_table(hiragana, showTranscription);
    } else if (kana === 'Katakana' || kana === 'katakana') {
        create_table(katakana, showTranscription);
    } else {
        createBothTablesSideBySide(showTranscription);
    }
}

// Обновляем create_table для поддержки транскрипции
function create_table(kana, showTranscription = true, skip = false) {
    let content = document.querySelector('.content');
    if (!skip) {
        clear_content(content)
    }
    
    let i = 0;
    for (let prop in kana) {
        let table = document.createElement('table');
        let tbody = document.createElement('tbody');
        table.appendChild(tbody);
        create_header(table, i);
        create_subtable(tbody, kana, prop, showTranscription);
        i++;
        content.appendChild(table);
    }
}

function create_header(table, i) {
    let header = document.createElement('caption');
    header.innerHTML = name_table[i];
    table.appendChild(header);
}

function create_subtable(tbody, kana, chapter, showTranscription = true) {
    for (let i = 0; i < kana[chapter].length; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < kana[chapter][i].length; j++) {
            let row_data = document.createElement('td');
            const kanaChar = kana[chapter][i][j];
            
            if (showTranscription && kanaChar && kanaChar.trim() !== '') {
                const ruTrans = Kana_ru[chapter] && Kana_ru[chapter][i] && Kana_ru[chapter][i][j] || '';
                const enTrans = Kana_en[chapter] && Kana_en[chapter][i] && Kana_en[chapter][i][j] || '';
                row_data.innerHTML = kanaChar + enter + ruTrans + enter + enTrans;
            } else {
                row_data.innerHTML = kanaChar || '&nbsp;';
            }
            
            row.appendChild(row_data);
            tbody.appendChild(row);
        }
    }
}

// Обновляем createBothTablesSideBySide для поддержки транскрипции
function createBothTablesSideBySide(showTranscription = true) {
    const content = document.querySelector('.content');
    
    const container = document.createElement('div');
    container.className = 'both-kana-container';
    container.style.cssText = 'width: 100%; display: flex; gap: 20px;';
    
    // Хирагана
    const hiraganaContainer = document.createElement('div');
    hiraganaContainer.className = 'kana-table-container hiragana-container';
    hiraganaContainer.style.cssText = 'flex: 1; min-width: 0;';
    
    const hiraganaTitle = document.createElement('h2');
    hiraganaTitle.textContent = 'Хирагана';
    hiraganaTitle.className = 'kana-title';
    hiraganaTitle.style.cssText = 'text-align: center; margin-bottom: 15px;';
    hiraganaContainer.appendChild(hiraganaTitle);
    
    create_table_in_container(hiragana, hiraganaContainer, showTranscription);
    
    // Катакана
    const katakanaContainer = document.createElement('div');
    katakanaContainer.className = 'kana-table-container katakana-container';
    katakanaContainer.style.cssText = 'flex: 1; min-width: 0;';
    
    const katakanaTitle = document.createElement('h2');
    katakanaTitle.textContent = 'Катакана';
    katakanaTitle.className = 'kana-title';
    katakanaTitle.style.cssText = 'text-align: center; margin-bottom: 15px;';
    katakanaContainer.appendChild(katakanaTitle);
    
    create_table_in_container(katakana, katakanaContainer, showTranscription);
    
    container.appendChild(hiraganaContainer);
    container.appendChild(katakanaContainer);
    content.appendChild(container);
}

function create_table_in_container(kana, container, showTranscription = true) {
    let i = 0;
    for (let prop in kana) {
        let table = document.createElement('table');
        let tbody = document.createElement('tbody');
        table.appendChild(tbody);
        
        // Убедимся, что таблица занимает всю ширину
        table.style.cssText = 'width: 100%; table-layout: fixed;';
        
        create_header(table, i);
        create_subtable(tbody, kana, prop, showTranscription);
        i++;
        container.appendChild(table);
    }
    
    // Добавляем стили для ячеек таблицы
    const style = document.createElement('style');
    style.textContent = `
        .kana-table-container table {
            width: 100% !important;
            margin-bottom: 20px;
        }
        .kana-table-container td {
            width: 20% !important;
            padding: 10px 5px !important;
            text-align: center !important;
            border: 1px solid #e2e8f0 !important;
            word-break: break-all;
        }
        .kana-table-container caption {
            display: block;
            padding: 10px;
            background: #f7fafc;
            margin-bottom: 10px;
            border-radius: 6px;
            font-weight: bold;
        }
    `;
    container.appendChild(style);
}