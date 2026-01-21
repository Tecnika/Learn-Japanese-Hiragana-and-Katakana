// settings.js
// Основная функция загрузки
window.onload = function () {
    console.log('=== Запуск приложения с универсальной навигацией ===');
    
    // Загружаем ВСЕ стили
    loadAllStyles();
    
    // Загружаем скрипты как обычные, а не как модули
    let script_names = ['table', 'propisi', 'table_audio'];
    addScripts(script_names);
    
    // Добавляем обработчики для меню навигации
    initNavigation();
    
    // Показываем стартовую страницу
    if (typeof showScreen === 'function') {
        showScreen('start');
    } else if (typeof create_start_page === 'function') {
        // Запасной вариант для обратной совместимости
        create_start_page();
    }
}

// Функция для добавления скриптов
function addScripts(scriptNames) {
    scriptNames.forEach(scriptName => {
        const script = document.createElement('script');
        script.src = `generation/${scriptName}.js`;
        script.onload = () => console.log(`✅ Скрипт загружен: ${scriptName}.js`);
        script.onerror = () => console.error(`❌ Не удалось загрузить: ${scriptName}.js`);
        document.head.appendChild(script);
    });
}

// Инициализация навигации
function initNavigation() {
    console.log('Инициализация навигации...');
    
    document.addEventListener('click', function(event) {
        const button = event.target.closest('.button');
        if (button) {
            event.preventDefault();
            
            switch(button.id) {
                case 'table_btn':
                    console.log('Нажата кнопка "Таблица"');
                    if (typeof settings_table === 'function') {
                        settings_table();
                    }
                    break;
                    
                case 'propisi_btn':
                    console.log('Нажата кнопка "Прописи"');
                    if (typeof settings_propisi === 'function') {
                        settings_propisi();
                    }
                    break;
                    
                case 'read_btn':
                    console.log('Нажата кнопка "Чтение"');
                    alert('Раздел "Чтение" находится в разработке');
                    break;
                    
                default:
                    console.log('Нажата неизвестная кнопка:', button.id);
            }
        }
    });
}

// Остальные функции без изменений
function loadAllStyles() {
    console.log('Загрузка всех стилей...');
    
    const style_names = ['default', 'start', 'propisi', 'adaptive', 'table'];
    
    style_names.forEach(style => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `style/${style}.css`;
        
        link.onerror = function() {
            console.error('❌ Не удалось загрузить стиль:', this.href);
        };
        
        link.onload = function() {
            console.log('✅ Стиль загружен:', this.href);
        };
        
        document.head.appendChild(link);
    });
}

function add(arr, path, type, format) {
    arr.forEach(el => {
        let file = document.createElement(type);
        file.src = `${path}/${el}.${format}`;
        
        file.onerror = function() {
            console.error('❌ Не удалось загрузить:', this.src);
        };
        
        file.onload = function() {
            console.log('✅ Загружен файл:', this.src);
        };
        
        document.head.appendChild(file);
    })
}

// Глобальная функция очистки
function clear_content(element) {
    if (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}