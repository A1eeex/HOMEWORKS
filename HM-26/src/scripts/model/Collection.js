import { concatUrl } from "../../utils";

export default class Collection{
    constructor(url){
        this._url = url;
        this._list = [];
    }

    fetch(){
        return fetch(this._url)
                .then(res => res.json())
                .then((data) => this.setData(data));

    }

    setData(data){
        this._list = data;
    }

    getList(){
        return this._list;
    }

    delete(id){
        fetch(this._url + '/' + id,{ method:'DELETE' })
        this._list = this._list.filter(item => item.id !== id)
        return Promise.resolve();
    }

    get(id) {
        return this._list.find((item) => item.id === id)
    }

    save(data){
        if(data.id){
            return this._update(data);
        } else{
            return this._create(data);
        }
    }
    _create(data){
        data.completed = false;

        return fetch(this._url,{
            method:'POST',
            headers: {
                'Content-Type':'aplication/json',
            },
            body: JSON.stringify(data),
        })
        .then((res)=> res.json())
        .then((item)=>{
            this._list.push(item);
            return item;
        });
    }
    _update(student){
        return fetch(concatUrl(this._url, student.id),{
            method:'PUT',
            headers: {
                'Content-Type':'aplication/json',
            },
            body: JSON.stringify(student),
        })
        .then((res)=> res.json())
        .then((data)=>{
            this._list = this._list.map(item => 
                item.id === data.id ? data : item)
            return data;
        });
    }


}