// js_generation/propisi_kana.js - Прописи каны для практики письма

// Настройки по умолчанию
const PROPISI_KANA_SETTINGS = {
    kanaType: 'hiragana',
    rows: 5,
    columns: 5,
    showHints: true,
    showSample: true,
    selectedSymbols: [],
    tableMode: 'compact'
};

/**
 * Получение данных таблицы каны в правильном формате
 */
function getKanaTableData(kanaType) {
    const data = kanaType === 'hiragana' ? hiragana.main : katakana.main;
    
    // Проверяем и очищаем данные
    if (!data || !data.length) return [];
    
    const cleanedData = [];
    data.forEach(row => {
        const cleanedRow = row.filter(cell => cell && cell.trim() !== '');
        if (cleanedRow.length > 0) {
            cleanedData.push(cleanedRow);
        }
    });
    
    return cleanedData;
}

/**
 * Получение транскрипции для символа
 */
function getTranscriptionForSymbol(symbol, kanaType) {
    const dataType = kanaType === 'hiragana' ? Kana_ru : Kana_ru;
    const data = dataType.main || [];
    
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === symbol || 
                data[i][j] === symbol.toUpperCase() || 
                data[i][j] === symbol.toLowerCase()) {
                return {
                    ru: data[i][j] || symbol,
                    en: kanaType === 'hiragana' ? 
                        (Kana_en?.main?.[i]?.[j] || symbol) : 
                        (Kana_en?.main?.[i]?.[j] || symbol)
                };
            }
        }
    }
    
    return { ru: symbol, en: symbol };
}

/**
 * Получение SVG-пути для символа
 */
function getSvgPathForSymbol(symbol, kanaType) {
    // Простая реализация - если нужны реальные SVG, их нужно добавить в папки
    return null;
}

/**
 * Выбор всех символов
 */
function selectAllSymbols() {
    const kanaType = document.getElementById('propisi-kana-type-select').value;
    const data = getKanaTableData(kanaType);
    
    PROPISI_KANA_SETTINGS.selectedSymbols = [];
    
    data.forEach(row => {
        row.forEach(symbol => {
            if (symbol && symbol.trim() !== '') {
                PROPISI_KANA_SETTINGS.selectedSymbols.push(symbol);
            }
        });
    });
    
    // Обновляем визуальное состояние
    document.querySelectorAll('.kana-key.compact-key').forEach(key => {
        key.classList.add('selected');
    });
    
    updateSelectedCount();
}

/**
 * Снятие выбора со всех символов
 */
function deselectAllSymbols() {
    PROPISI_KANA_SETTINGS.selectedSymbols = [];
    
    // Обновляем визуальное состояние
    document.querySelectorAll('.kana-key.compact-key').forEach(key => {
        key.classList.remove('selected');
    });
    
    updateSelectedCount();
}

/**
 * Обновление счетчика выбранных символов
 */
function updateSelectedCount() {
    const selectedCount = document.querySelector('.selected-count');
    if (selectedCount) {
        selectedCount.textContent = `Выбрано: ${PROPISI_KANA_SETTINGS.selectedSymbols.length}`;
    }
}

/**
 * Создание компактной ВЕРТИКАЛЬНОЙ клавиатуры каны (строки как столбцы)
 */
