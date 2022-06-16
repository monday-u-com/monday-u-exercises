import PokemonClient from "../clients/pokemon_client.js";
const pokemon = new PokemonClient();

export default class ItemManager {
    constructor() {
        this.todoList = [];
    }
    
    async addItem(todo){
        if (isNaN(todo)){
            return {text:todo ,number:0};
        }else{
            const response = await (pokemon.getPokemonNameById(todo));
            return {text:response,number:1};
        }
    }

    async addArrayItem(todoArray,lengthData){
        const arr=[];
        const arr2=[];
        let str='';

        await Promise.all(todoArray.map(async todo => {
            const pokemon = await this.addItem(todo);
            if (pokemon.text.length>0){
                arr.push(pokemon);
            }
        }))

        arr.forEach((item)=>{
            if(item.number){
                arr2.push({id:lengthData,text:item.text});
                lengthData++
            }else{
                if (str.length>0){
                    str=str+','+item.text
                }else{
                    str=item.text
                }
            }
        })

        if (str.length>0){
            arr2.push({id:lengthData,text:str});
            lengthData++
        }

        return arr2
    }

    deleteListTodo(){
        this.todoList=[];
    }

    deleteIdListTodo(id){
        this.todoList=this.todoList.filter((item) => item.id!=id);
    }

    deleteNameListTodo(name){
        this.todoList=this.todoList.filter((item) => item.name!=name);
    }
}

