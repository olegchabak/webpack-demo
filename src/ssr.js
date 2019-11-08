const React = require("react");
const ReactDom = require("react-dom");

const SSR = <div onClick = { ()=> alert("Hello") }>Hello world</div>;

// Рендеринг только в браузере, экспорт в противном случае
if (typeof  document === "undefined") {
	module.exports = SSR;
} else {
	ReactDOM.hydrate(SSR, document.getElementById("app"));
}