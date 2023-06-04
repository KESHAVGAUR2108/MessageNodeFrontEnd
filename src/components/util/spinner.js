const loader = document.querySelector("#spinner");

exports.showSpinner = () => {
	const { width, height } = window.screen;

	loader.setAttribute(
		"style",
		`width:${width}px;height:${height}px;background-color:#00000042`
	);
	loader.innerHTML = `<div class="spinner-border" role="status"></div>`;
};

exports.hideSpinner = () => {
	loader.innerHTML = "";
	loader.removeAttribute("style");
};
