import WidgetType from "./WidgetType";
import Chartist from "../../../../../node_modules/chartist/dist/chartist.min";

class BarChart extends WidgetType {
	GetType() {
		return "BarChart";
	}

	GetGraphic(div, percents) {
		return new Chartist.Bar(div, {
				labels: ["Open", "Closed", "InProgress"],
				series: [[percents.openPercent, percents.closedPercent, percents.inProgressPercent]]
			});
	}
}

export default BarChart;
