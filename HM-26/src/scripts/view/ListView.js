import $ from 'jquery'
export default class ListView {
    constructor() {
        this.$el = this.renderView();
        this._$listContainer = this.$el.find('tbody');
    }
    renderView() {
        return $(`
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th colspan="10">Marks</th>
                        
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `)
    }
    renderList(list) {
        this._$listContainer.html(list.map(this.renderListItem).join('')
        );
    }
    renderListItem(item) {
        return `
        <tr>
            <td>
                 <span class="delete-btn">X</span>
            </td>
            <td class="name-column">${item.name}</td>
            ${item.marks
                .map(
                    (mark, index) => `<td class="mark-column">
                    <input type="number" value="${mark}" data-mark-id="${index}">
                    </td>`).join('')}
        </tr>
        <tr>
          
        </tr>
        `
    }

}