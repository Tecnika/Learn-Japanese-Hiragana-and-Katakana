window.onload = function () {
    console.log('=== GitHub Pages Debug ===');
    console.log('URL:', window.location.href);
    console.log('Pathname:', window.location.pathname);
    console.log('Host:', window.location.host);
    console.log('Ищет файлы относительно:', window.location.origin + window.location.pathname);
    
    // Инициализация кнопок
    initButtons();
    
    // Загрузка ресурсов
    let script_names = ['table', 'propisi'];
    let style_names = ['default', 'start','propisi','adaptive']; 
    
    add(script_names, 'generation', 'script', 'js');
    add(style_names, 'style', 'link', 'css');
    
    // Создание стартовой страницы после загрузки ресурсов
    setTimeout(create_start_page, 500); // Даем время на загрузку скриптов
}

function initButtons() {
    // Ждем появления кнопок в DOM
    setTimeout(() => {
        const tableBtn = document.querySelector('#table_btn');
        const propisiBtn = document.querySelector('#propisi_btn');
        
        if (tableBtn) {
            tableBtn.onclick = function () {
                console.log('Кнопка таблицы нажата');
                if (typeof settings_table === 'function') {
                    settings_table();
                } else {
                    console.error('Функция settings_table не найдена');
                    // Попробуем загрузить скрипт
                    loadScript('./generation/table.js').then(() => {
                        if (typeof settings_table === 'function') {
                            settings_table();
                        }
                    });
                }
            };
            console.log('Кнопка таблицы инициализирована');
        }
        
        if (propisiBtn) {
            propisiBtn.onclick = function () {
                console.log('Кнопка прописей нажата');
                if (typeof generator_propisi === 'function') {
                    generator_propisi();
                } else {
                    console.error('Функция generator_propisi не найдена');
                    // Попробуем загрузить скрипт
                    loadScript('./generation/propisi.js').then(() => {
                        if (typeof generator_propisi === 'function') {
                            generator_propisi();
                        }
                    });
                }
            };
            console.log('Кнопка прописей инициализирована');
        }
    }, 100);
}

// Функция для асинхронной загрузки скрипта
function loadScript(src) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            console.log('✅ Скрипт загружен:', src);
            resolve();
        };
        script.onerror = () => {
            console.error('❌ Ошибка загрузки скрипта:', src);
            reject(new Error(`Ошибка загрузки скрипта: ${src}`));
        };
        document.head.appendChild(script);
    });
}

function loadStyle(src) {
    return new Promise((resolve, reject) => {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = src;
        link.onload = () => {
            console.log('✅ Стили загружены:', src);
            resolve();
        };
        link.onerror = () => {
            console.error('❌ Ошибка загрузки стилей:', src);
            reject(new Error(`Ошибка загрузки стилей: ${src}`));
        };
        document.head.appendChild(link);
    });
}

function add(arr, path, type, format) {
    arr.forEach(el => {
        const src = `./${path}/${el}.${format}`;
        console.log(`Пытаюсь загрузить: ${src}`);
        
        if (type === 'script') {
            loadScript(src).catch(err => {
                console.error(err);
                // Пробуем альтернативный путь
                const altSrc = `/${path}/${el}.${format}`;
                console.log(`Пробую альтернативный путь: ${altSrc}`);
                return loadScript(altSrc);
            });
        } else if (type === 'link') {
            loadStyle(src).catch(err => {
                console.error(err);
                // Пробуем альтернативный путь
                const altSrc = `/${path}/${el}.${format}`;
                console.log(`Пробую альтернативный путь: ${altSrc}`);
                return loadStyle(altSrc);
            });
        }
    });
}

// Функция для очистки контента (должна быть определена где-то в вашем коде)
function clear_content(element) {
    if (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}