// Modal loader for paikka pages
async function openModal(url) {
	try {
		const res = await fetch(url);
		const text = await res.text();
		const parser = new DOMParser();
		const doc = parser.parseFromString(text, 'text/html');
		const bodyContent = doc.querySelector('body') ? doc.querySelector('body').innerHTML : text;
		document.getElementById('modal-body').innerHTML = bodyContent;
		const modal = document.getElementById('modal');
		modal.classList.add('open');
		modal.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
	} catch (err) {
		console.error('Failed to load page:', err);
	}
}

function closeModal() {
	const modal = document.getElementById('modal');
	modal.classList.remove('open');
	modal.setAttribute('aria-hidden', 'true');
	document.getElementById('modal-body').innerHTML = '';
	document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
	const openBtn = document.getElementById('paikka1-btn');
	if (openBtn) {
		openBtn.addEventListener('click', () => openModal('paikka1.html'));
	}

	const closeBtn = document.getElementById('modal-close');
	if (closeBtn) closeBtn.addEventListener('click', closeModal);

	const backdrop = document.getElementById('modal-backdrop');
	if (backdrop) backdrop.addEventListener('click', closeModal);
});
