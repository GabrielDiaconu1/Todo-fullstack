import { Allow,Entity, Validators } from 'remult';
import { Fields } from 'remult';
@Entity('tasks',{
    allowApiCrud: Allow.everyone,
})
export class Task {
    @Fields.autoIncrement()
    id=0;
    @Fields.string<Task>({
        validate:task=>{
            if(task.title.length<3)
                throw new Error('Too short');
        },
    })
    title = '';
    @Fields.boolean()
    completed = false;



}