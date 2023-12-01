export class Task{
    private id: number;
    private name: string;
    private description: string;
    private start: Date;
    private end: Date;
    private priority: string;
    private status: string;
    private level: number;

    constructor(id: number, name: string, description: string, start: Date, end: Date, priority: string, level: number ,status: string ="à faire"){
        this.id = id;
        this.name = name;
        this.description = description;
        this.start = start;
        this.end = end;
        this.priority = priority;
        this.status = status;
        this.level = level;
    }

    /**
     * Retrieves the id of the object.
     *
     * @return {number} The id of the object.
     */
    public getId(){
        return this.id;
    }
    /**
     * Sets the ID of the object.
     *
     * @param {number} id - The ID to set.
     */
    public setId(id: number){
        this.id = id;
    }

    /**
     * Retrieves the name of the object.
     *
     * @return {string} The name of the object.
     */
    public getName(){
        return this.name;
    }
    /**
     * Sets the name of the object.
     *
     * @param {string} name - The name to set.
     */
    public setName(name: string){
        this.name = name;
    }

    /**
     * Retrieves the description of the object.
     *
     * @return {string} The description of the object.
     */
    public getDescription(){
        return this.description;
    }
    /**
     * Sets the description of the object.
     *
     * @param {string} description - The new description for the object.
     */
    public setDescription(description: string){
        this.description = description;
    }

    /**
     * Retrieves the value of the start property.
     *
     * @return {Date} The value of the start property.
     */
    public getStart(){
        const date = new Date(this.start);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' } as const;
        return date.toLocaleDateString('fr-FR', options);
    }
    /**
     * Sets the start date.
     *
     * @param {Date} start - The start date to set.
     */
    public setStart(start: Date){
        this.start = start;
    }

    /**
     * Returns the value of the `end` property.
     *
     * @return {Date} The value of the `end` property.
     */
    public getEnd(){
        const date = new Date(this.end);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' } as const;
        return date.toLocaleDateString('fr-FR', options);
    }
    public getEndDateObject(): Date {
        return new Date(this.end);
    }
    /**
     * Sets the end date of the given event.
     *
     * @param {Date} end - The new end date for the event.
     */
    public setEnd(end: Date){
        this.end = end;
    }

    /**
     * Retrieves the priority value of the object.
     * 
     * It could be "low", "medium" or "high".
     *
     * @return {string} The priority value.
     */
    public getPriority(){
        return this.priority;
    }
    /**
     * Sets the priority of the item.
     * 
     * It could be "low", "medium" or "high".
     *
     * @param {string} priority - The priority to be set.
     */
    public setPriority(priority: string){
        this.priority = priority;
    }

    /**
     * Returns the status of the object.
     * 
     * It could be "todo", "doing" or "done".
     *
     * @return {string} The status of the object.
     */
    public getStatus(){
        return this.status;
    }
    /**
     * Sets the status of the object.
     * 
     * It could be "todo", "doing" or "done".
     *
     * @param {string} status - The status to set.
     */
    public setStatus(status: string){
        this.status = status;
    }

    /**
     * Retrieves the current level.
     *
     * @return {number} The current level.
     */
    public getLevel(){
        return this.level;
    }
    /**
     * Sets the level of the object to the specified level.
     *
     * @param {number} level - The new level to set.
     */
    public setLevel(level: number){
        this.level = level;
    }

    /**
     * Returns a string representation of the object.
     *
     * @return {string} A string representation of the object.
     */
    public toString(){
        return this.name + " " + this.description + " " + this.start + " " + this.end + " " + this.priority + " " + this.status + " " + this.level
    }

}