function createCompactHorizontalKeyboard() {
    const keyboard = document.getElementById('kana-keyboard');
    if (!keyboard) return;
    
    clear_content(keyboard);
    
    const kanaType = document.getElementById('propisi-kana-type-select')?.value || PROPISI_KANA_SETTINGS.kanaType;
    const data = getKanaTableData(kanaType);
    
    if (!data || data.length === 0) {
        const errorMsg = createElement('p', {
            textContent: 'Не удалось загрузить данные каны',
            style: 'color: #e53e3e; text-align: center; padding: 10px;'
        });
        keyboard.appendChild(errorMsg);
        return;
    }
    
    // Сохраняем текущие выбранные символы
    const currentSelections = [...PROPISI_KANA_SETTINGS.selectedSymbols];
    
    // Создаем строки (теперь как столбцы)
    data.forEach((row, rowIndex) => {
        const rowDiv = createElement('div', {
            className: 'kana-row'
        });
        
        // Добавляем символы
        row.forEach((symbol, colIndex) => {
            if (symbol && symbol.trim() !== '') {
                const key = createElement('button', {
                    className: 'kana-key compact-key',
                    textContent: symbol,
                    dataset: { 
                        symbol: symbol, 
                        row: rowIndex, 
                        col: colIndex 
                    },
                    title: `${symbol} (${getTranscriptionForSymbol(symbol, kanaType).ru})`
                });
                
                // Проверяем, выбран ли символ
                if (currentSelections.includes(symbol)) {
                    key.classList.add('selected');
                    if (!PROPISI_KANA_SETTINGS.selectedSymbols.includes(symbol)) {
                        PROPISI_KANA_SETTINGS.selectedSymbols.push(symbol);
                    }
                }
                
                key.addEventListener('click', function() {
                    const symbol = this.dataset.symbol;
                    
                    // Переключаем класс
                    this.classList.toggle('selected');
                    
                    // Обновляем массив выбранных символов
                    if (this.classList.contains('selected')) {
                        if (!PROPISI_KANA_SETTINGS.selectedSymbols.includes(symbol)) {
                            PROPISI_KANA_SETTINGS.selectedSymbols.push(symbol);
                        }
                    } else {
                        const index = PROPISI_KANA_SETTINGS.selectedSymbols.indexOf(symbol);
                        if (index > -1) {
                            PROPISI_KANA_SETTINGS.selectedSymbols.splice(index, 1);
                        }
                    }
                    
                    updateSelectedCount();
                });
                
                rowDiv.appendChild(key);
            } else {
                // Пустая ячейка для выравнивания
                const emptyCell = createElement('div', {
                    className: 'empty-cell'
                });
                rowDiv.appendChild(emptyCell);
            }
        });
        
        keyboard.appendChild(rowDiv);
    });
    
    // Выбираем первую строку по умолчанию, если ничего не выбрано
    if (PROPISI_KANA_SETTINGS.selectedSymbols.length === 0 && data.length > 0) {
        selectFirstRow(kanaType, data);
    }
    
    updateSelectedCount();
}

/**
 * Выбрать первую строку символов
 */
function selectFirstRow(kanaType, data) {
    if (!data || !data.length) return;
    
    // Выбираем первую строку
    const firstRow = data[0];
    PROPISI_KANA_SETTINGS.selectedSymbols = [...firstRow.filter(s => s && s.trim() !== '')];
    
    // Обновляем визуальное состояние клавиш
    setTimeout(() => {
        document.querySelectorAll('.kana-key.compact-key').forEach((key, index) => {
            if (index < firstRow.length) {
                key.classList.add('selected');
            }
        });
        updateSelectedCount();
    }, 100);
}

/**
 * Основная функция настройки с ИНТЕГРИРОВАННЫМ выбором символов
 */
