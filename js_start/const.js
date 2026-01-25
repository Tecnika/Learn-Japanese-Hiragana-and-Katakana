// ================================
// ГЛОБАЛЬНЫЕ КОНСТАНТЫ ПРОЕКТА
// ================================

// Основные константы разметки
const enter = '<br>';
const name_table = ['Основная таблица', 'Дополнительная таблица', 'Йотированные', 'Для обозначения дополнительных звуков'];

// В const.js добавляем в раздел PATHS:

const PATHS = {
    audio: './mp3/kana/',
    img: './img/',
    js: {
        start: './js_start/',
        generation: './js_generation/'
    },
    style: './style/',
    favicon: './img/favicon.ico',
    svg: {
        hiragana: './img/hiragana/',
        katakana: './img/katakana/'
    }
};

// В DEFAULT_STYLES
const DEFAULT_STYLES = [
    'default.css',
    'menu.css',        
    'start.css',
    'propisi_for_memoring.css',
    'propisi_kana.css',
    'adaptive.css',
    'table.css',
    '404.css'
];
const DEFAULT_JS = [
  'table', 'propisi_for_memoring', 'table_audio', 'propisi_kana'
];
// Настройки по умолчанию
const DEFAULT_SETTINGS = {
    table: {
        showHiragana: true,
        showKatakana: true,
        showMain: true,
        showExpand: true,
        showIotated: true,
        showForeign: false,
        language: 'ru',
        showTranscription: true,
        showAudio: false
    },
    propisi: {
        linesCount: 5,
        pairsCount: 10,
        includeHiragana: true,
        includeKatakana: false,
        includeMain: true,
        includeExpand: false,
        includeIotated: false,
        includeForeign: false,
        kanaType: 'hiragana+katakana',
        category: 'extended'
    },
    propisi_kana: {
        kanaType: 'hiragana',
        rows: 5,
        columns: 5,
        showHints: true,
        showSample: true,
        selectedSymbols: [],
        tableMode: 'compact'
    }
};

// Цветовая палитра
const COLORS = {
    primary: '#4a5568',
    secondary: '#718096',
    accent: '#9f7aea',
    success: '#48bb78',
    warning: '#ed8936',
    error: '#f56565',
    hiragana: '#4299e1',
    katakana: '#f56565',
    background: '#f7fafc',
    lightGray: '#e2e8f0',
    darkGray: '#2d3748'
};

// Тексты интерфейса
const UI_TEXTS = {
    ru: {
        welcome: 'Добро пожаловать в мир японского языка!',
        welcomeJp: 'ようこそ日本語の世界へ！',
        features: 'Что можно делать на сайте:',
        tableCard: '🔤 Таблица каны',
        propisiCard: '📝 Прописи для запоминания каны',
        propisiKanaCard: '✍️ Прописи каны',
        readingCard: '📖 Чтение',
        cta: '🎌 <strong>Готовы начать?</strong> Выберите нужный инструмент выше и приступайте к изучению!<br>がんばってください！(Удачи!)',
        error404: 'Страница не найдена',
        jp404: 'ページが見つかりません',
        errorMessage: 'Кажется, вы пытаетесь найти страницу, которой не существует.<br>Возможно, она была перемещена или удалена.',
        kanaPractice: 'Тренируйте японскую кану:',
        kanaHint: 'Кликните на карточку, чтобы перевернуть её и увидеть перевод.<br><small style="font-size: 0.9rem; opacity: 0.8;">Синие — хирагана, красные — катакана</small>',
        loading: 'Загрузка...',
        generating: 'Генерация...'
    },
    en: {
        welcome: 'Welcome to the world of Japanese language!',
        welcomeJp: 'ようこそ日本語の世界へ！',
        features: 'What you can do on the site:',
        tableCard: '🔤 Kana Table',
        propisiCard: '📝 Copybooks for memorizing kana',
        propisiKanaCard: '✍️ Kana Copybooks',
        readingCard: '📖 Reading',
        cta: '🎌 <strong>Ready to start?</strong> Choose the tool above and start learning!<br>がんばってください！(Good luck!)',
        error404: 'Page not found',
        jp404: 'ページが見つかりません',
        errorMessage: 'It seems you are trying to find a page that does not exist.<br>It might have been moved or deleted.',
        kanaPractice: 'Practice Japanese kana:',
        kanaHint: 'Click on a card to flip it and see the translation.<br><small style="font-size: 0.9rem; opacity: 0.8;">Blue — hiragana, red — katakana</small>',
        loading: 'Loading...',
        generating: 'Generating...'
    }
};

