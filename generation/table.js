// table.js - Основная логика таблиц каны
// Не требует импортов, использует глобальные переменные из const.js

function create_settings_table() {
    let settings = document.querySelector('.setting');
    clear_content(settings);
    
    const settingsContainer = document.createElement('div');
    settingsContainer.className = 'compact-settings table-settings';
    settings.appendChild(settingsContainer);
    
    const settingsHeader = document.createElement('div');
    settingsHeader.className = 'table-settings-header';
    
    const title = document.createElement('h3');
    title.className = 'table-settings-title';
    title.textContent = 'Таблицы каны';
    
    const quickActions = document.createElement('div');
    quickActions.className = 'table-quick-actions';
    
    const quickButtons = [
        {type: 'both', label: 'あ+ア', dataValue: 'both'},
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
    
    const mainRow = document.createElement('div');
    mainRow.className = 'table-main-row';
    
    const leftColumn = document.createElement('div');
    leftColumn.className = 'table-left-col';
    
    const kanaLabel = document.createElement('label');
    kanaLabel.className = 'table-type-label';
    kanaLabel.textContent = 'Тип:';
    
    const kanaSelect = document.createElement('select');
    kanaSelect.className = 'compact-select table-type-select';
    
    const typeOptions = [
        {value: 'both', label: 'Хирагана + Катакана', preview: 'あ+ア'},
        {value: 'hiragana', label: 'Хирагана', preview: 'あいうえお'},
        {value: 'katakana', label: 'Катакана', preview: 'アイウエオ'}
    ];
    
    typeOptions.forEach(option => {
        const optElement = document.createElement('option');
        optElement.value = option.value;
        optElement.textContent = `${option.label} (${option.preview})`;
        kanaSelect.appendChild(optElement);
    });
    
    leftColumn.appendChild(kanaLabel);
    leftColumn.appendChild(kanaSelect);
    
    const transcriptionColumn = document.createElement('div');
    transcriptionColumn.className = 'table-middle-col';
    
    const transcriptionCheckbox = document.createElement('input');
    transcriptionCheckbox.type = 'checkbox';
    transcriptionCheckbox.className = 'table-transcription-checkbox';
    transcriptionCheckbox.id = 'transcription-toggle';
    transcriptionCheckbox.checked = true;
    
    const transcriptionLabel = document.createElement('label');
    transcriptionLabel.htmlFor = 'transcription-toggle';
    transcriptionLabel.className = 'table-transcription-label';
    transcriptionLabel.textContent = 'Транскрипция';
    
    transcriptionColumn.appendChild(transcriptionCheckbox);
    transcriptionColumn.appendChild(transcriptionLabel);
    
    const audioColumn = document.createElement('div');
    audioColumn.className = 'table-audio-col';
    
    const audioCheckbox = document.createElement('input');
    audioCheckbox.type = 'checkbox';
    audioCheckbox.className = 'table-audio-checkbox';
    audioCheckbox.id = 'audio-toggle';
    audioCheckbox.checked = false;
    
    const audioLabel = document.createElement('label');
    audioLabel.htmlFor = 'audio-toggle';
    audioLabel.className = 'table-audio-label';
    audioLabel.textContent = 'Аудио';
    
    audioColumn.appendChild(audioCheckbox);
    audioColumn.appendChild(audioLabel);
    
    const applyColumn = document.createElement('div');
    applyColumn.className = 'table-apply-col';
    
    const applyBtn = document.createElement('button');
    applyBtn.className = 'table-apply-btn';
    applyBtn.textContent = 'Применить';
    
    applyColumn.appendChild(applyBtn);
    
    mainRow.appendChild(leftColumn);
    mainRow.appendChild(transcriptionColumn);
    mainRow.appendChild(audioColumn);
    mainRow.appendChild(applyColumn);
    settingsContainer.appendChild(mainRow);
    
    const updateTable = () => {
        handleKanaChange(kanaSelect.value, transcriptionCheckbox.checked, audioCheckbox.checked);
    };
    
    kanaSelect.addEventListener('change', function() {
        updateTable();
        quickButtons.forEach(btn => {
            const btnElement = document.querySelector(`[data-type="${btn.dataValue}"]`);
            if (btnElement) {
                const isActive = btn.dataValue === this.value;
                btnElement.classList.toggle('table-quick-btn-active', isActive);
            }
        });
    });
    
    quickButtons.forEach(btn => {
        const btnElement = document.querySelector(`[data-type="${btn.dataValue}"]`);
        if (btnElement) {
            btnElement.addEventListener('click', function() {
                kanaSelect.value = btn.dataValue;
                updateTable();
                quickButtons.forEach(b => {
                    const bElement = document.querySelector(`[data-type="${b.dataValue}"]`);
                    if (bElement) {
                        bElement.classList.toggle('table-quick-btn-active', b.dataValue === btn.dataValue);
                    }
                });
            });
        }
    });
    
    transcriptionCheckbox.addEventListener('change', updateTable);
    audioCheckbox.addEventListener('change', updateTable);
    applyBtn.addEventListener('click', updateTable);
    
    setTimeout(() => {
        const activeBtn = document.querySelector('[data-type="both"]');
        if (activeBtn) {
            activeBtn.classList.add('table-quick-btn-active');
        }
    }, 10);
    
    updateTable();
}

function settings_table() {
    create_settings_table();
}

function handleKanaChange(kana, showTranscription = true, showAudio = false) {
    const content = document.querySelector('.content');
    clear_content(content);
    
    if (kana === 'Hiragana' || kana === 'hiragana') {
        create_table(hiragana, showTranscription, showAudio, 'hiragana');
    } else if (kana === 'Katakana' || kana === 'katakana') {
        create_table(katakana, showTranscription, showAudio, 'katakana');
    } else {
        createBothTablesSideBySide(showTranscription, showAudio);
    }
}

async function create_subtable(tbody, kana, chapter, showTranscription, showAudio, kanaType) {
    for (let i = 0; i < kana[chapter].length; i++) {
        const row = document.createElement('tr');
        row.className = 'kana-table-row';
        
        for (let j = 0; j < kana[chapter][i].length; j++) {
            const cell = document.createElement('td');
            cell.className = 'kana-table-cell';
            
            const kanaChar = kana[chapter][i][j];
            
            if (kanaChar && kanaChar.trim() !== '') {
                const charDiv = document.createElement('div');
                charDiv.className = 'kana-char';
                charDiv.textContent = kanaChar;
                cell.appendChild(charDiv);
                
                if (showTranscription) {
                    const ruTrans = Kana_ru[chapter] && Kana_ru[chapter][i] && Kana_ru[chapter][i][j] || '';
                    const enTrans = Kana_en[chapter] && Kana_en[chapter][i] && Kana_en[chapter][i][j] || '';
                    
                    if (ruTrans) {
                        const ruDiv = document.createElement('div');
                        ruDiv.className = 'kana-transcription-ru';
                        ruDiv.textContent = ruTrans;
                        cell.appendChild(ruDiv);
                    }
                    
                    if (enTrans) {
                        const enDiv = document.createElement('div');
                        enDiv.className = 'kana-transcription-en';
                        enDiv.textContent = enTrans;
                        cell.appendChild(enDiv);
                    }
                } else {
                    charDiv.className = 'kana-char-only';
                }
                
                // Аудио элементы
                if (showAudio && kanaChar.trim() !== '') {
                    if (typeof createAudioElement === 'function') {
                        const audioElement = await createAudioElement(kanaChar, kanaType);
                        if (audioElement) {
                            cell.appendChild(audioElement);
                        }
                    }
                }
            } else {
                cell.innerHTML = '&nbsp;';
            }
            
            row.appendChild(cell);
        }
        
        tbody.appendChild(row);
    }
}

async function create_table(kana, showTranscription, showAudio, kanaType, skip) {
    let content = document.querySelector('.content');
    if (!skip) {
        clear_content(content);
    }
    
    const tableContainer = document.createElement('div');
    tableContainer.className = 'kana-table-full-container';
    content.appendChild(tableContainer);
    
    const promises = [];
    let i = 0;
    
    for (let prop in kana) {
        const subtableContainer = document.createElement('div');
        subtableContainer.className = 'kana-subtable-container';
        
        const subtableHeader = document.createElement('div');
        subtableHeader.className = 'kana-subtable-header';
        subtableHeader.textContent = name_table[i] || `Таблица ${i + 1}`;
        subtableContainer.appendChild(subtableHeader);
        
        const table = document.createElement('table');
        table.className = 'kana-table';
        const tbody = document.createElement('tbody');
        
        // Запускаем создание подтаблицы
        promises.push(
            create_subtable(tbody, kana, prop, showTranscription, showAudio, kanaType).then(() => {
                table.appendChild(tbody);
                subtableContainer.appendChild(table);
                tableContainer.appendChild(subtableContainer);
            })
        );
        
        i++;
    }
    
    // Ждем завершения всех подтаблиц
    await Promise.all(promises);
}

async function createBothTablesSideBySide(showTranscription = true, showAudio = false) {
    const content = document.querySelector('.content');
    
    const container = document.createElement('div');
    container.className = 'both-kana-container';
    content.appendChild(container);
    
    // Хирагана
    const hiraganaContainer = document.createElement('div');
    hiraganaContainer.className = 'kana-side-container hiragana-side';
    container.appendChild(hiraganaContainer);
    
    const hiraganaTitle = document.createElement('h2');
    hiraganaTitle.className = 'kana-side-title hiragana-title';
    hiraganaTitle.textContent = 'Хирагана';
    hiraganaContainer.appendChild(hiraganaTitle);
    
    // Катакана
    const katakanaContainer = document.createElement('div');
    katakanaContainer.className = 'kana-side-container katakana-side';
    container.appendChild(katakanaContainer);
    
    const katakanaTitle = document.createElement('h2');
    katakanaTitle.className = 'kana-side-title katakana-title';
    katakanaTitle.textContent = 'Катакана';
    katakanaContainer.appendChild(katakanaTitle);
    
    // Создаем таблицы параллельно
    const promises = [];
    
    // Хирагана таблицы
    let hiraIndex = 0;
    for (let prop in hiragana) {
        const subtableContainer = document.createElement('div');
        subtableContainer.className = 'kana-subtable-container';
        
        const subtableHeader = document.createElement('div');
        subtableHeader.className = 'kana-subtable-header';
        subtableHeader.textContent = name_table[hiraIndex] || `Таблица ${hiraIndex + 1}`;
        subtableContainer.appendChild(subtableHeader);
        
        const table = document.createElement('table');
        table.className = 'kana-table';
        const tbody = document.createElement('tbody');
        
        promises.push(
            create_subtable(tbody, hiragana, prop, showTranscription, showAudio, 'hiragana').then(() => {
                table.appendChild(tbody);
                subtableContainer.appendChild(table);
                hiraganaContainer.appendChild(subtableContainer);
            })
        );
        
        hiraIndex++;
    }
    
    // Катакана таблицы
    let kataIndex = 0;
    for (let prop in katakana) {
        const subtableContainer = document.createElement('div');
        subtableContainer.className = 'kana-subtable-container';
        
        const subtableHeader = document.createElement('div');
        subtableHeader.className = 'kana-subtable-header';
        subtableHeader.textContent = name_table[kataIndex] || `Таблица ${kataIndex + 1}`;
        subtableContainer.appendChild(subtableHeader);
        
        const table = document.createElement('table');
        table.className = 'kana-table';
        const tbody = document.createElement('tbody');
        
        promises.push(
            create_subtable(tbody, katakana, prop, showTranscription, showAudio, 'katakana').then(() => {
                table.appendChild(tbody);
                subtableContainer.appendChild(table);
                katakanaContainer.appendChild(subtableContainer);
            })
        );
        
        kataIndex++;
    }
    
    // Ждем завершения всех таблиц
    await Promise.all(promises);
}