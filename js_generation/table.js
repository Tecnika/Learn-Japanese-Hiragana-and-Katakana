// table.js - Основная логика таблиц каны
// Использует глобальные переменные из const.js и функции из function.js

function create_settings_table() {
    let settings = document.querySelector('.setting');
    clear_content(settings);
    
    const settingsContainer = createElement('div', {
        className: 'compact-settings table-settings'
    });
    settings.appendChild(settingsContainer);
    
    const settingsHeader = createElement('div', {
        className: 'table-settings-header'
    });
    
    const title = createElement('h3', {
        className: 'table-settings-title',
        textContent: 'Таблицы каны'
    });
    
    const quickActions = createElement('div', {
        className: 'table-quick-actions'
    });
    
    const quickButtons = [
        {type: 'both', label: 'あ+ア', dataValue: 'both'},
        {type: 'hiragana', label: 'あ', dataValue: 'hiragana'},
        {type: 'katakana', label: 'ア', dataValue: 'katakana'}
    ];
    
    quickButtons.forEach(btn => {
        const quickBtn = createElement('button', {
            type: 'button',
            textContent: btn.label,
            className: 'table-quick-btn',
            dataset: { type: btn.dataValue }
        });
        quickActions.appendChild(quickBtn);
    });
    
    settingsHeader.appendChild(title);
    settingsHeader.appendChild(quickActions);
    settingsContainer.appendChild(settingsHeader);
    
    const mainRow = createElement('div', {
        className: 'table-main-row'
    });
    
    const leftColumn = createElement('div', {
        className: 'table-left-col'
    });
    
    const kanaLabel = createElement('label', {
        className: 'table-type-label',
        textContent: 'Тип:'
    });
    
    const kanaSelect = createElement('select', {
        className: 'compact-select table-type-select'
    });
    
    const typeOptions = [
        {value: 'both', label: 'Хирагана + Катакана', preview: 'あ+ア'},
        {value: 'hiragana', label: 'Хирагана', preview: 'あいうえお'},
        {value: 'katakana', label: 'Катакана', preview: 'アイウエオ'}
    ];
    
    typeOptions.forEach(option => {
        const optElement = createElement('option', {
            value: option.value,
            textContent: `${option.label} (${option.preview})`
        });
        kanaSelect.appendChild(optElement);
    });
    
    leftColumn.appendChild(kanaLabel);
    leftColumn.appendChild(kanaSelect);
    
    const transcriptionColumn = createElement('div', {
        className: 'table-middle-col'
    });
    
    const transcriptionCheckbox = createElement('input', {
        type: 'checkbox',
        className: 'table-transcription-checkbox',
        id: 'transcription-toggle',
        checked: true
    });
    
    const transcriptionLabel = createElement('label', {
        htmlFor: 'transcription-toggle',
        className: 'table-transcription-label',
        textContent: 'Транскрипция'
    });
    
    transcriptionColumn.appendChild(transcriptionCheckbox);
    transcriptionColumn.appendChild(transcriptionLabel);
    
    const audioColumn = createElement('div', {
        className: 'table-audio-col'
    });
    
    const audioCheckbox = createElement('input', {
        type: 'checkbox',
        className: 'table-audio-checkbox',
        id: 'audio-toggle'
    });
    
    const audioLabel = createElement('label', {
        htmlFor: 'audio-toggle',
        className: 'table-audio-label',
        textContent: 'Аудио'
    });
    
    audioColumn.appendChild(audioCheckbox);
    audioColumn.appendChild(audioLabel);
    
    const applyColumn = createElement('div', {
        className: 'table-apply-col'
    });
    
    const applyBtn = createElement('button', {
        className: 'table-apply-btn',
        textContent: 'Применить'
    });
    
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
    
    switch(kana) {
        case 'hiragana':
            create_table(hiragana, showTranscription, showAudio, KANA_TYPES.HIRAGANA);
            break;
        case 'katakana':
            create_table(katakana, showTranscription, showAudio, KANA_TYPES.KATAKANA);
            break;
        default:
            createBothTablesSideBySide(showTranscription, showAudio);
    }
}