// Типы каны
const KANA_TYPES = {
    HIRAGANA: 'hiragana',
    KATAKANA: 'katakana',
    BOTH: 'both',
    ROMANJI: 'romandzi',
    HYBRID: 'gibrid'
};

// Категории символов
const KANA_CATEGORIES = {
    MAIN: 'main',
    EXPAND: 'expand',
    IOTATED: 'iotated',
    FOREIGN: 'for_forgein'
};

// ================================
// ДАННЫЕ КАНЫ
// ================================

// Хирагана
const hiragana = {
    main: [
        ['あ', 'い', 'う', 'え', 'お'],
        ['か', 'き', 'く', 'け', 'こ'],
        ['さ', 'し', 'す', 'せ', 'そ'],
        ['た', 'ち', 'つ', 'て', 'と'],
        ['な', 'に', 'ぬ', 'ね', 'の'],
        ['は', 'ひ', 'ふ', 'へ', 'ほ'],
        ['ま', 'み', 'む', 'め', 'も'],
        ['ら', 'り', 'る', 'れ', 'ろ'],
        ['や', '', 'ゆ', '', 'よ'],
        ['わ', '', 'を', '', 'ん']
    ],
    expand: [
        ['が', 'ぎ', 'ぐ', 'げ', 'ご'],
        ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'],
        ['だ', 'ぢ', 'づ', 'で', 'ど'],
        ['ば', 'び', 'ぶ', 'べ', 'ぼ'],
        ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ']
    ],
    iotated: [
        ['きゃ', 'きゅ', 'きょ'],
        ['ぎゃ', 'ぎゅ', 'ぎょ'],
        ['しゃ', 'しゅ', 'しょ'],
        ['じゃ', 'じゅ', 'じょ'],
        ['ちゃ', 'ちゅ', 'ちょ'],
        ['にゃ', 'にゅ', 'にょ'],
        ['ひゃ', 'ひゅ', 'ひょ'],
        ['びゃ', 'びゅ', 'びょ'],
        ['ぴゃ', 'ぴゅ', 'ぴょ'],
        ['みゃ', 'みゅ', 'みょ'],
        ['りゃ', 'りゅ', 'りょ'],
    ]
};

