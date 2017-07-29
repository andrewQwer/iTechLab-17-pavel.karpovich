import TicketUIController from "./TicketUIController";
import WidgetUIController from "./WidgetUIController";
import StartupInit from "../StartupInit";

let $blackout = $(".blackout");
let $blackoutBlock = $(".blackout__block");
let $blackoutWidget = $(".block__widget");
let $blackoutTicket = $(".block__ticket");
let delay = 500;

let instance;

class UI {
	constructor() {
		if(instance) {
			return instance;
		}
		instance = this;
		UI.HideBlackout();
		new TicketUIController();
		new WidgetUIController();
		this.PlugEvent();
		new StartupInit();
	}

	PlugEvent() {
		$blackout.click(() => UI.HideBlackout());
		$blackoutBlock.click(event => event.stopPropagation());
	}

	static HideBlackout() {
		$blackoutBlock.hide(delay);
		$blackoutTicket.hide(delay);
		$blackoutWidget.hide(delay);
		$blackout.hide(delay);
	}

	static ShowBlackout(block) {
		$blackout.show(delay);
		if (block === "widget") $blackoutWidget.show(delay);
		else $blackoutTicket.show(delay);
		$blackoutBlock.show();
	}
}

export default UI;
