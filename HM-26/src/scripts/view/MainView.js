import FormView from "./FormViw";
import ListView from "./ListView";

export default class MainView {
    constructor($container){
        this._$container = $container;
        this._list = new ListView();
        this._form = new FormView();

        $container.append(this._list.$el)

    }
    renderList(list){
        this._list.renderList(list)
    }
}