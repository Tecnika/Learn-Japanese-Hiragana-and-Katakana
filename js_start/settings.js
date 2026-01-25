// settings.js - исправленная версия с очисткой content
window.onload = function () {
    console.log('=== Запуск приложения ===');
    console.log('Загружаемые модули:', window.APP_STATE);
    
    // Загружаем все стили
    if (typeof loadAllStyles === 'function') {
        loadAllStyles();
    } else {
        console.error('Функция loadAllStyles не найдена');
    }
    
    // Загружаем скрипты генерации
    const scriptNames = ['table', 'propisi_for_memoring', 'table_audio', 'propisi_kana'];
    console.log('Попытка загрузки скриптов:', scriptNames);
    
    if (typeof addScripts === 'function') {
        addScripts(scriptNames, PATHS.js.generation);
    } else {
        console.error('Функция addScripts не найдена, загружаем скрипты вручную');
        // Альтернативная загрузка скриптов
        scriptNames.forEach(scriptName => {
            const script = document.createElement('script');
            script.src = `${PATHS.js.generation}${scriptName}.js`;
            script.onload = () => console.log(`✅ Скрипт загружен: ${scriptName}.js`);
            script.onerror = (e) => {
                console.error(`❌ Не удалось загрузить: ${scriptName}.js`, e);
                // Показываем ошибку пользователю
                if (scriptName === 'propisi_kana') {
                    console.error('КРИТИЧЕСКАЯ ОШИБКА: propisi_kana.js не загружен');
                }
            };
            document.head.appendChild(script);
        });
    }
    
    // Инициализируем навигацию
    initNavigation();
    
    // Показываем стартовую страницу
    if (typeof showScreen === 'function') {
        showScreen('start');
    } else {
        console.error('Функция showScreen не найдена');
        // Показываем простую стартовую страницу
        createSimpleStartPage();
    }
}

function initNavigation() {
    console.log('Инициализация навигации...');
    
    document.addEventListener('click', function(event) {
        const button = event.target.closest('.button');
        if (!button) return;
        
        event.preventDefault();
        
        // Очищаем content блок при выборе любого инструмента
        const content = document.querySelector('.content');
        if (content) {
            clear_content(content);
        }
        
        switch(button.id) {
            case 'table_btn':
                console.log('Нажата кнопка "Таблица"');
                if (typeof settings_table === 'function') {
                    settings_table();
                } else {
                    console.error('Функция settings_table не найдена');
                    showSimpleMessage('Модуль таблиц еще не загружен. Пожалуйста, подождите...');
                }
                break;
                
            case 'propisi_for_memoring_btn':
                console.log('Нажата кнопка "Прописи для запоминания"');
                if (typeof settings_propisi_m === 'function') {
                    settings_propisi_m();
                } else {
                    console.error('Функция settings_propisi_m не найдена');
                    showSimpleMessage('Модуль прописей для запоминания еще не загружен. Пожалуйста, подождите...');
                }
                break;
                
            case 'propisi_kana_btn':
                console.log('Нажата кнопка "Прописи каны"');
                console.log('Доступные функции:', {
                    settings_propisi_kana: typeof settings_propisi_kana,
                    generator_propisi_kana: typeof generator_propisi_kana,
                    window: Object.keys(window).filter(k => k.includes('propisi'))
                });
                
                // Очищаем setting блок
                const setting = document.querySelector('.setting');
                if (setting) {
                    clear_content(setting);
                }
                
                if (typeof settings_propisi_kana === 'function') {
                    settings_propisi_kana();
                } else if (typeof generator_propisi_kana === 'function') {
                    generator_propisi_kana();
                } else {
                    console.error('Функции прописей каны не найдены');
                    showSimpleMessage('Модуль прописей каны еще не загружен. Пожалуйста, подождите 2-3 секунды и попробуйте снова.');
                    
                    // Пробуем загрузить скрипт вручную
                    setTimeout(() => {
                        const script = document.createElement('script');
                        script.src = `${PATHS.js.generation}propisi_kana.js`;
                        script.onload = () => {
                            console.log('✅ Скрипт propisi_kana.js загружен вручную');
                            if (typeof settings_propisi_kana === 'function') {
                                settings_propisi_kana();
                            }
                        };
                        script.onerror = () => {
                            console.error('❌ Не удалось загрузить propisi_kana.js даже вручную');
                            showSimpleMessage('Не удалось загрузить модуль прописей каны. Проверьте консоль для деталей.');
                        };
                        document.head.appendChild(script);
                    }, 100);
                }
                break;
                
            case 'read_btn':
                console.log('Нажата кнопка "Чтение"');
                // Очищаем оба блока
                const settingRead = document.querySelector('.setting');
                const contentRead = document.querySelector('.content');
                if (settingRead) clear_content(settingRead);
                if (contentRead) clear_content(contentRead);
                
                showSimpleMessage('Раздел "Чтение" находится в разработке');
                break;
                
            default:
                console.log('Нажата неизвестная кнопка:', button.id);
        }
    });
}

// Простая функция для показа сообщений
function showSimpleMessage(message) {
    const content = document.querySelector('.content');
    if (content) {
        clear_content(content);
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            padding: 20px;
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            color: #856404;
            text-align: center;
            margin: 20px;
            font-size: 16px;
        `;
        messageDiv.textContent = message;
        content.appendChild(messageDiv);
    } else {
        alert(message);
    }
}

// Простая стартовая страница на случай ошибок
function createSimpleStartPage() {
    const content = document.querySelector('.content');
    const setting = document.querySelector('.setting');
    
    // Очищаем оба блока
    if (content) clear_content(content);
    if (setting) clear_content(setting);
    
    if (content) {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.style.cssText = 'text-align: center; padding: 40px;';
        welcomeDiv.innerHTML = `
            <h1>Learn Nihongo desu~</h1>
            <p>Добро пожаловать в приложение для изучения японского!</p>
            <p>Используйте кнопки выше для навигации.</p>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
                Если модули не загружаются, проверьте консоль браузера (F12) для деталей ошибки.
            </p>
        `;
        content.appendChild(welcomeDiv);
    }
}

// Экспортируем функции
if (typeof window !== 'undefined') {
    window.initNavigation = initNavigation;
    window.showSimpleMessage = showSimpleMessage;
}