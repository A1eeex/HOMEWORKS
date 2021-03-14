import { STUDENT_URL } from "../configs";
import Collection from "./model/Collection";
import MainView from "./view/MainView";

export default class Controller{
    constructor($el){
       
        this._view = new MainView($el);

        this._collection = new Collection(STUDENT_URL)

        this._collection.fetch().then(()=>{
            this.renderList();
        });
    }
    renderList(){
        this._view.renderList(this._collection.getList())
    }
    
}