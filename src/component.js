export default (text = HELLO) => {
	const element = document.createElement("div");
	element.classList.add('pure-button', 'test');
	element.innerHTML = text;

	element.onclick = ()=> import('./lazy')
		.then(lazy => {element.textContent = lazy.default})
		.catch(err => {console.error(err)});

	return element;
}