function settings_propisi_kana() {
    let settings = document.querySelector('.setting');
    clear_content(settings);
    
    const settingsContainer = createElement('div', {
        className: 'propisi-kana-settings compact-layout'
    });
    
    // Заголовок
    const header = createElement('div', {
        className: 'settings-header'
    });
    
    const title = createElement('h3', {
        textContent: 'Прописи каны'
    });
    
    header.appendChild(title);
    settingsContainer.appendChild(header);
    
    // Основные настройки в строку
    const settingsRow = createElement('div', {
        className: 'settings-row'
    });
    
    // Выбор каны
    const kanaSelectGroup = createElement('div', {
        className: 'form-group'
    });
    
    const kanaSelectLabel = createElement('label', {
        htmlFor: 'propisi-kana-type-select',
        textContent: 'Кана:'
    });
    
    const kanaSelect = createElement('select', {
        id: 'propisi-kana-type-select',
        className: 'form-select'
    });
    
    const kanaOptions = [
        { value: 'hiragana', label: 'Хирагана' },
        { value: 'katakana', label: 'Катакана' }
    ];
    
    kanaOptions.forEach(option => {
        const opt = createElement('option', {
            value: option.value,
            textContent: option.label,
            selected: option.value === PROPISI_KANA_SETTINGS.kanaType
        });
        kanaSelect.appendChild(opt);
    });
    
    kanaSelectGroup.appendChild(kanaSelectLabel);
    kanaSelectGroup.appendChild(kanaSelect);
    settingsRow.appendChild(kanaSelectGroup);
    
    // Количество строк
    const rowsGroup = createElement('div', {
        className: 'form-group'
    });
    
    const rowsLabel = createElement('label', {
        htmlFor: 'propisi-kana-rows-select',
        textContent: 'Столбцы:'
    });
    
    const rowsSelect = createElement('select', {
        id: 'propisi-kana-rows-select',
        className: 'form-select'
    });
    
    for (let i = 3; i <= 8; i++) {
        const option = createElement('option', {
            value: i,
            textContent: i,
            selected: i === PROPISI_KANA_SETTINGS.rows
        });
        rowsSelect.appendChild(option);
    }
    
    rowsGroup.appendChild(rowsLabel);
    rowsGroup.appendChild(rowsSelect);
    settingsRow.appendChild(rowsGroup);
    
    // Количество столбцов
    const columnsGroup = createElement('div', {
        className: 'form-group'
    });
    
    const columnsLabel = createElement('label', {
        htmlFor: 'propisi-kana-columns-select',
        textContent: 'Строки:'
    });
    
    const columnsSelect = createElement('select', {
        id: 'propisi-kana-columns-select',
        className: 'form-select'
    });
    
    for (let i = 3; i <= 8; i++) {
        const option = createElement('option', {
            value: i,
            textContent: i,
            selected: i === PROPISI_KANA_SETTINGS.columns
        });
        columnsSelect.appendChild(option);
    }
    
    columnsGroup.appendChild(columnsLabel);
    columnsGroup.appendChild(columnsSelect);
    settingsRow.appendChild(columnsGroup);
    
    // Чекбоксы в строку
    const checkboxesRow = createElement('div', {
        className: 'checkboxes-row'
    });
    
    const hintsCheckbox = createElement('input', {
        type: 'checkbox',
        id: 'propisi-kana-show-hints',
        className: 'form-checkbox',
        checked: PROPISI_KANA_SETTINGS.showHints
    });
    
    const hintsLabel = createElement('label', {
        htmlFor: 'propisi-kana-show-hints',
        textContent: 'Подсказки SVG',
        className: 'checkbox-label'
    });
    hintsLabel.prepend(hintsCheckbox);
    
    const sampleCheckbox = createElement('input', {
        type: 'checkbox',
        id: 'propisi-kana-show-sample',
        className: 'form-checkbox',
        checked: PROPISI_KANA_SETTINGS.showSample
    });
    
    const sampleLabel = createElement('label', {
        htmlFor: 'propisi-kana-show-sample',
        textContent: 'Образцы',
        className: 'checkbox-label'
    });
    sampleLabel.prepend(sampleCheckbox);
    
    checkboxesRow.appendChild(hintsLabel);
    checkboxesRow.appendChild(sampleLabel);
    settingsRow.appendChild(checkboxesRow);
    
    settingsContainer.appendChild(settingsRow);
    
    // === БЛОК ВЫБОРА СИМВОЛОВ (интегрирован в настройки) ===
    const selectionBlock = createElement('div', {
        className: 'symbol-selection-block',
        style: 'margin: 20px 0; padding: 15px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;'
    });
    
    // Заголовок блока выбора
    const selectionHeader = createElement('div', {
        className: 'selection-header',
        style: 'margin-bottom: 15px;'
    });
    
    const selectionTitle = createElement('h4', {
        style: 'margin: 0; color: #2d3748; font-size: 16px;',
        textContent: 'Выберите символы для прописей:'
    });
    
    const selectionControls = createElement('div', {
        className: 'selection-controls',
        style: 'display: flex; gap: 10px; align-items: center; margin-top: 10px;'
    });
    
    const selectAllBtn = createElement('button', {
        className: 'control-btn select-all',
        textContent: 'Выбрать все',
        style: 'padding: 6px 12px; background: #4299e1; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;'
    });
    
    const deselectAllBtn = createElement('button', {
        className: 'control-btn deselect-all',
        textContent: 'Снять все',
        style: 'padding: 6px 12px; background: #e53e3e; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;'
    });
    
    const selectedCount = createElement('span', {
        className: 'selected-count',
        textContent: `Выбрано: ${PROPISI_KANA_SETTINGS.selectedSymbols.length}`,
        style: 'font-size: 14px; color: #2d3748; background: white; padding: 6px 12px; border-radius: 4px; border: 1px solid #e2e8f0;'
    });
    
    selectionControls.appendChild(selectAllBtn);
    selectionControls.appendChild(deselectAllBtn);
    selectionControls.appendChild(selectedCount);
    
    selectionHeader.appendChild(selectionTitle);
    selectionHeader.appendChild(selectionControls);
    
    // Информация о выборе
    const selectionInfo = createElement('p', {
        style: 'font-size: 13px; color: #718096; margin: 10px 0; font-style: italic;',
        textContent: 'Кликните по символам для выбора/отмены выбора'
    });
    
    // Клавиатура каны
    const keyboard = createElement('div', {
        className: 'kana-keyboard compact-keyboard compact-kana-grid kana-rows-container',
        id: 'kana-keyboard',
        style: 'margin-top: 15px; padding: 10px; background: white; border-radius: 6px; border: 1px solid #e2e8f0;'
    });
    
    selectionBlock.appendChild(selectionHeader);
    selectionBlock.appendChild(keyboard);
    selectionBlock.appendChild(selectionInfo);
    settingsContainer.appendChild(selectionBlock);
    // === КОНЕЦ БЛОКА ВЫБОРА СИМВОЛОВ ===
    
    // Кнопка генерации
    const generateBtn = createElement('button', {
        id: 'propisi-kana-generate-btn',
        className: 'generate-btn',
        textContent: 'Сгенерировать прописи',
        style: 'width: 100%; padding: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; margin-top: 20px;'
    });
    
    settingsContainer.appendChild(generateBtn);
    settings.appendChild(settingsContainer);
    
    // Обработчики событий
    kanaSelect.addEventListener('change', function() {
        PROPISI_KANA_SETTINGS.kanaType = this.value;
        PROPISI_KANA_SETTINGS.selectedSymbols = [];
        
        // Обновляем клавиатуру
        createCompactHorizontalKeyboard();
        updateSelectedCount();
    });
    
    hintsCheckbox.addEventListener('change', function() {
        PROPISI_KANA_SETTINGS.showHints = this.checked;
    });
    
    sampleCheckbox.addEventListener('change', function() {
        PROPISI_KANA_SETTINGS.showSample = this.checked;
    });
    
    rowsSelect.addEventListener('change', function() {
        PROPISI_KANA_SETTINGS.rows = parseInt(this.value);
    });
    
    columnsSelect.addEventListener('change', function() {
        PROPISI_KANA_SETTINGS.columns = parseInt(this.value);
    });
    
    selectAllBtn.addEventListener('click', function() {
        selectAllSymbols();
        updateSelectedCount();
    });
    
    deselectAllBtn.addEventListener('click', function() {
        deselectAllSymbols();
        updateSelectedCount();
    });
    
    generateBtn.addEventListener('click', function() {
        // Сохраняем настройки
        saveSettings('propisi_kana', {
            kanaType: PROPISI_KANA_SETTINGS.kanaType,
            rows: PROPISI_KANA_SETTINGS.rows,
            columns: PROPISI_KANA_SETTINGS.columns,
            showHints: PROPISI_KANA_SETTINGS.showHints,
            showSample: PROPISI_KANA_SETTINGS.showSample,
            selectedSymbols: PROPISI_KANA_SETTINGS.selectedSymbols
        });
        
        updatePropisiKana();
    });
    
    // Загружаем сохраненные настройки
    const savedSettings = getSettings('propisi_kana');
    if (savedSettings) {
        Object.assign(PROPISI_KANA_SETTINGS, savedSettings);
    }
    
    // Первоначальная генерация клавиатуры
    setTimeout(() => {
        createCompactHorizontalKeyboard();
    }, 100);
}

