// js/form.js

(function() {
    const form = document.getElementById('leadForm');

    // ===== НАСТРОЙКИ (только Telegram) =====
    const TELEGRAM_BOT_TOKEN = '8662203342:AAHzwrqSmUwBCFX1Fpt2--CzhNHDoIaLmTc';
    const TELEGRAM_CHAT_ID = '5182226694';

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // 1. Собираем данные
        const data = {
            child_name: document.getElementById('child_name').value.trim(),
            grade: document.getElementById('grade').value,
            parent_email: document.getElementById('parent_email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            time: document.getElementById('time').value,
            consent: document.getElementById('consent').checked,
            source: 'englishbyday.ru'
        };

        // 2. Валидация
        if (!data.child_name || !data.parent_email || !data.phone) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }
        if (!data.consent) {
            alert('Необходимо согласие на обработку персональных данных.');
            return;
        }

        // 3. Отправка в Telegram
        const message = `
📩 Новая заявка!
👶 Имя: ${data.child_name}
📚 Класс: ${data.grade}
📧 Email: ${data.parent_email}
📱 Телефон: ${data.phone}
🕐 Время: ${data.time}
🌐 Источник: ${data.source}
`;

        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        })
        .then(response => {
            if (response.ok) {
                alert('✅ Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
                form.reset();
                // Уменьшаем счётчик мест
                const spotsEl = document.getElementById('spotsCount');
                let current = parseInt(spotsEl.textContent, 10);
                if (current > 0) {
                    spotsEl.textContent = current - 1;
                }
            } else {
                alert('❌ Произошла ошибка при отправке. Попробуйте ещё раз или свяжитесь с нами напрямую.');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('❌ Ошибка соединения. Проверьте интернет и попробуйте снова.');
        });
    });

    console.log('✅ Лендинг englishbyday.ru загружен');
})();