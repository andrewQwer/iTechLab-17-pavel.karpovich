import IObserver from "../../models/observer/IObserver";
import WidgetController from "../WidgetController";
import SimpleWidget from "../../models/widget/SimpleWidget";
import UI from "./UI";

let instance;
let widgetId = 0;

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
			borderColor: $borderColorInput.val(),
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
		$showWidgetMenuButton.click(() => UI.ShowBlackout("widget"));
		$addNewWidgetButton.click(() => this.AddNewWidget());
		$clearWidgetButton.click(() => this.ClearWidgetMenu());
	}

	ClearWidgetMenu() {
		UI.HideBlackout();
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
		$widgetList.empty();
		for (let i = 0; i < this._widgetController.Widgets.length; i++) {
			let $current = this._widgetController.Widgets[i];
			$widgetList.append(`<li id="widget${i}"></li>`).children().last().attr({
				style: `border-color: ${$current.BorderColor};
				border-width: ${$current.BorderWidth}px;
				border-style:solid`
			});
			this._widgetController.Widgets[i]
				.toString(`#widget${i}`)
				.on("draw", context => {
					// fill label
					if (context.type == "label") {
						context.element.attr({
							style: `fill: ${$current.TextColor}; color: ${$current.TextColor};`
						});
					}
				});
			if ($current.Type === "List")
				$(`#widget${i} .widget__item`).css({ color: `${$current.TextColor}` });
		}
	}
}

export default WidgetUIController;
