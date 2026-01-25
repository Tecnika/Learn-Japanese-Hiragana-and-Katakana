// js_generation/propisi_kana.js - Горизонтальный компактный формат

// Настройки по умолчанию
const PROPISI_KANA_SETTINGS = {
    kanaType: 'hiragana',
    rows: 5,
    columns: 5,
    showHints: true,
    showSample: true,
    selectedSymbols: [],
    tableMode: 'compact' // Новая настройка
};

/**
 * Получение символов, отсортированных по строкам (горизонтальный формат)
 * @param {string} kanaType - 'hiragana' или 'katakana'
 * @returns {Array} - Массив символов в порядке строк
 */
function getSymbolsSortedByRows(kanaType) {
    const data = kanaType === 'hiragana' ? hiragana.main : katakana.main;
    
    if (!data || !data.length) return [];
    
    const symbols = [];
    
    // Собираем символы по строкам (горизонтально)
    for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[row].length; col++) {
            const symbol = data[row] && data[row][col];
            if (symbol && symbol.trim() !== '') {
                symbols.push(symbol);
            }
        }
    }
    
    return symbols;
}

/**
 * Создание компактной горизонтальной клавиатуры
 */
function createCompactHorizontalKeyboard() {
    const keyboard = document.getElementById('kana-keyboard');
    if (!keyboard) return;
    
    clear_content(keyboard);
    
    const kanaType = document.getElementById('propisi-kana-type-select').value;
    const data = getKanaTableData(kanaType);
    
    if (!data || !data.length) {
        const errorMsg = createElement('p', {
            textContent: 'Не удалось загрузить данные каны',
            style: 'color: #e53e3e; text-align: center;'
        });
        keyboard.appendChild(errorMsg);
        return;
    }
    
    const container = createElement('div', {
        className: 'compact-kana-grid'
    });
    
    // Создаем строки с символами
    data.forEach((row, rowIndex) => {
        const rowDiv = createElement('div', {
            className: 'kana-row'
        });
        
        // Добавляем номер строки
        const rowNumber = createElement('div', {
            className: 'row-number',
            textContent: rowIndex + 1
        });
        rowDiv.appendChild(rowNumber);
        
        // Добавляем символы
        row.forEach((symbol, colIndex) => {
            if (symbol && symbol.trim() !== '') {
                const key = createElement('button', {
                    className: 'kana-key compact-key',
                    textContent: symbol,
                    dataset: { symbol: symbol, row: rowIndex, col: colIndex },
                    title: getTranscriptionForSymbol(symbol, kanaType).ru || symbol
                });
                
                // Проверяем, выбран ли символ
                if (PROPISI_KANA_SETTINGS.selectedSymbols.includes(symbol)) {
                    key.classList.add('selected');
                }
                
                key.addEventListener('click', function() {
                    this.classList.toggle('selected');
                    
                    const symbol = this.dataset.symbol;
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
                    updatePropisiKana();
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
        
        container.appendChild(rowDiv);
    });
    
    keyboard.appendChild(container);
    
    // Выбираем первую строку по умолчанию, если ничего не выбрано
    if (PROPISI_KANA_SETTINGS.selectedSymbols.length === 0) {
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
    firstRow.forEach(symbol => {
        if (symbol && symbol.trim() !== '' && !PROPISI_KANA_SETTINGS.selectedSymbols.includes(symbol)) {
            PROPISI_KANA_SETTINGS.selectedSymbols.push(symbol);
        }
    });
    
    // Обновляем визуальное состояние клавиш
    setTimeout(() => {
        document.querySelectorAll('.kana-key.compact-key').forEach((key, index) => {
            if (index < firstRow.length) {
                key.classList.add('selected');
            }
        });
    }, 100);
}

/**
 * Основная функция настройки с компактным дизайном
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
        textContent: 'Строки:'
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
        textContent: 'Столбцы:'
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
    
    // Кнопка генерации
    const generateBtn = createElement('button', {
        id: 'propisi-kana-generate-btn',
        className: 'generate-btn',
        textContent: 'Сгенерировать прописи'
    });
    
    settingsContainer.appendChild(generateBtn);
    settings.appendChild(settingsContainer);
    
    // Устанавливаем начальные значения
    hintsCheckbox.checked = PROPISI_KANA_SETTINGS.showHints;
    sampleCheckbox.checked = PROPISI_KANA_SETTINGS.showSample;
    
    // Обработчики событий
    kanaSelect.addEventListener('change', function() {
        PROPISI_KANA_SETTINGS.selectedSymbols = [];
        PROPISI_KANA_SETTINGS.kanaType = this.value;
        
        if (document.querySelector('.kana-keyboard')) {
            createCompactHorizontalKeyboard();
        }
    });
    
    hintsCheckbox.addEventListener('change', function() {
        PROPISI_KANA_SETTINGS.showHints = this.checked;
        updatePropisiKana();
    });
    
    sampleCheckbox.addEventListener('change', function() {
        PROPISI_KANA_SETTINGS.showSample = this.checked;
        updatePropisiKana();
    });
    
    rowsSelect.addEventListener('change', function() {
        PROPISI_KANA_SETTINGS.rows = parseInt(this.value);
        updatePropisiKana();
    });
    
    columnsSelect.addEventListener('change', function() {
        PROPISI_KANA_SETTINGS.columns = parseInt(this.value);
        updatePropisiKana();
    });
    
    generateBtn.addEventListener('click', updatePropisiKana);
    
    // Первоначальная генерация
    setTimeout(() => {
        createSymbolSelectionSection();
        updatePropisiKana();
    }, 100);
}

/**
 * Секция выбора символов с компактным дизайном
 */
function createSymbolSelectionSection() {
    const content = document.querySelector('.content');
    clear_content(content);
    
    const selectionContainer = createElement('div', {
        className: 'symbol-selection compact-selection'
    });
    
    // Заголовок и кнопки управления
    const selectionHeader = createElement('div', {
        className: 'selection-header'
    });
    
    const selectionTitle = createElement('h4', {
        textContent: 'Выберите символы для прописей:'
    });
    
    const selectionControls = createElement('div', {
        className: 'selection-controls'
    });
    
    const selectAllBtn = createElement('button', {
        className: 'control-btn select-all',
        textContent: 'Выбрать все'
    });
    
    const deselectAllBtn = createElement('button', {
        className: 'control-btn deselect-all',
        textContent: 'Снять все'
    });
    
    const selectedCount = createElement('span', {
        className: 'selected-count',
        textContent: `Выбрано: ${PROPISI_KANA_SETTINGS.selectedSymbols.length}`
    });
    
    selectionControls.appendChild(selectAllBtn);
    selectionControls.appendChild(deselectAllBtn);
    selectionControls.appendChild(selectedCount);
    
    selectionHeader.appendChild(selectionTitle);
    selectionHeader.appendChild(selectionControls);
    selectionContainer.appendChild(selectionHeader);
    
    // Клавиатура каны
    const keyboardContainer = createElement('div', {
        className: 'kana-keyboard-container compact-keyboard'
    });
    
    const keyboard = createElement('div', {
        className: 'kana-keyboard',
        id: 'kana-keyboard'
    });
    
    keyboardContainer.appendChild(keyboard);
    selectionContainer.appendChild(keyboardContainer);
    
    content.appendChild(selectionContainer);
    
    // Обработчики кнопок
    selectAllBtn.addEventListener('click', function() {
        selectAllSymbols();
        updateSelectedCount();
        updatePropisiKana();
    });
    
    deselectAllBtn.addEventListener('click', function() {
        deselectAllSymbols();
        updateSelectedCount();
        updatePropisiKana();
    });
    
    // Генерируем клавиатуру
    createCompactHorizontalKeyboard();
}

/**
 * Генерация компактной таблицы для практики
 */
function generateCompactPracticeTable() {
    const tableContainer = document.getElementById('propisi-table-container');
    if (!tableContainer) return;
    
    clear_content(tableContainer);
    
    // Получаем текущие настройки
    const kanaType = PROPISI_KANA_SETTINGS.kanaType;
    const rows = PROPISI_KANA_SETTINGS.rows;
    const columns = PROPISI_KANA_SETTINGS.columns;
    const showHints = PROPISI_KANA_SETTINGS.showHints;
    const showSample = PROPISI_KANA_SETTINGS.showSample;
    
    // Проверяем, есть ли выбранные символы
    if (PROPISI_KANA_SETTINGS.selectedSymbols.length === 0) {
        const message = createElement('div', {
            className: 'no-symbols-message',
            textContent: 'Выберите хотя бы один символ на клавиатуре выше'
        });
        tableContainer.appendChild(message);
        return;
    }
    
    // Создаем таблицу
    const table = createElement('table', {
        className: 'compact-practice-table'
    });
    
    const tbody = createElement('tbody');
    
    // Получаем список символов для отображения
    const symbols = [...PROPISI_KANA_SETTINGS.selectedSymbols];
    let symbolIndex = 0;
    const totalSymbols = symbols.length;
    
    // Генерируем строки
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        const row = createElement('tr', {
            className: 'practice-row'
        });
        
        for (let colIndex = 0; colIndex < columns; colIndex++) {
            const cell = createElement('td', {
                className: 'practice-cell'
            });
            
            // Определяем тип ячейки
            const isHintCell = colIndex >= columns - 2;
            const isSampleCell = !isHintCell && showSample;
            
            if (isHintCell && showHints) {
                // Ячейки для подсказок
                if (rowIndex === 0) {
                    const svgPath = getSvgPathForSymbol(symbols[symbolIndex % totalSymbols], kanaType);
                    if (svgPath) {
                        const svgImg = createElement('img', {
                            src: svgPath,
                            alt: 'Подсказка',
                            className: 'hint-img'
                        });
                        cell.appendChild(svgImg);
                    }
                } else if (rowIndex === 1) {
                    const symbol = symbols[symbolIndex % totalSymbols];
                    const symbolDiv = createElement('div', {
                        className: 'hint-symbol',
                        textContent: symbol
                    });
                    cell.appendChild(symbolDiv);
                } else {
                    cell.classList.add('empty-practice-cell');
                }
                
                if (rowIndex < 2) {
                    symbolIndex++;
                }
            } else {
                // Обычные ячейки
                if (rowIndex === 0 && isSampleCell) {
                    const symbol = symbols[symbolIndex % totalSymbols];
                    const sampleDiv = createElement('div', {
                        className: 'sample-symbol',
                        textContent: symbol
                    });
                    cell.appendChild(sampleDiv);
                    symbolIndex++;
                } else if (rowIndex === 1 && isSampleCell) {
                    const symbol = symbols[(symbolIndex - 2) % totalSymbols];
                    const traceDiv = createElement('div', {
                        className: 'trace-symbol',
                        textContent: symbol
                    });
                    cell.appendChild(traceDiv);
                } else {
                    cell.classList.add('empty-practice-cell');
                    
                    // Добавляем направляющие линии
                    const guideHorizontal = createElement('div', {
                        className: 'guide-line horizontal'
                    });
                    const guideVertical = createElement('div', {
                        className: 'guide-line vertical'
                    });
                    cell.appendChild(guideHorizontal);
                    cell.appendChild(guideVertical);
                }
            }
            
            row.appendChild(cell);
        }
        
        tbody.appendChild(row);
    }
    
    table.appendChild(tbody);
    tableContainer.appendChild(table);
    
    // Добавляем инструкцию
    const instructions = createElement('div', {
        className: 'compact-instructions'
    });
    
    instructions.innerHTML = `
        <h5>Инструкция:</h5>
        <ul>
            <li><strong>1 строка</strong>: Образцы + SVG-подсказки</li>
            <li><strong>2 строка</strong>: Обводка + символы</li>
            <li><strong>Остальные</strong>: Практика письма</li>
        </ul>
    `;
    
    tableContainer.appendChild(instructions);
}

/**
 * Обновленная функция генерации прописей с компактным режимом
 */
function updatePropisiKana() {
    const practiceSection = document.querySelector('.propisi-practice-section');
    if (!practiceSection) {
        createPracticeSection();
    } else {
        generateCompactPracticeTable();
    }
}

/**
 * Создание секции для практики с компактным дизайном
 */
function createPracticeSection() {
    const content = document.querySelector('.content');
    const practiceSection = createElement('div', {
        className: 'propisi-practice-section compact-practice'
    });
    
    const infoPanel = createElement('div', {
        className: 'info-panel'
    });
    
    const infoTitle = createElement('h4', {
        textContent: 'Практика письма'
    });
    
    const infoText = createElement('p', {
        textContent: 'Используйте таблицу ниже для практики написания символов.'
    });
    
    infoPanel.appendChild(infoTitle);
    infoPanel.appendChild(infoText);
    practiceSection.appendChild(infoPanel);
    
    const tableContainer = createElement('div', {
        className: 'propisi-table-container',
        id: 'propisi-table-container'
    });
    
    practiceSection.appendChild(tableContainer);
    content.appendChild(practiceSection);
    
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
}