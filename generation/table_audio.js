// table_audio.js - Логика работы с аудио для таблиц каны

const AUDIO_FOLDER = './mp3/kana/';

// Кэш для проверки существования файлов (чтобы не проверять много раз)
const audioFileCache = new Map();

// Проверка существования файла с кэшированием
async function checkAudioFileExists(audioFile) {
    if (!audioFile) return false;
    
    // Проверяем кэш
    if (audioFileCache.has(audioFile)) {
        return audioFileCache.get(audioFile);
    }
    
    try {
        const response = await fetch(audioFile, { method: 'HEAD' });
        const exists = response.ok;
        
        // Сохраняем в кэш
        audioFileCache.set(audioFile, exists);
        return exists;
    } catch (error) {
        audioFileCache.set(audioFile, false);
        return false;
    }
}

// Функция для поиска аудио файлов по символу каны
function findAudioFilesForKana(kanaChar, kanaType) {
    if (!kanaChar || kanaChar.trim() === '') return { main: null, alt: null };
    
    let katakanaChar = kanaChar;
    let hiraganaChar = kanaChar;
    
    if (kanaType === 'hiragana') {
        // Для хираганы ищем катакану
        for (let chapter in hiragana) {
            const hiraData = hiragana[chapter];
            const kataData = katakana[chapter];
            
            if (!hiraData || !kataData) continue;
            
            for (let i = 0; i < hiraData.length; i++) {
                for (let j = 0; j < hiraData[i].length; j++) {
                    if (hiraData[i][j] === kanaChar && kataData[i] && kataData[i][j] && kataData[i][j].trim() !== '') {
                        katakanaChar = kataData[i][j];
                        break;
                    }
                }
                if (katakanaChar !== kanaChar) break;
            }
            if (katakanaChar !== kanaChar) break;
        }
    } else if (kanaType === 'katakana') {
        // Для катаканы ищем хирагану
        for (let chapter in katakana) {
            const kataData = katakana[chapter];
            const hiraData = hiragana[chapter];
            
            if (!kataData || !hiraData) continue;
            
            for (let i = 0; i < kataData.length; i++) {
                for (let j = 0; j < kataData[i].length; j++) {
                    if (kataData[i][j] === kanaChar && hiraData[i] && hiraData[i][j] && hiraData[i][j].trim() !== '') {
                        hiraganaChar = hiraData[i][j];
                        break;
                    }
                }
                if (hiraganaChar !== kanaChar) break;
            }
            if (hiraganaChar !== kanaChar) break;
        }
    }
    
    return {
        main: `${AUDIO_FOLDER}${katakanaChar}_${hiraganaChar}.mp3`,
        alt: `${AUDIO_FOLDER}${katakanaChar}_${hiraganaChar}1.mp3`
    };
}

// Функция воспроизведения аудио файла
function playAudioFile(audioFile) {
    if (!audioFile) return false;
    
    try {
        const audio = new Audio(audioFile);
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                return false;
            });
        }
        return true;
    } catch (error) {
        return false;
    }
}

// Создание элемента аудио для ячейки таблицы (ПРОВЕРЯЕТ СУЩЕСТВОВАНИЕ)
async function createAudioElement(kanaChar, kanaType) {
    if (!kanaChar || kanaChar.trim() === '') return null;
    
    // Получаем аудио файлы
    const audioFiles = findAudioFilesForKana(kanaChar, kanaType);
    
    // Проверяем существование файлов
    const [mainExists, altExists] = await Promise.all([
        checkAudioFileExists(audioFiles.main),
        checkAudioFileExists(audioFiles.alt)
    ]);
    
    // Если ни одного файла нет - возвращаем null
    if (!mainExists && !altExists) {
        return null;
    }
    
    // Создаем контейнер для кнопок аудио
    const container = document.createElement('div');
    container.className = 'kana-audio-container';
    
    // Основная кнопка (только если файл существует)
    if (mainExists) {
        const mainBtn = document.createElement('button');
        mainBtn.className = 'kana-audio-btn';
        mainBtn.title = `Произношение ${kanaChar}`;
        
        const mainIcon = document.createElement('img');
        mainIcon.className = 'kana-audio-icon';
        mainIcon.src = './img/fan.png';
        mainIcon.alt = 'Аудио';
        mainBtn.appendChild(mainIcon);
        
        mainBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            playAudioFile(audioFiles.main);
        });
        
        container.appendChild(mainBtn);
    }
    
    // Альтернативная кнопка (только если файл существует)
    if (altExists) {
        const altBtn = document.createElement('button');
        altBtn.className = 'kana-audio-btn';
        altBtn.title = `Альтернативное произношение ${kanaChar}`;
        
        const altIcon = document.createElement('img');
        altIcon.className = 'kana-audio-icon';
        altIcon.src = './img/helmet.png';
        altIcon.alt = 'Аудио 1';
        altBtn.appendChild(altIcon);
        
        altBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            playAudioFile(audioFiles.alt);
        });
        
        container.appendChild(altBtn);
    }
    
    return container;
}

// Оптимизированная версия: создает кнопки сразу, проверяет при клике
async function createAudioElementOptimized(kanaChar, kanaType) {
    if (!kanaChar || kanaChar.trim() === '') return null;
    
    // Получаем аудио файлы
    const audioFiles = findAudioFilesForKana(kanaChar, kanaType);
    
    // Создаем контейнер для кнопок аудио
    const container = document.createElement('div');
    container.className = 'kana-audio-container';
    
    // Создаем функции для проверки при клике
    const createButton = (audioFile, title, iconSrc) => {
        const btn = document.createElement('button');
        btn.className = 'kana-audio-btn';
        btn.title = title;
        
        const icon = document.createElement('img');
        icon.className = 'kana-audio-icon';
        icon.src = iconSrc;
        icon.alt = 'Аудио';
        btn.appendChild(icon);
        
        btn.addEventListener('click', async function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            // Проверяем существование файла при клике
            const exists = await checkAudioFileExists(audioFile);
            if (!exists) {
                // Если файла нет, удаляем кнопку
                btn.remove();
                return;
            }
            
            // Воспроизводим если файл существует
            playAudioFile(audioFile);
        });
        
        return btn;
    };
    
    // Создаем обе кнопки (они проверят существование при клике)
    if (audioFiles.main) {
        container.appendChild(createButton(audioFiles.main, `Произношение ${kanaChar}`, './img/fan.png'));
    }
    
    if (audioFiles.alt) {
        container.appendChild(createButton(audioFiles.alt, `Альтернативное произношение ${kanaChar}`, './img/helmet.png'));
    }
    
    return container;
}

// Функция для массовой предзагрузки аудио файлов
async function preloadCommonAudioFiles() {
    console.log('Предзагрузка аудио файлов...');
    
    const commonKana = ['あ', 'い', 'う', 'え', 'お', 'ア', 'イ', 'ウ', 'エ', 'オ'];
    const results = {};
    
    for (const kana of commonKana) {
        const audioFiles = findAudioFilesForKana(kana, kana.includes('あ') ? 'hiragana' : 'katakana');
        results[kana] = {
            main: await checkAudioFileExists(audioFiles.main),
            alt: await checkAudioFileExists(audioFiles.alt)
        };
    }
    
    console.log('Результаты предзагрузки:', results);
    return results;
}