export default (text = "Hello world")=> {
	const element = document.createElement("div");
	element.classList.add('container');
	element.innerHTML = text;
	return element;
}

