function create_settings_table() {
    let settings = document.querySelector('.setting');
    clear_content(settings);
    var name_table = [
        'Хирагана+Катакана',
        'Хирагана',
        'Катакана',
    ]
    name_table.forEach((name,i)=> {
        let set = document.createElement('input');
        set.type = 'radio';
        set.value = transliterate(name);
        set.name = 'variant';
        if (i===0){
            set.checked = 'checked';
        }
        settings.appendChild(set);
        settings.append(name);
    });
}

function settings_table() {
    create_settings_table();
    
    // Получаем все радио-кнопки
    const radioButtons = document.querySelectorAll('input[name="variant"]');
    
    radioButtons.forEach(element => {
        element.addEventListener('change', (event) => {
            handleKanaChange(event.target.value);
        });
    });
    
    // Находим выбранную радио-кнопку и триггерим событие
    const checkedRadio = document.querySelector('input[name="variant"]:checked');
    if (checkedRadio) {
        handleKanaChange(checkedRadio.value);
    } else {
        // Если ни одна не выбрана, выбираем первую
        const firstRadio = document.querySelector('input[name="variant"]');
        if (firstRadio) {
            firstRadio.checked = true;
            handleKanaChange(firstRadio.value);
        }
    }
}

function handleKanaChange(kana) {
    if (kana === 'Hiragana') {
        create_table(hiragana);
    } else if (kana === 'Katakana') {
        create_table(katakana);
    } else {
        create_table(hiragana);
        create_table(katakana,true);
    }
}