async function create_subtable(tbody, kana, chapter, showTranscription, showAudio, kanaType) {
    for (let i = 0; i < kana[chapter].length; i++) {
        const row = createElement('tr', {
            className: 'kana-table-row'
        });
        
        for (let j = 0; j < kana[chapter][i].length; j++) {
            const cell = createElement('td', {
                className: 'kana-table-cell'
            });
            
            const kanaChar = kana[chapter][i][j];
            
            if (kanaChar && kanaChar.trim() !== '') {
                const charDiv = createElement('div', {
                    className: 'kana-char',
                    textContent: kanaChar
                });
                cell.appendChild(charDiv);
                
                if (showTranscription) {
                    const ruTrans = Kana_ru[chapter]?.[i]?.[j] || '';
                    const enTrans = Kana_en[chapter]?.[i]?.[j] || '';
                    
                    if (ruTrans) {
                        const ruDiv = createElement('div', {
                            className: 'kana-transcription-ru',
                            textContent: ruTrans
                        });
                        cell.appendChild(ruDiv);
                    }
                    
                    if (enTrans) {
                        const enDiv = createElement('div', {
                            className: 'kana-transcription-en',
                            textContent: enTrans
                        });
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
    
    const tableContainer = createElement('div', {
        className: 'kana-table-full-container'
    });
    content.appendChild(tableContainer);
    
    const promises = [];
    let i = 0;
    
    for (let prop in kana) {
        if (!kana[prop]) continue;
        
        const subtableContainer = createElement('div', {
            className: 'kana-subtable-container'
        });
        
        const subtableHeader = createElement('div', {
            className: 'kana-subtable-header',
            textContent: name_table[i] || `Таблица ${i + 1}`
        });
        subtableContainer.appendChild(subtableHeader);
        
        const table = createElement('table', {
            className: 'kana-table'
        });
        const tbody = createElement('tbody');
        
        promises.push(
            create_subtable(tbody, kana, prop, showTranscription, showAudio, kanaType).then(() => {
                table.appendChild(tbody);
                subtableContainer.appendChild(table);
                tableContainer.appendChild(subtableContainer);
            })
        );
        
        i++;
    }
    
    await Promise.all(promises);
}

async function createBothTablesSideBySide(showTranscription = true, showAudio = false) {
    const content = document.querySelector('.content');
    clear_content(content);
    
    const container = createElement('div', {
        className: 'both-kana-container'
    });
    content.appendChild(container);
    
    // Хирагана
    const hiraganaContainer = createElement('div', {
        className: 'kana-side-container hiragana-side'
    });
    container.appendChild(hiraganaContainer);
    
    const hiraganaTitle = createElement('h2', {
        className: 'kana-side-title hiragana-title',
        textContent: 'Хирагана'
    });
    hiraganaContainer.appendChild(hiraganaTitle);
    
    // Катакана
    const katakanaContainer = createElement('div', {
        className: 'kana-side-container katakana-side'
    });
    container.appendChild(katakanaContainer);
    
    const katakanaTitle = createElement('h2', {
        className: 'kana-side-title katakana-title',
        textContent: 'Катакана'
    });
    katakanaContainer.appendChild(katakanaTitle);
    
    const promises = [];
    
    // Хирагана таблицы
    let hiraIndex = 0;
    for (let prop in hiragana) {
        if (!hiragana[prop]) continue;
        
        const subtableContainer = createElement('div', {
            className: 'kana-subtable-container'
        });
        
        const subtableHeader = createElement('div', {
            className: 'kana-subtable-header',
            textContent: name_table[hiraIndex] || `Таблица ${hiraIndex + 1}`
        });
        subtableContainer.appendChild(subtableHeader);
        
        const table = createElement('table', {
            className: 'kana-table'
        });
        const tbody = createElement('tbody');
        
        promises.push(
            create_subtable(tbody, hiragana, prop, showTranscription, showAudio, KANA_TYPES.HIRAGANA).then(() => {
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
        if (!katakana[prop]) continue;
        
        const subtableContainer = createElement('div', {
            className: 'kana-subtable-container'
        });
        
        const subtableHeader = createElement('div', {
            className: 'kana-subtable-header',
            textContent: name_table[kataIndex] || `Таблица ${kataIndex + 1}`
        });
        subtableContainer.appendChild(subtableHeader);
        
        const table = createElement('table', {
            className: 'kana-table'
        });
        const tbody = createElement('tbody');
        
        promises.push(
            create_subtable(tbody, katakana, prop, showTranscription, showAudio, KANA_TYPES.KATAKANA).then(() => {
                table.appendChild(tbody);
                subtableContainer.appendChild(table);
                katakanaContainer.appendChild(subtableContainer);
            })
        );
        
        kataIndex++;
    }
    
    await Promise.all(promises);
}

// Экспорт функций
if (typeof window !== 'undefined') {
    window.create_settings_table = create_settings_table;
    window.settings_table = settings_table;
    window.handleKanaChange = handleKanaChange;
}