// Загрузка CSS для прописей
function loadPropisiCSS() {
    if (!document.querySelector('link[href*="propisi.css"]')) {
        const propisiCSS = document.createElement('link');
        propisiCSS.rel = 'stylesheet';
        propisiCSS.href = 'style/propisi.css';
        document.head.appendChild(propisiCSS);
    }
    
    if (!document.querySelector('link[href*="adaptive.css"]')) {
        const adaptiveCSS = document.createElement('link');
        adaptiveCSS.rel = 'stylesheet';
        adaptiveCSS.href = 'style/adaptive.css';
        document.head.appendChild(adaptiveCSS);
    }
}

function settings_propisi() {
    let settings = document.querySelector('.setting');
    clear_content(settings);
    
    // Загружаем CSS для прописей
    loadPropisiCSS();
    
    // Создаем компактный контейнер настроек
    const settingsContainer = document.createElement('div');
    settingsContainer.className = 'compact-settings';
    settings.appendChild(settingsContainer);
    
    // 1. Настройка количества строк (компактная)
    const rowsGroup = document.createElement('div');
    rowsGroup.className = 'compact-group';
    
    const rowsLabel = document.createElement('div');
    rowsLabel.className = 'compact-label';
    rowsLabel.innerHTML = 'Количество строк: <span class="compact-value">30</span>';
    
    const rowsSlider = document.createElement('input');
    rowsSlider.type = 'range';
    rowsSlider.className = 'compact-slider';
    rowsSlider.min = '10';
    rowsSlider.max = '100';
    rowsSlider.value = '30';
    rowsSlider.step = '5';
    
    rowsGroup.appendChild(rowsLabel);
    rowsGroup.appendChild(rowsSlider);
    settingsContainer.appendChild(rowsGroup);
    
    // 2. Настройка пар в строке (компактная)
    const pairsGroup = document.createElement('div');
    pairsGroup.className = 'compact-group';
    
    const pairsLabel = document.createElement('label');
    pairsLabel.className = 'compact-label';
    pairsLabel.textContent = 'Пар в строке:';
    
    const pairsSelect = document.createElement('select');
    pairsSelect.className = 'compact-select';
    
    const pairOptions = [2, 3, 4, 5, 6, 7, 8];
    pairOptions.forEach(pair => {
        const option = document.createElement('option');
        option.value = pair;
        option.textContent = pair;
        if (pair === 5) option.selected = true;
        pairsSelect.appendChild(option);
    });
    
    pairsGroup.appendChild(pairsLabel);
    pairsGroup.appendChild(pairsSelect);
    settingsContainer.appendChild(pairsGroup);
    
    // 3. Выбор типа каны (компактная)
    const kanaGroup = document.createElement('div');
    kanaGroup.className = 'compact-group';
    
    const kanaLabel = document.createElement('label');
    kanaLabel.className = 'compact-label';
    kanaLabel.textContent = 'Тип каны:';
    
    const kanaSelect = document.createElement('select');
    kanaSelect.className = 'compact-select';
    
    const kanaTypes = [
        {value: 'hiragana+katakana', label: 'Хирагана+Катакана'},
        {value: 'hiragana', label: 'Хирагана'},
        {value: 'katakana', label: 'Катакана'},
        {value: 'romandzi', label: 'Романдзи'},
        {value: 'gibrid', label: 'Гибрид'}
    ];
    
    kanaTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.value;
        option.textContent = type.label;
        kanaSelect.appendChild(option);
    });
    
    kanaGroup.appendChild(kanaLabel);
    kanaGroup.appendChild(kanaSelect);
    settingsContainer.appendChild(kanaGroup);
    
    // 4. Настройка категорий (компактная)
    const categoriesGroup = document.createElement('div');
    categoriesGroup.className = 'compact-group compact-categories';
    
    const categoriesLabel = document.createElement('label');
    categoriesLabel.className = 'compact-label';
    categoriesLabel.textContent = 'Категории:';
    categoriesGroup.appendChild(categoriesLabel);
    
    const categories = [
        {id: 'basic', label: 'Базовая'},
        {id: 'extended', label: 'Расширенная', default: true},
        {id: 'full', label: 'Полная'}
    ];
    
    categories.forEach(cat => {
        const radioWrapper = document.createElement('div');
        radioWrapper.className = 'compact-radio';
        
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'category';
        radioInput.value = cat.id;
        radioInput.id = `cat-${cat.id}`;
        if (cat.default) radioInput.checked = true;
        
        const radioLabel = document.createElement('label');
        radioLabel.htmlFor = `cat-${cat.id}`;
        radioLabel.className = 'compact-radio-label';
        radioLabel.textContent = cat.label;
        
        radioWrapper.appendChild(radioInput);
        radioWrapper.appendChild(radioLabel);
        categoriesGroup.appendChild(radioWrapper);
    });
    
    settingsContainer.appendChild(categoriesGroup);
    
    // 5. Кнопка генерации (компактная)
    const generateBtn = document.createElement('button');
    generateBtn.className = 'compact-generate-btn';
    generateBtn.textContent = 'Сгенерировать прописи';
    settingsContainer.appendChild(generateBtn);
    
    // Обработчики событий
    rowsSlider.addEventListener('input', function() {
        rowsLabel.querySelector('.compact-value').textContent = this.value;
    });
    
    generateBtn.addEventListener('click', () => {
        updatePropisi();
    });
    
    // Начальная генерация
    setTimeout(updatePropisi, 100);
}

