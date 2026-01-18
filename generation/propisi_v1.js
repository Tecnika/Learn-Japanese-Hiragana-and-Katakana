function settings_propisi() {
    let settings = document.querySelector('.setting');
    clear_content(settings);
    
    // Создаем контейнер настроек
    const settingsContainer = document.createElement('div');
    settingsContainer.className = 'propisi-settings';
    settings.appendChild(settingsContainer);
    
    // 1. Настройка количества строк
    const rowsGroup = document.createElement('div');
    rowsGroup.className = 'settings-group';
    
    const rowsLabel = document.createElement('label');
    rowsLabel.className = 'settings-label';
    rowsLabel.textContent = 'Количество строк:';
    rowsGroup.appendChild(rowsLabel);
    
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'slider-container';
    
    const rowsSlider = document.createElement('input');
    rowsSlider.type = 'range';
    rowsSlider.className = 'settings-slider';
    rowsSlider.min = '10';
    rowsSlider.max = '100';
    rowsSlider.value = '30';
    rowsSlider.step = '1';
    sliderContainer.appendChild(rowsSlider);
    
    const rowsValue = document.createElement('span');
    rowsValue.className = 'settings-value';
    rowsValue.textContent = '30';
    sliderContainer.appendChild(rowsValue);
    
    rowsGroup.appendChild(sliderContainer);
    settingsContainer.appendChild(rowsGroup);
    
    // 2. Настройка пар в строке
    const pairsGroup = document.createElement('div');
    pairsGroup.className = 'settings-group';
    
    const pairsLabel = document.createElement('label');
    pairsLabel.className = 'settings-label';
    pairsLabel.textContent = 'Пар в строке:';
    pairsGroup.appendChild(pairsLabel);
    
    const pairsSelect = document.createElement('select');
    pairsSelect.className = 'settings-select pairs-select';
    
    const pairOptions = [2, 3, 4, 5, 6, 7, 8];
    pairOptions.forEach(pair => {
        const option = document.createElement('option');
        option.value = pair;
        option.textContent = pair;
        if (pair === 5) option.selected = true;
        pairsSelect.appendChild(option);
    });
    
    pairsGroup.appendChild(pairsSelect);
    settingsContainer.appendChild(pairsGroup);
    
    // 3. Выбор типа каны
    const kanaGroup = document.createElement('div');
    kanaGroup.className = 'settings-group';
    
    const kanaLabel = document.createElement('label');
    kanaLabel.className = 'settings-label';
    kanaLabel.textContent = 'Тип каны:';
    kanaGroup.appendChild(kanaLabel);
    
    const kanaSelect = document.createElement('select');
    kanaSelect.className = 'settings-select kana-select';
    
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
    
    kanaGroup.appendChild(kanaSelect);
    settingsContainer.appendChild(kanaGroup);
    
    // 4. Настройка категорий
    const categoriesGroup = document.createElement('div');
    categoriesGroup.className = 'settings-group categories-group';
    
    const categoriesLabel = document.createElement('label');
    categoriesLabel.className = 'settings-label';
    categoriesLabel.textContent = 'Категории символов:';
    categoriesGroup.appendChild(categoriesLabel);
    
    const categoriesContainer = document.createElement('div');
    categoriesContainer.className = 'categories-container';
    
    const categories = [
        {id: 'basic', label: 'Базовая', description: 'Только основные символы'},
        {id: 'extended', label: 'Расширенная', description: 'Основные + дополненные', default: true},
        {id: 'full', label: 'Полная', description: 'Все символы'}
    ];
    
    categories.forEach(cat => {
        const categoryWrapper = document.createElement('div');
        categoryWrapper.className = 'category-option';
        
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'category';
        radioInput.value = cat.id;
        radioInput.id = `cat-${cat.id}`;
        if (cat.default) radioInput.checked = true;
        
        const radioLabel = document.createElement('label');
        radioLabel.htmlFor = `cat-${cat.id}`;
        radioLabel.className = 'category-label';
        
        const radioSpan = document.createElement('span');
        radioSpan.className = 'radio-custom';
        
        const labelText = document.createElement('span');
        labelText.className = 'label-text';
        labelText.textContent = cat.label;
        
        const description = document.createElement('span');
        description.className = 'category-description';
        description.textContent = cat.description;
        
        radioLabel.appendChild(radioSpan);
        radioLabel.appendChild(labelText);
        radioLabel.appendChild(description);
        
        categoryWrapper.appendChild(radioInput);
        categoryWrapper.appendChild(radioLabel);
        categoriesContainer.appendChild(categoryWrapper);
    });
    
    categoriesGroup.appendChild(categoriesContainer);
    settingsContainer.appendChild(categoriesGroup);
    
    // 5. Кнопка генерации
    const generateBtn = document.createElement('button');
    generateBtn.className = 'generate-btn';
    generateBtn.textContent = 'Сгенерировать прописи';
    settingsContainer.appendChild(generateBtn);
    
    // Обработчики событий
    rowsSlider.addEventListener('input', function() {
        rowsValue.textContent = this.value;
        updatePropisi();
    });
    
    pairsSelect.addEventListener('change', updatePropisi);
    kanaSelect.addEventListener('change', updatePropisi);
    
    categoriesContainer.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.addEventListener('change', updatePropisi);
    });
    
    generateBtn.addEventListener('click', updatePropisi);
    
    // Начальная генерация
    setTimeout(updatePropisi, 100);
}

function updatePropisi() {
    const rows = document.querySelector('.settings-slider').value;
    const pairs = document.querySelector('.pairs-select').value;
    const kanaType = document.querySelector('.kana-select').value;
    const category = document.querySelector('input[name="category"]:checked').value;
    
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