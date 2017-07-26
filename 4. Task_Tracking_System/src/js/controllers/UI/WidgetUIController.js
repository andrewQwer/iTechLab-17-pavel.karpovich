import IObserver from "../../models/observer/IObserver";
import WidgetController from "../WidgetController";
import SimpleWidget from "../../models/widget/SimpleWidget";

let instance;
let widgetId = 0;

let $addWidgetMenu = $("#addWidgetMenu");
let $showWidgetMenuButton = $("#showWidgetMenuButton");
let $addNewWidgetButton = $("#addNewWidgetButton");
let $clearWidgetButton = $("#clearWidgetButton");
let $widgetTypeInput = $("#widgetTypeInput");
let $borderWidthInput = $("#borderWidthInput");
let $borderColorInput = $("#borderColorInput");
let $textColorInput = $("#textColorInput");
let $widgetList = $("#widgetList");

class WidgetUIController extends IObserver {
	constructor() {
		super();
		if (instance) {
			return instance;
		}
		instance = this;
		this._widgetController = new WidgetController();
		this.PlugEvent();
	}

	get WidgetMenuValue() {
		return {
			widgetType: $("#widgetTypeInput option:selected").val(),
			borderColor: $borderWidthInput.val(),
			borderWidth: $borderWidthInput.val(),
			textColor: $textColorInput.val()
		};
	}

	set WidgetMenuValue({ widgetType, borderColor, borderWidth, textColor }) {
		$widgetTypeInput.val(widgetType);
		$borderColorInput.val(borderColor);
		$borderWidthInput.val(borderWidth);
		$textColorInput.val(textColor);
	}

	PlugEvent() {
		//TODO show/hide widget menu
		$showWidgetMenuButton.click(() => console.log("showWidgetMenu!"));
		$addNewWidgetButton.click(() => this.AddNewWidget());
		$clearWidgetButton.click(() => this.ClearWidgetMenu());
	}

	ClearWidgetMenu() {
		this.WidgetMenuValue = {
			widgetType: "default",
			borderColor: "",
			borderWidth: "",
			textColor: ""
		};
	}

	AddNewWidget() {
		let widgetMenuValue = this.WidgetMenuValue;
		this._widgetController.Add(
			new SimpleWidget(
				widgetId++,
				widgetMenuValue.widgetType,
				widgetMenuValue.borderWidth,
				widgetMenuValue.borderColor,
				widgetMenuValue.textColor
			)
		);
	}

	Update() {
		let result = "";
		for(let item of this._widgetController.Widgets) {
			result += item.toString();
		}
		$widgetList.html(result);
	}
}

export default WidgetUIController;
