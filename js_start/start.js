// start.js - функции стартовой страницы

function showScreen(screenType, options = {}) {
    console.log(`Переключение на экран: ${screenType}`, options);
    
    const content = document.querySelector('.content');
    const setting = document.querySelector('.setting');
    
    // Очищаем предыдущий контент
    clear_content(content);
    clear_content(setting);
    
    // Сохраняем историю навигации
    if (window.NAVIGATION_HISTORY && screenType !== window.APP_STATE.currentScreen) {
        window.NAVIGATION_HISTORY.push(window.APP_STATE.currentScreen);
        window.APP_STATE.currentScreen = screenType;
    }
    
    // В зависимости от типа экрана вызываем соответствующую функцию
    switch(screenType) {
        case 'table':
            if (typeof settings_table === 'function') {
                settings_table();
            } else {
                console.error('Функция settings_table не найдена');
                showScreen('start');
            }
            break;
            
        case 'propisi_for_memoring':
            if (typeof generator_propisi_m === 'function') {
                generator_propisi_m();
            } else {
                console.error('Функция generator_propisi_m не найдена');
                showScreen('start');
            }
            break;
        // В функции showScreen добавляем:
        case 'propisi_kana':
            if (typeof generator_propisi_kana === 'function') {
                generator_propisi_kana();
            } else {
                console.error('Функция generator_propisi_kana не найдена');
                showScreen('start');
            }
            break;
        case 'start':
        default:
            create_start_page();
            break;
    }
}

// Функция для возврата на предыдущий экран
function goBack() {
    if (window.NAVIGATION_HISTORY && window.NAVIGATION_HISTORY.length > 0) {
        const previousScreen = window.NAVIGATION_HISTORY.pop();
        showScreen(previousScreen);
    } else {
        showScreen('start');
    }
}

// Создание стартовой страницы с использованием функций из function.js
function create_start_page() {
    let content = document.querySelector('.content');
    let setting = document.querySelector('.setting');
    
    clear_content(content);
    clear_content(setting);
    
    // Создаем контейнер для иконки и приветствия
    const headerContainer = createElement('div', {
        className: 'start-header'
    });
    
    // Блок с иконкой
    const iconContainer = createElement('div', {
        className: 'icon-container'
    });
    
    const icon = createElement('img', {
        src: PATHS.favicon,
        alt: 'Learn Nihongo desu~',
        className: 'main-icon'
    });
    
    const iconCaption = createElement('div', {
        className: 'icon-caption',
        textContent: 'Learn Nihongo desu~'
    });
    
    iconContainer.appendChild(icon);
    iconContainer.appendChild(iconCaption);
    
    // Блок с приветствием
    const greetingContainer = createElement('div', {
        className: 'greeting-container'
    });
    
    const greetingTitle = createElement('h1', {
        className: 'greeting-title',
        textContent: getUIText('welcome', window.APP_STATE.language)
    });
    
    const greetingSubtitle = createElement('div', {
        className: 'greeting-subtitle',
        textContent: getUIText('welcomeJp', window.APP_STATE.language)
    });
    
    const greetingText = createElement('p', {
        className: 'greeting-text',
        textContent: 'Начните своё путешествие в изучении японского языка прямо сейчас. Выберите один из инструментов выше и погрузитесь в удивительный мир каны!'
    });
    
    greetingContainer.appendChild(greetingTitle);
    greetingContainer.appendChild(greetingSubtitle);
    greetingContainer.appendChild(greetingText);
    
    headerContainer.appendChild(iconContainer);
    headerContainer.appendChild(greetingContainer);
    setting.appendChild(headerContainer);
    
    // Основной контент с описанием возможностей
    const contentContainer = createElement('div', {
        className: 'start-content'
    });
    
    // Заголовок
    const contentTitle = createElement('h2', {
        className: 'content-title',
        textContent: getUIText('features', window.APP_STATE.language)
    });
    contentContainer.appendChild(contentTitle);
    
    // Карточки с возможностями
    const featuresGrid = createElement('div', {
        className: 'features-grid'
    });
    
    const features = [
        {
            title: getUIText('tableCard', window.APP_STATE.language),
            description: 'Изучайте полные таблицы хираганы и катаканы. Просматривайте символы по группам',
            color: COLORS.accent,
            screen: 'table'
        },
        {
            title: getUIText('propisiCard', window.APP_STATE.language),
            description: 'Создавайте прописи для практики письма. Настраивайте количество строк, пар символов и выбирайте нужные категории символов.',
            color: COLORS.hiragana,
            screen: 'propisi_for_memoring'
        }
    ];
    
    // Создаем карточки
    features.forEach(feature => {
        const featureCard = createElement('div', {
            className: 'feature-card',
            style: {
                borderTop: `4px solid ${feature.color}`,
                cursor: 'pointer'
            }
        });
        
        // Добавляем эффект при наведении
        featureCard.addEventListener('mouseenter', () => {
            featureCard.style.transform = 'translateY(-5px)';
            featureCard.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        featureCard.addEventListener('mouseleave', () => {
            featureCard.style.transform = 'translateY(0)';
            featureCard.style.boxShadow = 'none';
        });
        
        // Обработчик клика
        featureCard.addEventListener('click', () => {
            showScreen(feature.screen);
        });
        
        const featureTitle = createElement('h3', {
            className: 'feature-title',
            textContent: feature.title
        });
        
        const featureDesc = createElement('p', {
            className: 'feature-description',
            textContent: feature.description
        });
        
        featureCard.appendChild(featureTitle);
        featureCard.appendChild(featureDesc);
        featuresGrid.appendChild(featureCard);
    });
    
    contentContainer.appendChild(featuresGrid);
    
    // Призыв к действию
    const ctaSection = createElement('div', {
        className: 'cta-section'
    });
    
    const ctaText = createElement('p', {
        className: 'cta-text',
        innerHTML: getUIText('cta', window.APP_STATE.language)
    });
    
    ctaSection.appendChild(ctaText);
    contentContainer.appendChild(ctaSection);
    
    content.appendChild(contentContainer);
}

// Экспортируем функции для использования в других модулях
if (typeof window !== 'undefined') {
    window.showScreen = showScreen;
    window.goBack = goBack;
    window.create_start_page = create_start_page;
}