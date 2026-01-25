// propisi_for_memoring.js - логика прописей для запоминания
// Использует константы из const.js и функции из function.js

function settings_propisi_m() {
    let settings = document.querySelector('.setting');
    clear_content(settings);
    
    const settingsContainer = createElement('div', {
        className: 'compact-settings'
    });
    
    const headerRow = createElement('div', {
        style: 'grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;'
    });
    
    const title = createElement('h3', {
        textContent: 'Настройки прописей',
        style: 'margin: 0; font-size: 16px; color: #2d3748;'
    });
    
    const quickActions = createElement('div', {
        style: 'display: flex; gap: 8px;'
    });
    
    const pairButtons = [2, 4, 6, 8];
    pairButtons.forEach(pairs => {
        const quickBtn = createElement('button', {
            type: 'button',
            textContent: `${pairs} пар`,
            dataset: { pairs: pairs },
            style: 'padding: 6px 10px; font-size: 13px; border: 1px solid #cbd5e0; border-radius: 6px; background: white; color: #4a5568; cursor: pointer; transition: all 0.2s;'
        });
        quickActions.appendChild(quickBtn);
    });
    
    headerRow.appendChild(title);
    headerRow.appendChild(quickActions);
    settingsContainer.appendChild(headerRow);
    
    const gridSettings = createElement('div', {
        style: 'grid-column: 1 / -1; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px;'
    });
    
    // Количество строк
    const rowsGroup = createElement('div', {
        className: 'compact-group',
        style: 'margin: 0;'
    });
    
    const rowsLabel = createElement('div', {
        className: 'compact-label',
        innerHTML: 'Строки: <span class="compact-value">30</span>'
    });
    
    const rowsSlider = createElement('input', {
        type: 'range',
        className: 'compact-slider',
        min: '10',
        max: '100',
        value: '30',
        step: '5'
    });
    
    rowsGroup.appendChild(rowsLabel);
    rowsGroup.appendChild(rowsSlider);
    
    // Пары в строке
    const pairsGroup = createElement('div', {
        className: 'compact-group',
        style: 'margin: 0;'
    });
    
    const pairsLabel = createElement('label', {
        className: 'compact-label',
        textContent: 'Пар в строке:',
        style: 'display: block; margin-bottom: 8px;'
    });
    
    const pairsSelect = createElement('select', {
        className: 'compact-select',
        style: 'width: 100%;'
    });
    
    const pairOptions = [2, 3, 4, 5, 6, 7, 8];
    pairOptions.forEach(pair => {
        const option = createElement('option', {
            value: pair,
            textContent: pair,
            selected: pair === 5
        });
        pairsSelect.appendChild(option);
    });
    
    pairsGroup.appendChild(pairsLabel);
    pairsGroup.appendChild(pairsSelect);
    
    // Тип каны
    const kanaGroup = createElement('div', {
        className: 'compact-group',
        style: 'margin: 0;'
    });
    
    const kanaLabel = createElement('label', {
        className: 'compact-label',
        textContent: 'Тип каны:',
        style: 'display: block; margin-bottom: 8px;'
    });
    
    const kanaSelect = createElement('select', {
        className: 'compact-select',
        style: 'width: 100%;'
    });
    
    const kanaTypes = [
        {value: 'hiragana+katakana', label: 'Хирагана+Катакана'},
        {value: 'hiragana', label: 'Хирагана'},
        {value: 'katakana', label: 'Катакана'},
        {value: 'romandzi', label: 'Романдзи'},
        {value: 'gibrid', label: 'Гибрид'}
    ];
    
    kanaTypes.forEach(type => {
        const option = createElement('option', {
            value: type.value,
            textContent: type.label
        });
        kanaSelect.appendChild(option);
    });
    
    kanaGroup.appendChild(kanaLabel);
    kanaGroup.appendChild(kanaSelect);
    
    // Категории
    const categoriesGroup = createElement('div', {
        className: 'compact-group compact-categories',
        style: 'margin: 0; grid-column: span 2;'
    });
    
    const categoriesLabel = createElement('label', {
        className: 'compact-label',
        textContent: 'Категории:',
        style: 'display: block; margin-bottom: 8px;'
    });
    
    const categoriesRadioGroup = createElement('div', {
        style: 'display: flex; gap: 15px; flex-wrap: wrap;'
    });
    
    const categories = [
        {id: 'basic', label: 'Базовая'},
        {id: 'extended', label: 'Расширенная', default: true},
        {id: 'full', label: 'Полная'}
    ];
    
    categories.forEach(cat => {
        const radioContainer = createElement('div', {
            style: 'display: flex; align-items: center; gap: 6px;'
        });
        
        const radioInput = createElement('input', {
            type: 'radio',
            name: 'category',
            value: cat.id,
            id: `cat-${cat.id}`,
            checked: cat.default
        });
        
        const radioLabel = createElement('label', {
            htmlFor: `cat-${cat.id}`,
            textContent: cat.label,
            style: 'font-size: 14px; color: #4a5568; cursor: pointer;'
        });
        
        radioContainer.appendChild(radioInput);
        radioContainer.appendChild(radioLabel);
        categoriesRadioGroup.appendChild(radioContainer);
    });
    
    categoriesGroup.appendChild(categoriesRadioGroup);
    
    gridSettings.appendChild(rowsGroup);
    gridSettings.appendChild(pairsGroup);
    gridSettings.appendChild(kanaGroup);
    gridSettings.appendChild(categoriesGroup);
    settingsContainer.appendChild(gridSettings);
    
    const generateBtn = createElement('button', {
        className: 'compact-generate-btn',
        textContent: 'Сгенерировать прописи',
        style: 'grid-column: 1 / -1; margin-top: 15px;'
    });
    settingsContainer.appendChild(generateBtn);
    
    settings.appendChild(settingsContainer);
    
    // Обработчики
    rowsSlider.addEventListener('input', function() {
        rowsLabel.querySelector('.compact-value').textContent = this.value;
    });
    
    quickActions.querySelectorAll('button[data-pairs]').forEach(btn => {
        btn.addEventListener('click', function() {
            pairsSelect.value = this.dataset.pairs;
            updatePropisi();
        });
    });
    
    const updatePropisi = () => {
        const rows = rowsSlider.value;
        const pairs = pairsSelect.value;
        const kanaType = kanaSelect.value;
        const category = document.querySelector('input[name="category"]:checked').value;
        
        generatePropisiContent(rows, pairs, kanaType, category);
    };
    
    pairsSelect.addEventListener('change', updatePropisi);
    kanaSelect.addEventListener('change', updatePropisi);
    categoriesRadioGroup.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.addEventListener('change', updatePropisi);
    });
    generateBtn.addEventListener('click', updatePropisi);
    rowsSlider.addEventListener('change', updatePropisi);
    
    setTimeout(updatePropisi, 100);
}

