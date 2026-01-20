// // Основная функция загрузки
// window.onload = function () {
//     console.log('=== GitHub Pages Debug ===');
//     console.log('URL:', window.location.href);
//     console.log('Pathname:', window.location.pathname);
//     console.log('Host:', window.location.host);
//     console.log('Ищет файлы относительно:', window.location.origin + window.location.pathname);
    
//     // Загружаем ВСЕ стили здесь
//     loadAllStyles();
    
//     // Загружаем скрипты
//     let script_names = ['table', 'propisi'];
//     add(script_names, 'generation', 'script', 'js');
    
//     // Инициализируем кнопки
//     initButtons();
    
//     // Создаем стартовую страницу
//     if (typeof create_start_page === 'function') {
//         create_start_page();
//     }
// }

// // Функция загрузки ВСЕХ стилей
// function loadAllStyles() {
//     console.log('Загрузка всех стилей...');
    
//     const style_names = ['default', 'start', 'propisi', 'adaptive'];
    
//     style_names.forEach(style => {
//         const link = document.createElement('link');
//         link.rel = 'stylesheet';
//         link.href = `style/${style}.css`;
        
//         link.onerror = function() {
//             console.error('❌ Не удалось загрузить стиль:', this.href);
//         };
        
//         link.onload = function() {
//             console.log('✅ Стиль загружен:', this.href);
//         };
        
//         document.head.appendChild(link);
//     });
// }

// // Функция добавления скриптов (как в оригинале)
// function add(arr, path, type, format) {
//     arr.forEach(el => {
//         let file = document.createElement(type);
//         file.src = `${path}/${el}.${format}`;
        
//         file.onerror = function() {
//             console.error('❌ Не удалось загрузить:', this.src);
//             // Пробуем альтернативный путь
//             const altFile = document.createElement(type);
//             altFile.src = `./${path}/${el}.${format}`;
//             altFile.onload = function() {
//                 console.log('✅ Загружен (альтернативный путь):', this.src);
//             };
//             document.head.appendChild(altFile);
//         };
        
//         file.onload = function() {
//             console.log('✅ Загружен файл:', this.src);
//         };
        
//         document.head.appendChild(file);
//     })
// }
// // Функция для инициализации всех кнопок навигации
// function initButtons() {
//     console.log('Инициализация кнопок...');
    
//     // 1. Кнопка "Таблица"
//     const tableBtn = document.getElementById('table_btn');
//     if (tableBtn) {
//         tableBtn.addEventListener('click', function() {
//             console.log('Кнопка "Таблица" нажата');
//             // Вызываем функцию создания таблицы из start.js
//             if (typeof create_table === 'function') {
//                 create_table(hiragana); // Показывает хирагану по умолчанию
//             } else {
//                 console.error('Функция create_table не найдена');
//             }
//         });
//     } else {
//         console.error('Кнопка "Таблица" не найдена');
//     }
    
//     // 2. Кнопка "Прописи"
//     const propisiBtn = document.getElementById('propisi_btn');
//     if (propisiBtn) {
//         propisiBtn.addEventListener('click', function() {
//             console.log('Кнопка "Прописи" нажата');
//             // Здесь нужно вызвать функцию генерации прописей
//             alert('Функция прописей в разработке'); // Временная заглушка
//         });
//     } else {
//         console.error('Кнопка "Прописи" не найдена');
//     }
    
//     // 3. Кнопка "Чтение" (заглушка)
//     const readBtn = document.getElementById('read_btn');
//     if (readBtn) {
//         readBtn.addEventListener('click', function() {
//             console.log('Кнопка "Чтение" нажата');
//             alert('Раздел "Чтение" находится в разработке');
//         });
//     } else {
//         console.error('Кнопка "Чтение" не найдена');
//     }
// }



// // Глобальная функция очистки (должна быть доступна везде)
// function clear_content(element) {
//     if (element) {
//         while (element.firstChild) {
//             element.removeChild(element.firstChild);
//         }
//     }
// }

// settings.js - обновленная версия

// Основная функция загрузки
window.onload = function () {
    console.log('=== Запуск приложения с универсальной навигацией ===');
    
    // Загружаем ВСЕ стили
    loadAllStyles();
    
    // Загружаем скрипты генерации
    let script_names = ['table', 'propisi'];
    add(script_names, 'generation', 'script', 'js');
    
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

// Функция инициализации навигации
function initNavigation() {
    console.log('Инициализация навигации...');
    
    // Используем делегирование событий для меню
    document.addEventListener('click', function(event) {
        const button = event.target.closest('.button');
        if (button) {
            event.preventDefault();
            
            switch(button.id) {
                case 'table_btn':
                    console.log('Нажата кнопка "Таблица"');
                    if (typeof showScreen === 'function') {
                        showScreen('table');
                    }
                    break;
                    
                case 'propisi_btn':
                    console.log('Нажата кнопка "Прописи"');
                    if (typeof showScreen === 'function') {
                        showScreen('propisi');
                    }
                    break;
                    
                case 'read_btn':
                    console.log('Нажата кнопка "Чтение"');
                    // Можно добавить в будущем
                    alert('Раздел "Чтение" находится в разработке');
                    break;
                    
                default:
                    console.log('Нажата неизвестная кнопка:', button.id);
            }
        }
    });
}

// Остальные функции остаются без изменений
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

function add(arr, path, type, format) {
    arr.forEach(el => {
        let file = document.createElement(type);
        file.src = `${path}/${el}.${format}`;
        
        file.onerror = function() {
            console.error('❌ Не удалось загрузить:', this.src);
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

// Глобальная функция очистки
function clear_content(element) {
    if (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}