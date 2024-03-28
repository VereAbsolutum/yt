var sortableClassList = [ 'border', 'border-3', 'border-warning', 'shadow', 'shadow-lg' ];

var sortable = new Sortable(document.getElementById('sortableGrid'), {
  animation: 150,
  ghostClass: 'sortable-ghost',
  chosenClass: 'sortable-chosen',
  dragClass: 'sortable-drag',
  multiDrag: true,
  selectedClass: "selected",
  group: 'shared',

  // Called when an item is selected
	onSelect: function(/**Event*/evt) {
    console.log(evt)
		evt.item.firstElementChild .classList.add(...sortableClassList);
	},

  // Called when an item is deselected
	onDeselect: function(/**Event*/evt) {

		evt.item.firstElementChild .classList.remove(...sortableClassList);
	}

});