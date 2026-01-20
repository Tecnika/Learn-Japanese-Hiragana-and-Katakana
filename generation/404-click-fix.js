// generation/404-click.js - гарантированная работа кликов
function setupCardClicks() {
    const grid = document.getElementById('random-kana-grid');
    if (!grid) return;
    
    // Удаляем старые обработчики
    grid.replaceWith(grid.cloneNode(true));
    
    // Новый обработчик
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