// Катакана
const katakana = {
    main: [
        ['ア', 'イ', 'ウ', 'エ', 'オ'],
        ['カ', 'キ', 'ク', 'ケ', 'コ'],
        ['サ', 'シ', 'ス', 'セ', 'ソ'],
        ['タ', 'チ', 'ツ', 'テ', 'ト'],
        ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
        ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
        ['マ', 'ミ', 'ム', 'メ', 'モ'],
        ['ラ', 'リ', 'ル', 'レ', 'ロ'],
        ['ヤ', '', 'ユ', '', 'ヨ'],
        ['ワ', '', 'ヲ', '', 'ン']
    ],
    expand: [
        ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ'],
        ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'],
        ['ダ', 'ヂ', 'ヅ', 'デ', 'ド'],
        ['バ', 'ビ', 'ブ', 'ベ', 'ボ'],
        ['パ', 'ピ', 'プ', 'ペ', 'ポ']
    ],
    iotated: [
        ['キャ', 'キュ', 'キョ'],
        ['ギャ', 'ギュ', 'ギョ'],
        ['シャ', 'シュ', 'ショ'],
        ['ジャ', 'ジュ', 'ジョ'],
        ['チャ', 'チュ', 'チョ'],
        ['ニャ', 'ニュ', 'ニョ'],
        ['ヒャ', 'ヒュ', 'ヒョ'],
        ['ビャ', 'ビュ', 'ビョ'],
        ['ピャ', 'ピュ', 'ピョ'],
        ['ミャ', 'ミュ', 'ミョ']
    ],
    for_forgein: [
        ['シェ', 'ジェ', 'チェ', 'ヂェ', ''],
        ['イェ', 'スィ', 'ズィ', 'リェ', ''],
        ['ティ', 'トゥ', 'テャ', 'テュ', 'テョ'],
        ['ディ', 'ドゥ', 'デャ', 'デュ', 'デョ'],
        ['ツァ', 'ツィ', '', 'ツェ', 'ツォ'],
        ['ファ', 'フィ', 'ホゥ', 'フェ', 'フォ'],
        ['フャ', 'フュ', 'フョ', '', ''],
        ['ヴァ', 'ヴィ', 'ヴ', 'ヴェ', 'ヴォ'],
        ['ヴャ', 'ヴュ', 'ヴョ', '', ''],
        ['ウァ', 'ウィ', '', 'ウェ', 'ウォ'],
        ['ウャ', 'ウュ', 'ウョ', '', ''],
        ['クァ', 'クィ', 'クゥ', 'クェ', 'クォ'],
        ['グァ', 'グィ', 'グゥ', 'グェ', 'グォ']
    ]
};

// Русская транскрипция
const Kana_ru = {
    main: [
        ['А', 'И', 'У', 'Э', 'О'],
        ['КА', 'КИ', 'КУ', 'КЭ', 'КО'],
        ['СА', 'СИ', 'СУ', 'СЭ', 'СО'],
        ['ТА', 'ТИ', 'ЦУ', 'ТЭ', 'ТО'],
        ['НА', 'НИ', 'НУ', 'НЭ', 'НО'],
        ['ХА', 'ХИ', 'ФУ', 'ХЭ', 'ХО'],
        ['МА', 'МИ', 'МУ', 'МЭ', 'МО'],
        ['РА', 'РИ', 'РУ', 'РЭ', 'РО'],
        ['Я', '', 'Ю', '', 'Ё'],
        ['ВА', '', 'ВО', '', 'Н']
    ],
    expand: [
        ['ГА', 'ГИ', 'ГУ', 'ГЭ', 'ГО'],
        ['(Д)ЗА', '(Д)ЗИ', '(Д)ЗУ', '(Д)ЗЭ', '(Д)ЗО'],
        ['ДА', 'ДЗИ', 'ДЗУ', 'ДЭ', 'ДО'],
        ['БА', 'БИ', 'БУ', 'БЭ', 'БО'],
        ['ПА', 'ПИ', 'ПУ', 'ПЭ', 'ПО']
    ],
    iotated: [
        ['КЯ', 'КЮ', 'КЁ'],
        ['ГЯ', 'ГЮ', 'ГЁ'],
        ['СЯ', 'СЮ', 'СЁ'],
        ['ДЗЯ', 'ДЗЮ', 'ДЗЁ'],
        ['ТЯ', 'ТЮ', 'ТЁ'],
        ['НЯ', 'НЮ', 'НЁ'],
        ['ХЯ', 'ХЮ', 'ХЁ'],
        ['БЯ', 'БЮ', 'БЁ'],
        ['ПЯ', 'ПЮ', 'ПЁ'],
        ['МЯ', 'МЮ', 'МЁ'],
        ['РЯ', 'РЮ', 'РЁ']
    ],
    for_forgein: [
        ['Шэ', 'Джэ', 'Чэ', 'Джэ', ''],
        ['Э', 'Си', 'Дзи (Зи)', 'Рэ', ''],
        ['Ти', 'Ту', 'Тя', 'Тю', 'Тё'],
        ['Ди', 'Ду', 'Дя', 'Дю', 'Дё'],
        ['Ца', 'Ци', '', 'Це', 'Цо'],
        ['Фа', 'Фи', 'Ху', 'Фе', 'Фо'],
        ['Фя', 'Фю', 'Фё', '', ''],
        ['Ва', 'Ви', 'Ву', 'Вэ', 'Во'],
        ['Вя', 'Вю', 'Вё', '', ''],
        ['Ва', 'Ви', '', 'Вэ', 'Во'],
        ['Вя', 'Вю', 'Вё', '', ''],
        ['Ква', 'Кви', 'Кву', 'Кве', 'Кво'],
        ['Гва', 'Гви', 'Гву', 'Гве', 'Гво'],
    ]
};

