export class ItemManager {
    constructor() {
        this.todoList = [];
    }

    async addItem(todo){
        if (isNaN(todo)){
            return {text:todo ,number:0};
        }else{
            const response = await (pokemon.getPokemonNameById(todo));
            return {text:response ,number:1};
        }
    }

    async addArrayItem(todoArray){
        const arr=[]
        await Promise.all(todoArray.map(async todo => {
            const pokemon = await this.addItem(todo);
            if (pokemon.text.length>0){
                arr.push(pokemon);
            }
        }))
        let str='';
        arr.forEach((item)=>{
            if(item.number){
                this.todoList.push(item.text)
            }else{
                if (str.length>0){
                    str=str+','+item.text
                }else{
                    str=item.text
                }
            }
        })
        if (str.length>0){
            this.todoList.push(str)
        }
    }
    
    deleteListTodo(){
        this.todoList=[];
    }

    deleteIdListTodo(id){
        this.todoList.splice(id, 1);
    }
    deleteNameListTodo(name){
        this.todoList=this.todoList.filter((item) => item!=name);
    }
}
const itemManager = new ItemManager();

