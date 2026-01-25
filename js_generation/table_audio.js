// table_audio.js - Логика работы с аудио для таблиц каны
// Использует константы из const.js

// Кэш для проверки существования файлов
const audioFileCache = new Map();

// Проверка существования файла с кэшированием
async function checkAudioFileExists(audioFile) {
    if (!audioFile) return false;
    
    if (audioFileCache.has(audioFile)) {
        return audioFileCache.get(audioFile);
    }
    
    try {
        const response = await fetch(audioFile, { method: 'HEAD' });
        const exists = response.ok;
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
    
    if (kanaType === KANA_TYPES.HIRAGANA) {
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
    } else if (kanaType === KANA_TYPES.KATAKANA) {
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
        main: `${PATHS.audio}${katakanaChar}_${hiraganaChar}.mp3`,
        alt: `${PATHS.audio}${katakanaChar}_${hiraganaChar}1.mp3`
    };
}

// Функция воспроизведения аудио файла
function playAudioFile(audioFile) {
    if (!audioFile) return false;
    
    try {
        const audio = new Audio(audioFile);
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(() => false);
        }
        return true;
    } catch (error) {
        return false;
    }
}

// Создание элемента аудио для ячейки таблицы
async function createAudioElement(kanaChar, kanaType) {
    if (!kanaChar || kanaChar.trim() === '') return null;
    
    const audioFiles = findAudioFilesForKana(kanaChar, kanaType);
    
    const [mainExists, altExists] = await Promise.all([
        checkAudioFileExists(audioFiles.main),
        checkAudioFileExists(audioFiles.alt)
    ]);
    
    if (!mainExists && !altExists) return null;
    
    const container = createElement('div', {
        className: 'kana-audio-container'
    });
    
    if (mainExists) {
        const mainBtn = createElement('button', {
            className: 'kana-audio-btn',
            title: `Произношение ${kanaChar}`
        });
        
        const mainIcon = createElement('img', {
            className: 'kana-audio-icon',
            src: `${PATHS.img}fan.png`,
            alt: 'Аудио'
        });
        mainBtn.appendChild(mainIcon);
        
        mainBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            playAudioFile(audioFiles.main);
        });
        
        container.appendChild(mainBtn);
    }
    
    if (altExists) {
        const altBtn = createElement('button', {
            className: 'kana-audio-btn',
            title: `Альтернативное произношение ${kanaChar}`
        });
        
        const altIcon = createElement('img', {
            className: 'kana-audio-icon',
            src: `${PATHS.img}helmet.png`,
            alt: 'Аудио 1'
        });
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

// Экспорт функций
if (typeof window !== 'undefined') {
    window.checkAudioFileExists = checkAudioFileExists;
    window.findAudioFilesForKana = findAudioFilesForKana;
    window.playAudioFile = playAudioFile;
    window.createAudioElement = createAudioElement;
}