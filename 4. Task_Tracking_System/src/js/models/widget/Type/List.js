import WidgetType from "./WidgetType";

class List extends WidgetType {
	GetType() {
		return "List";
	}

	GetGraphic(div, percents) {
		return $(div).append(`<li>
							Type: ${this.GetType()}, 
							Count: <span class="widget__item">${Math.round(percents.count)}</span>, 
							Open: <span class="widget__item">${Math.round(percents.openPercent)}%</span>, 
							Closed: <span class="widget__item">${Math.round(percents.closedPercent)}%</span>, 
							InProgress: <span class="widget__item">${Math.round(percents.inProgressPercent)}%</span>
						</li>`);
	}
}

export default List;
