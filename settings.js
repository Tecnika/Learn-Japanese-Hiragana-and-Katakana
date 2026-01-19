// Основная функция загрузки
window.onload = function () {
    console.log('=== GitHub Pages Debug ===');
    console.log('URL:', window.location.href);
    console.log('Pathname:', window.location.pathname);
    console.log('Host:', window.location.host);
    console.log('Ищет файлы относительно:', window.location.origin + window.location.pathname);
    
    // Загружаем ВСЕ стили здесь
    loadAllStyles();
    
    // Загружаем скрипты
    let script_names = ['table', 'propisi'];
    add(script_names, 'generation', 'script', 'js');
    
    // Инициализируем кнопки
    // initButtons();
    
    // Создаем стартовую страницу
    if (typeof create_start_page === 'function') {
        create_start_page();
    }
}

// Функция загрузки ВСЕХ стилей
function loadAllStyles() {
    console.log('Загрузка всех стилей...');
    
    const style_names = ['default', 'start', 'propisi', 'adaptive'];
    
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

// Функция добавления скриптов (как в оригинале)
function add(arr, path, type, format) {
    arr.forEach(el => {
        let file = document.createElement(type);
        file.src = `${path}/${el}.${format}`;
        
        file.onerror = function() {
            console.error('❌ Не удалось загрузить:', this.src);
            // Пробуем альтернативный путь
            const altFile = document.createElement(type);
            altFile.src = `./${path}/${el}.${format}`;
            altFile.onload = function() {
                console.log('✅ Загружен (альтернативный путь):', this.src);
            };
            document.head.appendChild(altFile);
        };
        
        file.onload = function() {
            console.log('✅ Загружен файл:', this.src);
        };
        
        document.head.appendChild(file);
    })
}



// Глобальная функция очистки (должна быть доступна везде)
function clear_content(element) {
    if (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}