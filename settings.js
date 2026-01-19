
// window.onload = function () {
//     console.log('=== GitHub Pages Debug ===');
// console.log('URL:', window.location.href);
// console.log('Pathname:', window.location.pathname);
// console.log('Host:', window.location.host);
// console.log('Ищет файлы относительно:', window.location.origin + window.location.pathname);
//     let point = document.querySelector('#JS_settings');
//     let script_names=['table','propisi']
//     script_names.forEach(el => {
//         let script = document.createElement('script');
//         script.src = './generation/' + el + '.js';
//         document.head.appendChild(script);
//     })
//     document.querySelector('#table_btn').onclick = function () {
//         settings_table();
//         //    create_settings_table();
//     }
//     document.querySelector('#propisi_btn').onclick = function () {
//         generator_propisi();
//     }
// }
// // Функция для асинхронной загрузки скрипта
// function loadScript(src) {
//     return new Promise((resolve, reject) => {
//         let script = document.createElement('script');
//         script.src = src;
//         script.onload = () => resolve();
//         script.onerror = () => reject(new Error(`Ошибка загрузки скрипта: ${src}`));
//         document.head.appendChild(script);
//     });
// }
window.onload = function () {
    console.log('=== GitHub Pages Debug ===');
    console.log('URL:', window.location.href);
    console.log('Pathname:', window.location.pathname);
    console.log('Host:', window.location.host);
    console.log('Ищет файлы относительно:', window.location.origin + window.location.pathname);
    
    let point = document.querySelector('#JS_settings');
    let script_names = ['table', 'propisi'];
    
    script_names.forEach(el => {
        let script = document.createElement('script');
        // Измените путь - добавьте папку generation/
        script.src = './generation/' + el + '.js';  // ← ПРАВИЛЬНЫЙ ПУТЬ!
        
        script.onerror = function() {
            console.error('❌ Не удалось загрузить скрипт:', this.src);
            // Попробуем альтернативный путь
            console.log('Пробуем альтернативный путь...');
            const altScript = document.createElement('script');
            altScript.src = 'generation/' + el + '.js'; // без точки
            document.head.appendChild(altScript);
        };
        
        script.onload = function() {
            console.log('✅ Загружен скрипт:', this.src);
        };
        
        document.head.appendChild(script);
    });
    
    // Обработчики кнопок с проверкой загрузки
    document.querySelector('#table_btn').onclick = function () {
        if (typeof settings_table === 'function') {
            settings_table();
        } else {
            console.error('Функция settings_table не найдена!');
            alert('Скрипт table.js не загрузился. Обновите страницу или проверьте консоль (F12).');
        }
    }
    
    document.querySelector('#propisi_btn').onclick = function () {
        if (typeof generator_propisi === 'function') {
            generator_propisi();
        } else {
            console.error('Функция generator_propisi не найдена!');
            alert('Скрипт propisi.js не загрузился. Обновите страницу или проверьте консоль (F12).');
        }
    }
}

// Функция для асинхронной загрузки скрипта
function loadScript(src) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Ошибка загрузки скрипта: ${src}`));
        document.head.appendChild(script);
    });
}