import  * as taskNodeGenerator from "./generateTaskNodes.js"
import TaskProjectHolder from "./taskProjectHolder.js"

export default class Render {
    
    static taskContainer = document.querySelector('.task-container')
    static renderActiveMenu = [Render.renderDefaultProject, Render.renderTodayTask, Render.renderUpcomingTask]

    static renderDefaultProject() {
        Render.#clearTaskContainer()
        Render.#handleRenderTask(TaskProjectHolder.getTaskProjects()[0].getTasks())
    }

    static renderProject(taskProjectIndex) {
        Render.#clearTaskContainer()
        Render.#handleRenderTask(TaskProjectHolder.getTaskProjects()[taskProjectIndex].getTasks())
    }

    static renderTodayTask() {
        Render.#clearTaskContainer()
        Render.#handleRenderTask(TaskProjectHolder.getTodayTask())
    }

    static renderUpcomingTask() {
        Render.#clearTaskContainer()
        Render.#handleRenderTask(TaskProjectHolder.getUpcomingTask())
    }

    static #handleRenderTask(tasks) {
        tasks.map((task, taskIndex) => {
            const taskDetails = task.getTaskDetails()
            Render.taskContainer.appendChild(taskNodeGenerator.generate(taskDetails.title, taskDetails.dueDate, taskDetails.priority, taskIndex))
        })
    }

    static #clearTaskContainer() {
        Render.taskContainer.textContent = ''
    }

}