// ================================
// ФУНКЦИИ.JS - УНИВЕРСАЛЬНЫЕ ФУНКЦИИ ПРОЕКТА
// ================================

/**
 * Универсальная функция очистки содержимого элемента
 * @param {HTMLElement} element - DOM элемент для очистки
 * @returns {boolean} - Успешно ли выполнена очистка
 */
function clear_content(element) {
    if (!element || !(element instanceof HTMLElement)) {
        console.warn('clear_content: передан неверный элемент');
        return false;
    }
    
    try {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        return true;
    } catch (error) {
        console.error('Ошибка очистки контента:', error);
        return false;
    }
}

/**
 * Транслитерация русского текста в латиницу
 * @param {string} text - Текст для транслитерации
 * @returns {string} - Транслитерированный текст
 */
function transliterate(text) {
    if (typeof text !== 'string') return '';
    
    const translitMap = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
        'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
        'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch',
        'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '',
        'э': 'e', 'ю': 'yu', 'я': 'ya',
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
        'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
        'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
        'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
        'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch',
        'Ш': 'Sh', 'Щ': 'Shch', 'Ъ': '', 'Ы': 'Y', 'Ь': '',
        'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
    };
    
    return text.split('').map(char => {
        return translitMap[char] || char;
    }).join('');
}

/**
 * Изменение регистра строки
 * @param {string} str - Исходная строка
 * @param {string} mode - Режим: 'upper', 'lower', 'title', 'sentence'
 * @returns {string} - Строка в нужном регистре
 */
function changeCase(str, mode = 'lower') {
    if (typeof str !== 'string') return '';
    
    switch(mode.toLowerCase()) {
        case 'upper':
            return str.toUpperCase();
        case 'lower':
            return str.toLowerCase();
        case 'title':
            return str.replace(/\b\w/g, char => char.toUpperCase());
        case 'sentence':
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        default:
            return str;
    }
}

/**
 * Получение текста интерфейса на нужном языке
 * @param {string} key - Ключ текста
 * @param {string} lang - Язык ('ru' или 'en')
 * @returns {string} - Текст на нужном языке
 */
function getUIText(key, lang = 'ru') {
    const texts = UI_TEXTS[lang] || UI_TEXTS.ru;
    return texts[key] || key;
}

/**
 * Создание DOM элемента с заданными свойствами
 * @param {string} tag - Тег элемента
 * @param {Object} props - Свойства элемента
 * @param {string|HTMLElement|Array} content - Содержимое элемента
 * @returns {HTMLElement} - Созданный элемент
 */
function createElement(tag, props = {}, content = '') {
    const element = document.createElement(tag);
    
    // Устанавливаем свойства
    Object.keys(props).forEach(key => {
        if (key === 'className') {
            element.className = props[key];
        } else if (key === 'style' && typeof props[key] === 'object') {
            Object.assign(element.style, props[key]);
        } else if (key === 'dataset' && typeof props[key] === 'object') {
            Object.assign(element.dataset, props[key]);
        } else if (key.startsWith('data-')) {
            element.setAttribute(key, props[key]);
        } else if (key === 'htmlFor') {
            element.htmlFor = props[key];
        } else if (key === 'textContent' || key === 'innerHTML') {
            // Обработаем отдельно после добавления контента
        } else {
            element[key] = props[key];
        }
    });
    
    // Добавляем содержимое
    if (typeof content === 'string') {
        if (props.innerHTML) {
            element.innerHTML = props.innerHTML;
        } else {
            element.textContent = content;
        }
    } else if (content instanceof HTMLElement) {
        element.appendChild(content);
    } else if (Array.isArray(content)) {
        content.forEach(child => {
            if (child instanceof HTMLElement) {
                element.appendChild(child);
            } else if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            }
        });
    }
    
    // Переопределяем textContent если указан в props
    if (props.textContent) {
        element.textContent = props.textContent;
    }
    
    return element;
}

/**
 * Загрузка всех стилей для приложения
 */
