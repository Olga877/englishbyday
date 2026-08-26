// js/form.js

(function() {
    const form = document.getElementById('leadForm');

    // ===== НАСТРОЙКИ =====
    const FORMSPREE_URL = 'https://formspree.io/f/mnpaerog'; // замените на ваш URL

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Собираем данные
        const data = {
            child_name: document.getElementById('child_name').value.trim(),
            grade: document.getElementById('grade').value,
            parent_email: document.getElementById('parent_email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            time: document.getElementById('time').value,
            consent: document.getElementById('consent').checked,
            source: 'englishbyday.ru'
        };

        // Валидация
        if (!data.child_name || !data.parent_email || !data.phone) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }
        if (!data.consent) {
            alert('Необходимо согласие на обработку персональных данных.');
            return;
        }

        // Отправка через Formspree
        fetch(FORMSPREE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert('✅ Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
                form.reset();
                const spotsEl = document.getElementById('spotsCount');
                let current = parseInt(spotsEl.textContent, 10);
                if (current > 0) {
                    spotsEl.textContent = current - 1;
                }
            } else {
                alert('❌ Произошла ошибка. Попробуйте ещё раз.');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('❌ Ошибка соединения. Проверьте интернет и попробуйте снова.');
        });
    });

    console.log('✅ Лендинг englishbyday.ru загружен');
})();