function generatePropisiContent(rows, pairs, kanaType, category) {
    const content = document.querySelector('.content');
    clear_content(content);
    
    const propisiContainer = createElement('div', {
        className: 'propisi-container'
    });
    content.appendChild(propisiContainer);
    
    const infoHeader = createElement('div', {
        className: 'propisi-info'
    });
    
    const title = createElement('h2', {
        className: 'propisi-title',
        textContent: getKanaTitle(kanaType)
    });
    infoHeader.appendChild(title);
    
    const info = createElement('div', {
        className: 'propisi-meta'
    });
    
    const rowsInfo = createElement('span', {
        className: 'meta-item',
        textContent: `${rows} строк`
    });
    
    const pairsInfo = createElement('span', {
        className: 'meta-item',
        textContent: `${pairs} пар`
    });
    
    const categoryInfo = createElement('span', {
        className: 'meta-item',
        textContent: getCategoryName(category)
    });
    
    info.appendChild(rowsInfo);
    info.appendChild(pairsInfo);
    info.appendChild(categoryInfo);
    infoHeader.appendChild(info);
    
    propisiContainer.appendChild(infoHeader);
    
    const symbols = getSymbolsForGeneration(kanaType, category);
    
    const table = createElement('table', {
        className: 'propisi-table'
    });
    
    const thead = createElement('thead');
    const headerRow = createElement('tr');
    
    for (let i = 0; i < pairs; i++) {
        const kanaTh = createElement('th', {
            textContent: 'Кана',
            className: 'table-header'
        });
        
        const practiceTh = createElement('th', {
            textContent: 'Ввод',
            className: 'table-header practice-header'
        });
        
        headerRow.appendChild(kanaTh);
        headerRow.appendChild(practiceTh);
    }
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    const tbody = createElement('tbody');
    
    let symbolIndex = 0;
    const totalSymbols = symbols.length;
    
    for (let row = 0; row < rows; row++) {
        const tableRow = createElement('tr', {
            className: 'propisi-row'
        });
        
        for (let pair = 0; pair < pairs; pair++) {
            if (symbolIndex >= totalSymbols) {
                symbolIndex = 0;
            }
            
            const currentSymbol = symbols[symbolIndex];
            symbolIndex++;
            
            const kanaCell = createElement('td', {
                className: 'kana-cell'
            });
            
            const symbolDiv = createElement('div', {
                className: 'kana-symbol',
                textContent: currentSymbol
            });
            kanaCell.appendChild(symbolDiv);
            
            const practiceCell = createElement('td', {
                className: 'practice-cell'
            });
            
            for (let line = 0; line < 3; line++) {
                const lineDiv = createElement('div', {
                    className: 'practice-line'
                });
                practiceCell.appendChild(lineDiv);
            }
            
            tableRow.appendChild(kanaCell);
            tableRow.appendChild(practiceCell);
        }
        
        tbody.appendChild(tableRow);
    }
    
    table.appendChild(tbody);
    propisiContainer.appendChild(table);
}

