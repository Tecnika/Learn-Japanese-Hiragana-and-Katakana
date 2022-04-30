window.onload = function() {
    document.querySelector('#table_btn').onclick = function() {
        settings_table();
        //    create_settings_table();
    }


}

function create_settings_table() {
    let settings = document.querySelector('.setting');
    clear_content(settings);
    let set1 = document.createElement('input');
    set1.type = 'radio';
    set1.value = "hiragana";
    set1.name = 'variant';
    // console.log(set1);
    let set2 = document.createElement('input');
    set2.type = 'radio';
    set2.value = "katakana";
    set2.name = 'variant';
    // console.log(set2);
    // console.log(settings);
    settings.appendChild(set1);
    settings.append("Хирагана");
    settings.appendChild(set2);
    settings.append("Катакана");
}

function settings_table() {
    create_settings_table();
    document.querySelectorAll('input[name = "variant"]').forEach(element => {
        element.addEventListener('change', (event) => {
            let kana = event.target.value;

            if (kana === 'hiragana') {
                create_table(hiragana);

            } else
            if (kana === 'katakana') {
                create_table(katakana);
            }
        });
    })
}