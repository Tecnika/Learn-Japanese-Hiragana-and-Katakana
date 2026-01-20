function create_table(kana, skip = false) {
    let content = document.querySelector('.content');
    if (!skip) {
        clear_content(content)
    }
    // Adding the entire table to the body tag

    let i = 0;
    for (let prop in kana) {
        let table = document.createElement('table');
        let tbody = document.createElement('tbody');
        table.appendChild(tbody);
        create_header(table, i);
        create_subtable(tbody, kana, prop);
        i++;
        content.appendChild(table);
    }

}

function create_header(table, i) {
    let header = document.createElement('caption');
    header.innerHTML = name_table[i];
    // header.text_align = center;
    table.appendChild(header);
}

function create_subtable(tbody, kana, chapter) {
    for (let i = 0; i < kana[chapter].length; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < kana[chapter][i].length; j++) {
            let row_data = document.createElement('td');
            row_data.innerHTML = kana[chapter][i][j] + enter + Kana_ru[chapter][i][j] + enter + Kana_en[chapter][i][j];
            row.appendChild(row_data);
            tbody.appendChild(row);
        }
    }

}

function clear_content(doc) {
    doc.innerHTML = '';
}
function transliterate(text) {
    const translitMap = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
        'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
        'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch',
        'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '',
        'э': 'e', 'ю': 'yu', 'я': 'ya',

        // Заглавные буквы
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
        'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
        'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
        'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
        'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch',
        'Ш': 'Sh', 'Щ': 'Shch', 'Ъ': '', 'Ы': 'Y', 'Ь': '',
        'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
    };
    return text.split('').map(char => {
        // Если символ есть в карте транслитерации, заменяем его
        if (translitMap[char]) {
            return translitMap[char];
        }
        // Иначе оставляем как есть (для английских букв, цифр, спецсимволов)
        return char;
    }).join('');
}

function create_start_page(){
    let content = document.querySelector('.content');
    let setting = document.querySelector('.setting');
    
    clear_content(content);
    clear_content(setting);
    
    // Создаем контейнер для иконки и приветствия
    const headerContainer = document.createElement('div');
    headerContainer.className = 'start-header';
    
    // Создаем блок с иконкой
    const iconContainer = document.createElement('div');
    iconContainer.className = 'icon-container';
    
    let icon = document.createElement('img');
    icon.src = './img/favicon.ico';
    icon.alt = 'Learn Nihongo desu~';
    icon.className = 'main-icon';
    
    const iconCaption = document.createElement('div');
    iconCaption.className = 'icon-caption';
    iconCaption.textContent = 'Learn Nihongo desu~';
    
    iconContainer.appendChild(icon);
    iconContainer.appendChild(iconCaption);
    
    // Создаем блок с приветствием
    const greetingContainer = document.createElement('div');
    greetingContainer.className = 'greeting-container';
    
    const greetingTitle = document.createElement('h1');
    greetingTitle.className = 'greeting-title';
    greetingTitle.textContent = 'Добро пожаловать в мир японского языка!';
    
    const greetingSubtitle = document.createElement('div');
    greetingSubtitle.className = 'greeting-subtitle';
    greetingSubtitle.textContent = 'ようこそ日本語の世界へ！';
    
    const greetingText = document.createElement('p');
    greetingText.className = 'greeting-text';
    greetingText.textContent = 'Начните своё путешествие в изучении японского языка прямо сейчас. Выберите один из инструментов выше и погрузитесь в удивительный мир каны!';
    
    greetingContainer.appendChild(greetingTitle);
    greetingContainer.appendChild(greetingSubtitle);
    greetingContainer.appendChild(greetingText);
    
    headerContainer.appendChild(iconContainer);
    headerContainer.appendChild(greetingContainer);
    setting.appendChild(headerContainer);
    
    // Создаем основной контент с описанием возможностей
    const contentContainer = document.createElement('div');
    contentContainer.className = 'start-content';
    
    // Заголовок
    const contentTitle = document.createElement('h2');
    contentTitle.className = 'content-title';
    contentTitle.textContent = 'Что можно делать на сайте:';
    contentContainer.appendChild(contentTitle);
    
    // Карточки с возможностями
    const featuresGrid = document.createElement('div');
    featuresGrid.className = 'features-grid';
    
    const features = [
          {
            title: '🔤 Таблица каны',
            description: 'Изучайте полные таблицы хираганы и катаканы. Просматривайте символы по группам',
            color: '#9f7aea'
        },
        {
            title: '📝 Прописи для запоминания каны',
            description: 'Создавайте прописи для практики письма. Настраивайте количество строк, пар символов и выбирайте нужные категории символов.',
            color: '#4299e1'
        },
        // {
        //     title: '🎯 Тренажёр запоминания',
        //     description: 'Улучшайте свои навыки запоминания японских символов. Выбирайте уровни сложности и отслеживайте прогресс.',
        //     color: '#38b2ac'
        // },
      

    ];
    
    features.forEach(feature => {
        const featureCard = document.createElement('div');
        featureCard.className = 'feature-card';
        featureCard.style.borderTop = `4px solid ${feature.color}`;
        
        const featureTitle = document.createElement('h3');
        featureTitle.className = 'feature-title';
        featureTitle.textContent = feature.title;
        
        const featureDesc = document.createElement('p');
        featureDesc.className = 'feature-description';
        featureDesc.textContent = feature.description;
        
        featureCard.appendChild(featureTitle);
        featureCard.appendChild(featureDesc);
        featuresGrid.appendChild(featureCard);
    });
    
    contentContainer.appendChild(featuresGrid);
        
  
    
    // Призыв к действию
    const ctaSection = document.createElement('div');
    ctaSection.className = 'cta-section';
    
    const ctaText = document.createElement('p');
    ctaText.className = 'cta-text';
    ctaText.innerHTML = '🎌 <strong>Готовы начать?</strong> Выберите нужный инструмент в меню выше и приступайте к изучению!<br>がんばってください！(Удачи!)';
    
    const startButton = document.createElement('button');
    startButton.className = 'start-button';
    startButton.textContent = 'Начать изучение';
    startButton.addEventListener('click', () => {
        // Можно добавить плавную прокрутку к меню
        document.querySelector('.menu').scrollIntoView({ behavior: 'smooth' });
    });
    
    ctaSection.appendChild(ctaText);
    ctaSection.appendChild(startButton);
    contentContainer.appendChild(ctaSection);
    
    content.appendChild(contentContainer);
}