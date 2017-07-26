import Widget from "./Widget";

class SimpleWidget extends Widget {
	constructor(id, type, borderWidth, borderColor, textColor, ticketList = []) {
		super(id, type, borderWidth, borderColor, textColor, ticketList);
	}

	toString() {
		return this._type.GetGraphic(this.CalculatePercent());
	}
}

export default SimpleWidget;
