import Widget from "./Widget";

class SimpleWidget extends Widget {
	constructor(id, type, borderWidth, borderColor, textColor, ticketList = []) {
		super(id, type, borderWidth, borderColor, textColor, ticketList);
	}

	toString(div) {
		return this._type.GetGraphic(div, this.CalculatePercent());
	}
}

export default SimpleWidget;