/**
 * Генерация таблицы для практики письма
 * ОТДЕЛЬНАЯ ТАБЛИЦА НА КАЖДЫЙ СИМВОЛ
 */
function generateCompactPracticeTable() {
    const content = document.querySelector('.content');
    clear_content(content);
    
    // Получаем текущие настройки
    const kanaType = PROPISI_KANA_SETTINGS.kanaType;
    const rows = PROPISI_KANA_SETTINGS.rows;
    const columns = PROPISI_KANA_SETTINGS.columns;
    const selectedSymbols = PROPISI_KANA_SETTINGS.selectedSymbols;
    
    // Проверяем, есть ли выбранные символы
    if (selectedSymbols.length === 0) {
        const message = createElement('div', {
            className: 'no-symbols-message',
            style: 'text-align: center; padding: 40px; color: #4a5568; font-size: 16px; background: #f7fafc; border-radius: 10px; border: 2px dashed #cbd5e0;',
            textContent: 'Выберите хотя бы один символ в настройках выше и нажмите "Сгенерировать прописи"'
        });
        content.appendChild(message);
        return;
    }
    
    // Создаем контейнер для всех таблиц
    const tablesContainer = createElement('div', {
        className: 'propisi-tables-container',
        style: 'display: flex; flex-direction: column; gap: 30px;'
    });
    
    // Для каждого выбранного символа создаем отдельную таблицу
    selectedSymbols.forEach((symbol, symbolIndex) => {
        // Создаем таблицу для текущего символа
        const tableSection = createElement('div', {
            className: 'propisi-table-section',
            style: 'background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);'
        });
        
        // Заголовок таблицы с символом
        const tableHeader = createElement('div', {
            style: 'margin-bottom: 15px; text-align: center;'
        });
        
        const symbolTitle = createElement('h3', {
            style: 'margin: 0; color: #2d3748; font-size: 24px;',
            textContent: `Символ: ${symbol}`
        });
        
        // Транскрипция
        const transcription = getTranscriptionForSymbol(symbol, kanaType);
        const transcriptionText = createElement('p', {
            style: 'margin: 5px 0 0 0; color: #718096; font-size: 14px;',
            textContent: `Транскрипция: ${transcription.ru}`
        });
        
        tableHeader.appendChild(symbolTitle);
        tableHeader.appendChild(transcriptionText);
        tableSection.appendChild(tableHeader);
        
        // Создаем таблицу для практики письма
        const tableContainer = createElement('div', {
            className: 'propisi-table-container',
            style: 'overflow-x: auto; margin-bottom: 10px;'
        });
        
        const table = createElement('table', {
            className: 'propisi-practice-table',
            style: 'table-layout: fixed; width: 100%; border-collapse: collapse; margin: 0 auto; border: 2px solid #2d3748; background: white;'
        });
        
        const tbody = createElement('tbody');
        
        // Генерация таблицы для одного символа
        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
            const row = createElement('tr', {
                className: 'propisi-practice-row',
                style: 'height: 80px;'
            });
            
            for (let colIndex = 0; colIndex < columns; colIndex++) {
                const cell = createElement('td', {
                    className: 'propisi-practice-cell',
                    style: 'width: 80px; height: 80px; border: 2px solid #000; text-align: center; vertical-align: middle; position: relative; padding: 5px;'
                });
                
                if (rowIndex === 0) {
                    // Первая строка
                    if (colIndex === 0) {
                        // Первая ячейка - темный символ (образец)
                        const darkSymbol = createElement('div', {
                            className: 'dark-symbol',
                            textContent: symbol,
                            style: 'color: #000; font-size: 36px; font-weight: bold; font-family: "MS Mincho", "SimSun", serif;'
                        });
                        cell.appendChild(darkSymbol);
                        cell.style.backgroundColor = '#f0f9ff'; // Светло-голубой фон для образца
                    } else {
                        // Остальные ячейки - бледные символы
                        const paleSymbol = createElement('div', {
                            className: 'pale-symbol',
                            textContent: symbol,
                            style: 'color: #cbd5e0; font-size: 36px; font-weight: bold; font-family: "MS Mincho", "SimSun", serif;'
                        });
                        cell.appendChild(paleSymbol);
                    }
                    
                } else if (rowIndex === 1) {
                    // Вторая строка - все бледные символы
                    const paleSymbol = createElement('div', {
                        className: 'pale-symbol',
                        textContent: symbol,
                        style: 'color: #cbd5e0; font-size: 36px; font-weight: bold; font-family: "MS Mincho", "SimSun", serif;'
                    });
                    cell.appendChild(paleSymbol);
                    
                } else {
                    // Все остальные строки: пустые ячейки для практики
                    cell.style.backgroundColor = '#f8fafc';
                    
                    // Добавляем направляющие линии
                    const guideHorizontal = createElement('div', {
                        className: 'guide-line horizontal',
                        style: 'position: absolute; top: 50%; left: 5px; right: 5px; height: 1px; background: rgba(0, 0, 0, 0.15); transform: translateY(-50%);'
                    });
                    
                    const guideVertical = createElement('div', {
                        className: 'guide-line vertical',
                        style: 'position: absolute; left: 50%; top: 5px; bottom: 5px; width: 1px; background: rgba(0, 0, 0, 0.15); transform: translateX(-50%);'
                    });
                    
                    cell.appendChild(guideHorizontal);
                    cell.appendChild(guideVertical);
                }
                
                row.appendChild(cell);
            }
            
            tbody.appendChild(row);
        }
        
        table.appendChild(tbody);
        tableContainer.appendChild(table);
        tableSection.appendChild(tableContainer);
        
        // Добавляем легенду только для первой таблицы
        if (symbolIndex === 0) {
            const legend = createElement('div', {
                className: 'practice-legend',
                style: 'margin: 15px 0; padding: 15px; background: #f7fafc; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 14px; color: #4a5568;'
            });
            
            const legendContent = createElement('div', {
                style: 'display: flex; flex-direction: column; gap: 10px;'
            });
            
            // Темный символ
            const darkLegend = createElement('div', {
                style: 'display: flex; align-items: center; gap: 10px;'
            });
            
            const darkExample = createElement('div', {
                style: 'width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #000; font-weight: bold; border: 2px solid #000; background: #f0f9ff;'
            });
            
            darkExample.textContent = symbol;
            
            const darkText = createElement('span', {
                textContent: '— Образец для изучения'
            });
            
            darkLegend.appendChild(darkExample);
            darkLegend.appendChild(darkText);
            
            // Бледный символ
            const paleLegend = createElement('div', {
                style: 'display: flex; align-items: center; gap: 10px;'
            });
            
            const paleExample = createElement('div', {
                style: 'width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #cbd5e0; font-weight: bold; border: 2px solid #000;'
            });
            
            paleExample.textContent = symbol;
            
            const paleText = createElement('span', {
                textContent: '— Для обводки и тренировки'
            });
            
            paleLegend.appendChild(paleExample);
            paleLegend.appendChild(paleText);
            
            // Пустая ячейка
            const emptyLegend = createElement('div', {
                style: 'display: flex; align-items: center; gap: 10px;'
            });
            
            const emptyExample = createElement('div', {
                style: 'width: 40px; height: 40px; background: #f8fafc; border: 2px solid #000; position: relative;'
            });
            
            // Добавляем крестик в примере
            const emptyCross1 = createElement('div', {
                style: 'position: absolute; top: 50%; left: 5px; right: 5px; height: 1px; background: rgba(0, 0, 0, 0.15); transform: translateY(-50%);'
            });
            
            const emptyCross2 = createElement('div', {
                style: 'position: absolute; left: 50%; top: 5px; bottom: 5px; width: 1px; background: rgba(0, 0, 0, 0.15); transform: translateX(-50%);'
            });
            
            emptyExample.appendChild(emptyCross1);
            emptyExample.appendChild(emptyCross2);
            
            const emptyText = createElement('span', {
                textContent: '— Для самостоятельного письма'
            });
            
            emptyLegend.appendChild(emptyExample);
            emptyLegend.appendChild(emptyText);
            
            legendContent.appendChild(darkLegend);
            legendContent.appendChild(paleLegend);
            legendContent.appendChild(emptyLegend);
            legend.appendChild(legendContent);
            tableSection.appendChild(legend);
        }
        
        // Добавляем разделитель между таблицами (кроме последней)
        if (symbolIndex < selectedSymbols.length - 1) {
            const separator = createElement('div', {
                style: 'height: 1px; background: #e2e8f0; margin: 20px 0;'
            });
            tableSection.appendChild(separator);
        }
        
        tablesContainer.appendChild(tableSection);
    });
    
    // Добавляем общую инструкцию
    const instructions = createElement('div', {
        className: 'practice-instructions',
        style: 'margin: 15px 0; padding: 15px; background: #e6fffa; border-radius: 8px; border: 1px solid #81e6d9; color: #234e52;'
    });
    
    const instructionsTitle = createElement('h5', {
        style: 'margin: 0 0 10px 0; color: #234e52; font-size: 16px;',
        textContent: 'Как использовать прописи:'
    });
    
    const instructionsList = createElement('ol', {
        style: 'margin: 0; padding-left: 20px;'
    });
    
    const steps = [
        'Изучите образец (черный символ в левом верхнем углу)',
        'Потренируйтесь обводить бледные символы',
        'В пустых ячейках напишите символ самостоятельно',
        'Повторяйте до уверенного написания каждого символа'
    ];
    
    steps.forEach(step => {
        const li = createElement('li', {
            style: 'margin-bottom: 5px;',
            textContent: step
        });
        instructionsList.appendChild(li);
    });
    
    const tip = createElement('div', {
        style: 'margin-top: 10px; font-style: italic;',
        textContent: 'Совет: Распечатайте таблицу и используйте ручку или карандаш для практики'
    });
    
    instructions.appendChild(instructionsTitle);
    instructions.appendChild(instructionsList);
    instructions.appendChild(tip);
    
    // Добавляем все в content
    content.appendChild(tablesContainer);
    content.appendChild(instructions);
    
    // Добавляем кнопку для возврата к настройкам
    const backToSettingsBtn = createElement('button', {
        style: 'margin-top: 20px; padding: 10px 20px; background: #4299e1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; width: 100%;',
        textContent: 'Вернуться к настройкам'
    });
    
    backToSettingsBtn.addEventListener('click', function() {
        settings_propisi_kana();
    });
    
    content.appendChild(backToSettingsBtn);
}

/**
 * Обновленная функция генерации прописей
 */
function updatePropisiKana() {
    generateCompactPracticeTable();
}

// Инициализация функции
function generator_propisi_kana() {
    settings_propisi_kana();
}

// Экспорт функций
if (typeof window !== 'undefined') {
    window.settings_propisi_kana = settings_propisi_kana;
    window.generator_propisi_kana = generator_propisi_kana;
    window.updatePropisiKana = updatePropisiKana;
    window.createCompactHorizontalKeyboard = createCompactHorizontalKeyboard;
    window.selectAllSymbols = selectAllSymbols;
    window.deselectAllSymbols = deselectAllSymbols;
}