// js/form.js

(function() {
    const form = document.getElementById('leadForm');

    // ===== НАСТРОЙКИ (замените на свои) =====
    const TELEGRAM_BOT_TOKEN = '8662203342:AAHzwrqSmUwBCFX1Fpt2--CzhNHDoIaLmTc';   // получите у @BotFather
    const TELEGRAM_CHAT_ID = '5182226694';       // получите у @userinfobot
    // Если не используете Google Sheets, оставьте пустую строку
//    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbx_zNCGDWEYZkKR-oglKVybp87gNegHleD7eSmQNCB7XsfObEIKu9_X1gAnFPtRV8bi8w/exec'; // от Apps Script

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
        const sendToTelegram = () => {
            const message = `
📩 Новая заявка!
👶 Имя: ${data.child_name}
📚 Класс: ${data.grade}
📧 Email: ${data.parent_email}
📱 Телефон: ${data.phone}
🕐 Время: ${data.time}
🌐 Источник: ${data.source}
`;
            return fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            });
        };

        // 4. Отправка в Google Sheets (если URL указан)
        const sendToSheets = () => {
            if (!GOOGLE_SHEETS_URL || GOOGLE_SHEETS_URL === 'URL_ВАШЕГО_ВЕБ-ПРИЛОЖЕНИЯ') {
                return Promise.resolve(); // пропускаем, если не настроено
            }
            return fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        };

        // 5. Выполняем обе отправки параллельно
        Promise.all([sendToTelegram(), sendToSheets()])
            .then(responses => {
                // Проверяем, что все ответы успешны
                const allOk = responses.every(res => res && res.ok);
                if (allOk) {
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