// Английская транскрипция (ромадзи)
const Kana_en = {
    main: [
        ['a', 'i', 'u', 'e', 'o'],
        ['ka', 'ki', 'ku', 'ke', 'ko'],
        ['sa', 'shi', 'su', 'se', 'so'],
        ['ta', 'chi', 'tsu', 'te', 'to'],
        ['na', 'ni', 'nu', 'ne', 'no'],
        ['ha', 'hi', 'fu', 'he', 'ho'],
        ['ma', 'mi', 'mu', 'me', 'mo'],
        ['ra', 'ri', 'ru', 're', 'ro'],
        ['ya', '', 'yu', '', 'yo'],
        ['wa', '', 'wo', '', 'n']
    ],
    expand: [
        ['ga', 'gi', 'gu', 'ge', 'go'],
        ['za', 'ji', 'zu', 'ze', 'zo'],
        ['da', 'ji', 'zu', 'de', 'do'],
        ['ba', 'bi', 'bu', 'be', 'bo'],
        ['pa', 'pi', 'pu', 'pe', 'po']
    ],
    iotated: [
        ['kya', 'kyu', 'kyo'],
        ['gya', 'gyu', 'gyo'],
        ['sha', 'shu', 'shyo'],
        ['jya', 'jyu', 'jyo'],
        ['cha', 'chu', 'cho'],
        ['nya', 'nyu', 'nyo'],
        ['hya', 'hyu', 'hyo'],
        ['bya', 'byu', 'byo'],
        ['pya', 'pyu', 'pyo'],
        ['mya', 'myu', 'myo'],
        ['rya', 'ryu', 'ryo']
    ],
    for_forgein: [
        ['she', 'je', 'che', 'dje', ''],
        ['e', 'si', 'zi', 're', ''],
        ['ti', 'tu', 'tya', 'tyu', 'tyo'],
        ['di', 'du', 'dya', 'dyu', 'dyo'],
        ['tsa', 'tsi', '', 'tse', 'tso'],
        ['fa', 'fi', 'hu', 'fe', 'fo'],
        ['fya', 'fyu', 'fyo', '', ''],
        ['va', 'vi', 'vu', 've', 'vo'],
        ['vya', 'vyu', 'vyo', '', ''],
        ['wa', 'wi', '', 'we', 'wo'],
        ['wya', 'wyu', 'wyo', '', ''],
        ['kwa', 'kwi', 'kwu', 'kwe', 'kwo'],
        ['gwa', 'gwi', 'gwu', 'gwe', 'gwo']
    ]
};

// ================================
// СТАТУСЫ И СОСТОЯНИЯ
// ================================

// Кэш для аудио файлов
const AUDIO_CACHE = new Map();

// Глобальное состояние приложения
window.APP_STATE = {
    currentScreen: 'start',
    language: 'ru',
    isDarkMode: false,
    userProgress: {},
    lastVisited: {},
    audioEnabled: false
};

// История навигации
window.NAVIGATION_HISTORY = [];

// Глобальные обработчики
window.GLOBAL_EVENT_LISTENERS = [];

