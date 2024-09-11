import { Request, Response  } from "express";
import { TaskManager } from "../models/taskModel";

let taskManager = new TaskManager();

export const loadList = async (req : Request, res : Response) : Promise<void> => {
    try{
        let tasks = taskManager.getAllTasks();
        res.render('todo',{ list : tasks })
    }catch(error){
        res.status(500).json({ success : false, message : 'error fetching data'})
    }
}

export const addTask = async (req : Request, res : Response) : Promise<void> => {
    try{
        const Aname : string = req.body.Aname;
        let addedTask = taskManager.addTask(Aname);
        if(addedTask){
            res.status(200).json({ success : true, message : 'task added'})
        }else{
            res.status(400).json({ success : false, message : 'couldn\'t add task'})
        }
    }catch(error){
        res.status(500).json({ success : false, message : 'error adding task'})
    }
}

export const completeTask = async (req : Request, res : Response) : Promise<void> => {
    try{
        let id : number = Number(req.body.id);
        taskManager.completeTask(id);
        res.status(200).json({ success : true, message : 'task finished'})
    }catch(error){
        res.status(500).json({ success : false, message : 'error finishing task'})
    }
}

export const editTask = async (req : Request, res : Response) : Promise<void> => {
    try{
        const Ename : string = req.body.Ename;
        const id : number = Number(req.body.id);
        taskManager.editTask(id,Ename);
        res.status(200).json({ success : true, message : 'task edited'})
    }catch(error){
        res.status(500).json({ success : false, message : 'error editing task'})
    }
}

export const deleteTask = async (req : Request, res : Response) : Promise<void> => {
    try{
        const id : number = Number(req.params.id);
        taskManager.deleteTask(id);
        res.status(200).json({ success : true, message : 'task deleted'})
    }catch(error){
        res.status(500).json({ success : false, message : 'error deleting task'})
    }
}