function updatePropisi() {
    const rows = document.querySelector('.compact-slider')?.value || 30;
    const pairs = document.querySelector('.compact-select')?.value || 5;
    const kanaType = document.querySelectorAll('.compact-select')[1]?.value || 'hiragana+katakana';
    const category = document.querySelector('input[name="category"]:checked')?.value || 'extended';
    
    const content = document.querySelector('.content');
    clear_content(content);
    
    const propisiContainer = document.createElement('div');
    propisiContainer.className = 'propisi-container';
    content.appendChild(propisiContainer);
    
    // Заголовок с информацией
    const infoHeader = document.createElement('div');
    infoHeader.className = 'propisi-info';
    
    const title = document.createElement('h2');
    title.className = 'propisi-title';
    title.textContent = getKanaTitle(kanaType);
    infoHeader.appendChild(title);
    
    const info = document.createElement('div');
    info.className = 'propisi-meta';
    
    const rowsInfo = document.createElement('span');
    rowsInfo.className = 'meta-item';
    rowsInfo.textContent = `${rows} строк`;
    
    const pairsInfo = document.createElement('span');
    pairsInfo.className = 'meta-item';
    pairsInfo.textContent = `${pairs} пар`;
    
    const categoryInfo = document.createElement('span');
    categoryInfo.className = 'meta-item';
    categoryInfo.textContent = getCategoryName(category);
    
    info.appendChild(rowsInfo);
    info.appendChild(pairsInfo);
    info.appendChild(categoryInfo);
    infoHeader.appendChild(info);
    
    propisiContainer.appendChild(infoHeader);
    
    // Получаем символы для генерации
    const symbols = getSymbolsForGeneration(kanaType, category);
    
    // Создаем таблицу
    const table = document.createElement('table');
    table.className = 'propisi-table';
    
    // Создаем заголовок таблицы
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    for (let i = 0; i < pairs; i++) {
        const kanaTh = document.createElement('th');
        kanaTh.textContent = 'Кана';
        kanaTh.className = 'table-header';
        
        const practiceTh = document.createElement('th');
        practiceTh.textContent = 'Пропись';
        practiceTh.className = 'table-header practice-header';
        
        headerRow.appendChild(kanaTh);
        headerRow.appendChild(practiceTh);
    }
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Создаем тело таблицы
    const tbody = document.createElement('tbody');
    
    let symbolIndex = 0;
    const totalSymbols = symbols.length;
    
    for (let row = 0; row < rows; row++) {
        const tableRow = document.createElement('tr');
        tableRow.className = 'propisi-row';
        
        for (let pair = 0; pair < pairs; pair++) {
            if (symbolIndex >= totalSymbols) {
                symbolIndex = 0;
            }
            
            const currentSymbol = symbols[symbolIndex];
            symbolIndex++;
            
            // Ячейка с символом
            const kanaCell = document.createElement('td');
            kanaCell.className = 'kana-cell';
            
            const symbolDiv = document.createElement('div');
            symbolDiv.className = 'kana-symbol';
            symbolDiv.textContent = currentSymbol;
            kanaCell.appendChild(symbolDiv);
            
            // Ячейка для прописей
            const practiceCell = document.createElement('td');
            practiceCell.className = 'practice-cell';
            
            // Добавляем линии для прописей
            for (let line = 0; line < 3; line++) {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'practice-line';
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
    
    // Определяем какие категории включать
    const categoriesToInclude = getCategoriesToInclude(category);
    
    // Получаем символы в зависимости от типа каны
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
    
    // Перемешиваем символы
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
            return ['main'];
        case 'full':
            return ['main', 'expand', 'iotated', 'for_forgein'];
        case 'extended':
        default:
            return ['main', 'expand'];
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

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function generator_propisi() {
    settings_propisi();
}

function clear_content(element) {
    if (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}