function loadAllStyles() {
    console.log('Загрузка всех стилей...');
    
    DEFAULT_STYLES.forEach(style => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${PATHS.style}${style}`;
        
        link.onerror = function() {
            console.error('❌ Не удалось загрузить стиль:', this.href);
        };
        
        link.onload = function() {
            console.log('✅ Стиль загружен:', this.href);
        };
        
        document.head.appendChild(link);
    });
}

/**
 * Добавление скриптов в документ
 * @param {Array} scriptNames - Массив имен скриптов
 * @param {string} basePath - Базовый путь
 */
function addScripts(scriptNames, basePath = PATHS.js.generation) {
    scriptNames.forEach(scriptName => {
        const script = document.createElement('script');
        script.src = `${basePath}${scriptName}.js`;
        script.onload = () => console.log(`✅ Скрипт загружен: ${scriptName}.js`);
        script.onerror = () => console.error(`❌ Не удалось загрузить: ${scriptName}.js`);
        document.head.appendChild(script);
    });
}

/**
 * Получение текущих настроек с учетом сохраненных и значений по умолчанию
 * @param {string} type - Тип настроек ('table' или 'propisi')
 * @returns {Object} - Текущие настройки
 */
function getSettings(type) {
    if (!DEFAULT_SETTINGS[type]) {
        console.warn(`Тип настроек "${type}" не найден`);
        return {};
    }
    
    try {
        const saved = localStorage.getItem(`${type}_settings`);
        const defaults = DEFAULT_SETTINGS[type];
        
        if (saved) {
            const parsed = JSON.parse(saved);
            return { ...defaults, ...parsed };
        }
        
        return defaults;
    } catch (error) {
        console.error('Ошибка загрузки настроек:', error);
        return DEFAULT_SETTINGS[type] || {};
    }
}

/**
 * Сохранение настроек в localStorage
 * @param {string} type - Тип настроек ('table' или 'propisi')
 * @param {Object} settings - Настройки для сохранения
 */
function saveSettings(type, settings) {
    try {
        localStorage.setItem(`${type}_settings`, JSON.stringify(settings));
        console.log(`✅ Настройки "${type}" сохранены`);
        return true;
    } catch (error) {
        console.error('❌ Ошибка сохранения настроек:', error);
        return false;
    }
}

/**
 * Перемешивание массива (алгоритм Фишера-Йетса)
 * @param {Array} array - Исходный массив
 * @returns {Array} - Перемешанный массив
 */
function shuffleArray(array) {
    if (!Array.isArray(array)) return [];
    
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/**
 * Получение случайного элемента из массива
 * @param {Array} array - Исходный массив
 * @returns {*} - Случайный элемент или null если массив пуст
 */
function getRandomElement(array) {
    if (!Array.isArray(array) || array.length === 0) {
        return null;
    }
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Получение случайных элементов из массива без повторений
 * @param {Array} array - Исходный массив
 * @param {number} count - Количество элементов
 * @returns {Array} - Массив случайных элементов
 */
function getRandomElements(array, count) {
    if (!Array.isArray(array) || count <= 0) return [];
    
    const shuffled = shuffleArray(array);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Форматирование числа с добавлением нулей
 * @param {number} num - Число
 * @param {number} length - Длина результата
 * @returns {string} - Отформатированное число
 */
function padZero(num, length = 2) {
    return String(num).padStart(length, '0');
}

/**
 * Преобразование строки в camelCase
 * @param {string} str - Исходная строка
 * @returns {string} - Строка в camelCase
 */
function toCamelCase(str) {
    return str
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .split(' ')
        .map((word, index) => {
            if (index === 0) return word.toLowerCase();
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
}

/**
 * Преобразование строки в kebab-case
 * @param {string} str - Исходная строка
 * @returns {string} - Строка в kebab-case
 */
function toKebabCase(str) {
    return str
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-+|-+$/g, '');
}

/**
 * Проверка, является ли значение числом
 * @param {*} value - Проверяемое значение
 * @returns {boolean} - Является ли числом
 */
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Ограничение числа в пределах диапазона
 * @param {number} value - Число
 * @param {number} min - Минимальное значение
 * @param {number} max - Максимальное значение
 * @returns {number} - Ограниченное число
 */
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

/**
 * Дебаунсинг функции
 * @param {Function} func - Функция
 * @param {number} wait - Время ожидания в мс
 * @returns {Function} - Дебаунс-функция
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Троттлинг функции
 * @param {Function} func - Функция
 * @param {number} limit - Лимит времени в мс
 * @returns {Function} - Троттл-функция
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Генерация уникального ID
 * @param {number} length - Длина ID
 * @returns {string} - Уникальный ID
 */
function generateId(length = 8) {
    return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Проверка поддержки localStorage
 * @returns {boolean} - Поддерживается ли localStorage
 */
function isLocalStorageSupported() {
    try {
        const test = '__test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Показать сообщение об ошибке
 * @param {string} message - Сообщение
 * @param {string} type - Тип: 'error', 'warning', 'success', 'info'
 * @param {number} duration - Длительность показа в мс
 */
function showMessage(message, type = 'info', duration = 3000) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 6px;
        color: white;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    const bgColor = {
        error: COLORS.error,
        warning: COLORS.warning,
        success: COLORS.success,
        info: COLORS.primary
    }[type] || COLORS.primary;
    
    messageDiv.style.backgroundColor = bgColor;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    document.body.removeChild(messageDiv);
                }
            }, 300);
        }
    }, duration);
}

/**
 * Добавить CSS анимации для сообщений
 */
function addMessageStyles() {
    if (document.querySelector('#message-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'message-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Инициализация стилей сообщений при загрузке
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', addMessageStyles);
}

// Экспортируем все функции в глобальную область видимости
if (typeof window !== 'undefined') {
    // Основные функции
    window.clear_content = clear_content;
    window.transliterate = transliterate;
    window.changeCase = changeCase;
    window.getUIText = getUIText;
    window.createElement = createElement;
    window.loadAllStyles = loadAllStyles;
    window.addScripts = addScripts;
    window.getSettings = getSettings;
    window.saveSettings = saveSettings;
    
    // Вспомогательные функции
    window.shuffleArray = shuffleArray;
    window.getRandomElement = getRandomElement;
    window.getRandomElements = getRandomElements;
    window.padZero = padZero;
    window.toCamelCase = toCamelCase;
    window.toKebabCase = toKebabCase;
    window.isNumeric = isNumeric;
    window.clamp = clamp;
    window.debounce = debounce;
    window.throttle = throttle;
    window.generateId = generateId;
    window.isLocalStorageSupported = isLocalStorageSupported;
    window.showMessage = showMessage;
    
    console.log('✅ Все универсальные функции загружены');
}