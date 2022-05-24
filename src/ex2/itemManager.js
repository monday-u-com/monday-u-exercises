class itemManager{
    constructor(){
        this.items = [];
    }
    addItem(item){
        this.items.push(item);
    }
    removeItem(item){
        this.items.splice(this.items.indexOf(item),1);
    }
    getItems(){
        return this.items;
    }
}