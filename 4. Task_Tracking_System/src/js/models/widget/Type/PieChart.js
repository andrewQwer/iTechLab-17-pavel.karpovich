import WidgetType from "./WidgetType";
import Chartist from "../../../../../node_modules/chartist/dist/chartist.min";

class PieChart extends WidgetType {
	GetType() {
		return "PieChart";
	}

	GetGraphic(div, percents) {
		return new Chartist.Pie(div, {
			labels: [
				percents.openPercent != 0
					? `Open ${Math.round(percents.openPercent)}%`
					: " ",
				percents.closedPercent != 0
					? `Closed ${Math.round(percents.closedPercent)}%`
					: " ",
				percents.inProgressPercent != 0
					? `InProgress ${Math.round(percents.inProgressPercent)}%`
					: " "
			],
			series: [
				percents.openPercent,
				percents.closedPercent,
				percents.inProgressPercent
			]
		});
	}
}

export default PieChart;
