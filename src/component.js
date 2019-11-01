export default (text = "Hello world")=> {
	const element = document.createElement("div");
	element.classList.add('pure-button', 'test');
	element.innerHTML = text;
	return element;
}

