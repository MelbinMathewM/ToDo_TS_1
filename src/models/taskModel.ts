type ListStatus = 'pending' | 'done'

abstract class List {
    public id : number;
    public title : string;
    public status : ListStatus;

    constructor(id : number, title : string, status : ListStatus){
        this.id = id;
        this.title = title;
        this.status = status;
    }
}

export class Task extends List{};

export class TaskManager {
    private tasks : List[] = [];
    private nextId : number = 0;
    private deletedIds : number[] = [];

    addTask(title : string) : List {
        let taskId : number;
        if (this.deletedIds.length > 0) {
            taskId = this.deletedIds.shift()!;
        } else {
            taskId = ++this.nextId;
        }
        let task = new Task(taskId,title,'pending');
        this.tasks.push(task);
        return task;
    }

    getAllTasks() : List[] {
        return this.tasks.sort((a,b) => a.id - b.id);
    }

    getTaskById(id : number) {
        return this.tasks.find((item : List) => item.id === id);
    }

    editTask(id : number, title : string) : void {
        let task = this.getTaskById(id);
        if(task){
            task.title = title;
        }
    }

    completeTask(id : number){
        let task = this.getTaskById(id);
        console.log(task);
        
        if(task){
            if(task.status === 'done'){
                task.status = 'pending';
            }else{
                task.status = 'done';
            }
        }
    }

    deleteTask(id : number){
        const index = this.tasks.findIndex((item) => item.id == id);
        if(index !== -1){
            this.tasks.splice(index, 1);
            this.deletedIds.push(id);
        }
    }
}