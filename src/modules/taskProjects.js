export default class TaskProject {

    #taskProjectName
    #projectTasks

    constructor(projectName) {
        this.#taskProjectName = projectName
        this.#projectTasks = []
    }

    editTaskProjectName(newProjectName) {
        this.#taskProjectName = newProjectName
    }

    getProjectName() {
        return this.#taskProjectName
    }

    appendTask(task) {
        this.#projectTasks.push(task)
    }

    getTasks() {
        return this.#projectTasks;
    }
}