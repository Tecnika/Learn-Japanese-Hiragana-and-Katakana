// generation/404-kana.js
// Автогенерация 5 flip-карточек с символами каны для страницы 404

let currentSymbols = [];

function generateRandomKana() {
    console.log('Генерация случайных символов каны...');
    
    try {
        if (typeof hiragana === 'undefined' || typeof katakana === 'undefined' ||
            typeof Kana_ru === 'undefined' || typeof Kana_en === 'undefined') {
            document.getElementById('random-kana-grid').innerHTML = 
                '<div class="error-message-box">Данные каны не загружены</div>';
            return;
        }
        
        const allSymbols = [];
        collectSymbols(hiragana, 'hiragana', allSymbols);
        collectSymbols(katakana, 'katakana', allSymbols);
        
        if (allSymbols.length === 0) {
            document.getElementById('random-kana-grid').innerHTML = 
                '<div class="error-message-box">Нет доступных символов</div>';
            return;
        }
        
        currentSymbols = selectRandomSymbols(allSymbols, 5);
        displayKanaCards(currentSymbols);
        
    } catch (error) {
        document.getElementById('random-kana-grid').innerHTML = 
            '<div class="error-message-box">Ошибка загрузки</div>';
    }
}

function collectSymbols(kanaData, type, allSymbols) {
    ['main', 'expand'].forEach(category => {
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

function selectRandomSymbols(allSymbols, count) {
    const selected = [];
    const usedIndices = new Set();
    
    while (selected.length < count && selected.length < allSymbols.length) {
        const randomIndex = Math.floor(Math.random() * allSymbols.length);
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            selected.push(allSymbols[randomIndex]);
        }
    }
    
    return selected;
}

// ИСПРАВЛЕННАЯ ФУНКЦИЯ - ГЛАВНОЕ ИЗМЕНЕНИЕ
function displayKanaCards(symbols) {
    const grid = document.getElementById('random-kana-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    symbols.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = `kana-card ${symbol.type}`;
        card.dataset.index = index;
        
        // Лицевая сторона
        const front = document.createElement('div');
        front.className = 'card-front';
        const symbolElement = document.createElement('div');
        symbolElement.className = 'kana-symbol';
        symbolElement.textContent = symbol.char;
        front.appendChild(symbolElement);
        
        // Обратная сторона
        const back = document.createElement('div');
        back.className = 'card-back';
        
        const ruTranscription = document.createElement('div');
        ruTranscription.className = 'transcription ru';
        ruTranscription.textContent = symbol.ru;
        
        const enTranscription = document.createElement('div');
        enTranscription.className = 'transcription en';
        enTranscription.textContent = symbol.en;
        
        back.appendChild(ruTranscription);
        back.appendChild(enTranscription);
        
        card.appendChild(front);
        card.appendChild(back);
        
        // ПРОСТОЙ И РАБОЧИЙ ОБРАБОТЧИК КЛИКА
        card.addEventListener('click', function() {
            console.log('Клик по карточке', index, symbol.char); // Для отладки
            this.classList.toggle('flipped');
        });
        
        grid.appendChild(card);
    });
}

// Убираем все карточки в исходное состояние
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
    
    // Закрываем карточки при клике вне их
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.kana-card')) {
            flipAllCardsBack();
        }
    });
});

window.generateRandomKana = generateRandomKana;
window.flipAllCardsBack = flipAllCardsBack;

