// generation/404-kana.js
// Использует константы из const.js и функции из function.js

let currentSymbols = [];

function generateRandomKana() {
    console.log('Генерация случайных символов каны...');
    
    try {
        // Проверяем наличие данных каны
        if (typeof hiragana === 'undefined' || typeof katakana === 'undefined') {
            showErrorMessage('Данные каны не загружены');
            return;
        }
        
        const allSymbols = [];
        collectSymbols(hiragana, KANA_TYPES.HIRAGANA, allSymbols);
        collectSymbols(katakana, KANA_TYPES.KATAKANA, allSymbols);
        
        if (allSymbols.length === 0) {
            showErrorMessage('Нет доступных символов');
            return;
        }
        
        currentSymbols = getRandomElements(allSymbols, 5);
        displayKanaCards(currentSymbols);
        
    } catch (error) {
        console.error('Ошибка генерации:', error);
        showErrorMessage('Ошибка загрузки');
    }
}

function collectSymbols(kanaData, type, allSymbols) {
    [KANA_CATEGORIES.MAIN, KANA_CATEGORIES.EXPAND].forEach(category => {
        if (kanaData[category]) {
            kanaData[category].forEach((row, rowIndex) => {
                row.forEach((symbol, colIndex) => {
                    if (symbol && symbol.trim() !== '') {
                        const ru = getTranscription(type, category, rowIndex, colIndex, 'ru') || '—';
                        const en = getTranscription(type, category, rowIndex, colIndex, 'en') || '—';
                        
                        allSymbols.push({
                            char: symbol,
                            type: type,
                            ru: ru,
                            en: en
                        });
                    }
                });
            });
        }
    });
}

function getTranscription(type, category, rowIndex, colIndex, lang) {
    try {
        const langData = lang === 'ru' ? Kana_ru : Kana_en;
        if (!langData[category] || !langData[category][rowIndex]) return null;
        return langData[category][rowIndex][colIndex]?.trim() || null;
    } catch (error) {
        return null;
    }
}

function displayKanaCards(symbols) {
    const grid = document.getElementById('random-kana-grid');
    if (!grid) return;
    
    clear_content(grid);
    
    symbols.forEach((symbol, index) => {
        const card = createElement('div', {
            className: `kana-card ${symbol.type}`,
            dataset: { index: index }
        });
        
        const front = createElement('div', {
            className: 'card-front'
        });
        
        const symbolElement = createElement('div', {
            className: 'kana-symbol',
            textContent: symbol.char
        });
        front.appendChild(symbolElement);
        
        const back = createElement('div', {
            className: 'card-back'
        });
        
        const ruTranscription = createElement('div', {
            className: 'transcription ru',
            textContent: symbol.ru
        });
        
        const enTranscription = createElement('div', {
            className: 'transcription en',
            textContent: symbol.en
        });
        
        back.appendChild(ruTranscription);
        back.appendChild(enTranscription);
        
        card.appendChild(front);
        card.appendChild(back);
        
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        grid.appendChild(card);
    });
}

function showErrorMessage(message) {
    const grid = document.getElementById('random-kana-grid');
    if (!grid) return;
    
    grid.innerHTML = `<div class="error-message-box">${message}</div>`;
}

function flipAllCardsBack() {
    document.querySelectorAll('.kana-card').forEach(card => {
        card.classList.remove('flipped');
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (document.getElementById('random-kana-grid')) {
            generateRandomKana();
        }
    }, 100);
});

// Экспорт функций
if (typeof window !== 'undefined') {
    window.generateRandomKana = generateRandomKana;
    window.flipAllCardsBack = flipAllCardsBack;
}