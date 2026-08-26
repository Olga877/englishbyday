// js/form.js

(function() {
    const form = document.getElementById('leadForm');

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
            source: 'dailyenglish.ru'
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

        // 3. Здесь будет реальная отправка (Telegram + Google Sheets)
        // Сейчас — демо-заглушка
        console.log('📩 Заявка:', data);
        alert('✅ Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
        form.reset();

        // 4. Уменьшаем счётчик мест (для демонстрации)
        const spotsEl = document.getElementById('spotsCount');
        let current = parseInt(spotsEl.textContent, 10);
        if (current > 0) {
            spotsEl.textContent = current - 1;
        }
    });

    console.log('✅ Лендинг dailyenglish.ru загружен');
})();