import "jquery";
import "bootstrap/dist/js/bootstrap";
import UI from "./js/controllers/UI/UI";

(function() {
	try {
		new UI();
	} catch (exception) {
		alert(exception);
		return;
	}
})();