function getSymbolsForGeneration(kanaType, category) {
    let symbols = [];
    const categoriesToInclude = getCategoriesToInclude(category);
    
    switch(kanaType) {
        case 'hiragana':
            symbols = getSymbolsFromData(hiragana, categoriesToInclude);
            break;
        case 'katakana':
            symbols = getSymbolsFromData(katakana, categoriesToInclude);
            break;
        case 'romandzi':
            symbols = getSymbolsFromData(Kana_en, categoriesToInclude);
            break;
        case 'gibrid':
            const hiraSymbols = getSymbolsFromData(hiragana, categoriesToInclude);
            const kataSymbols = getSymbolsFromData(katakana, categoriesToInclude);
            const romaSymbols = getSymbolsFromData(Kana_en, categoriesToInclude);
            symbols = [...hiraSymbols, ...kataSymbols, ...romaSymbols];
            break;
        case 'hiragana+katakana':
        default:
            const hiraMixed = getSymbolsFromData(hiragana, categoriesToInclude);
            const kataMixed = getSymbolsFromData(katakana, categoriesToInclude);
            symbols = [...hiraMixed, ...kataMixed];
            break;
    }
    
    return shuffleArray(symbols);
}

function getSymbolsFromData(data, categories) {
    const symbols = [];
    
    for (let category in data) {
        if (categories.includes(category)) {
            const rows = data[category];
            
            for (let row of rows) {
                for (let symbol of row) {
                    if (symbol && symbol.trim() !== '') {
                        symbols.push(symbol);
                    }
                }
            }
        }
    }
    
    return symbols;
}

function getCategoriesToInclude(categoryType) {
    switch(categoryType) {
        case 'basic':
            return [KANA_CATEGORIES.MAIN];
        case 'full':
            return [KANA_CATEGORIES.MAIN, KANA_CATEGORIES.EXPAND, KANA_CATEGORIES.IOTATED, KANA_CATEGORIES.FOREIGN];
        case 'extended':
        default:
            return [KANA_CATEGORIES.MAIN, KANA_CATEGORIES.EXPAND];
    }
}

function getKanaTitle(kanaType) {
    const titles = {
        'hiragana+katakana': 'Хирагана + Катакана',
        'hiragana': 'Хирагана',
        'katakana': 'Катакана',
        'romandzi': 'Ромадзи',
        'gibrid': 'Гибридные прописи'
    };
    return titles[kanaType] || 'Прописи японской каны';
}

function getCategoryName(category) {
    const names = {
        'basic': 'Базовая',
        'extended': 'Расширенная',
        'full': 'Полная'
    };
    return names[category] || 'Расширенная';
}

function generator_propisi_m() {
    settings_propisi_m();
}

// Экспорт функций
if (typeof window !== 'undefined') {
    window.settings_propisi_m = settings_propisi_m;
    window.generator_propisi_m = generator_propisi_m;
    window.generatePropisiContent = generatePropisiContent;
}