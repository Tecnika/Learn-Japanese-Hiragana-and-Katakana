// generation/404-click-fix.js - гарантированная работа кликов
// Использует функции из function.js

function setupCardClicks() {
    const grid = document.getElementById('random-kana-grid');
    if (!grid) return;
    
    // Удаляем старые обработчики через клонирование
    const newGrid = grid.cloneNode(true);
    grid.parentNode.replaceChild(newGrid, grid);
    
    // Устанавливаем новый обработчик делегирования
    document.getElementById('random-kana-grid').addEventListener('click', function(e) {
        const card = e.target.closest('.kana-card');
        if (card) {
            card.classList.toggle('flipped');
        }
    });
    
    console.log('Обработчики кликов установлены');
}

// Запускаем после загрузки и после каждой генерации
document.addEventListener('DOMContentLoaded', setupCardClicks);
window.addEventListener('load', setupCardClicks);

// Перехватываем оригинальную функцию
const originalGenerate = window.generateRandomKana;
if (originalGenerate) {
    window.generateRandomKana = function() {
        originalGenerate();
        setTimeout(setupCardClicks, 100);
    };
}

// Экспорт функции
if (typeof window !== 'undefined') {
    window.setupCardClicks = setupCardClicks;
}