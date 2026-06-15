document.querySelectorAll('.card[data-action], .card[data-target]').forEach((card) => {
    card.addEventListener('click', () => {
        const action = card.dataset.action;
        const targetSelector = card.dataset.target;

        if (action) {
            window.location.href = action;
            return;
        }

        if (targetSelector) {
            const target = document.querySelector(targetSelector);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

