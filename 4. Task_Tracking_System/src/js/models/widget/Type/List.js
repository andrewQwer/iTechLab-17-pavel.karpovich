import WidgetType from "./WidgetType";
import CanvasJS from "../../../../../node_modules/canvasjs/dist/canvasjs.min";


class List extends WidgetType {
	GetType() {
		return "List";
	}

	GetGraphic(percents) {
		return `<li>
							type: ${this.GetType()} 
							count: ${percents.count} 
							open: ${percents.openPercent}% 
							closed: ${percents.closedPercent}% 
							inProgress: ${percents.inProgressPercent}%
						</li>`
	}
}

export default List;
