
window.onload = function () {
    console.log('=== GitHub Pages Debug ===');
console.log('URL:', window.location.href);
console.log('Pathname:', window.location.pathname);
console.log('Host:', window.location.host);
console.log('Ищет файлы относительно:', window.location.origin + window.location.pathname);
    let point = document.querySelector('#JS_settings');
    let script_names=['table','propisi']
    script_names.forEach(el => {
        let script = document.createElement('script');
        script.src = './generation/' + el + '.js';
        document.head.appendChild(script);
    })
    document.querySelector('#table_btn').onclick = function () {
        settings_table();
        //    create_settings_table();
    }
    document.querySelector('#propisi_btn').onclick = function () {
        generator_propisi();
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
