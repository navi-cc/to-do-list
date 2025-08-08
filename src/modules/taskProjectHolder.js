import dateFormatter from "./dateFormatter.js";
import * as dateParse from "./dateParser.js"

export default class TaskProjectHolder {

    static #projects = []


    static addTaskProject(taskProject) {
        TaskProjectHolder.#projects.push(taskProject)
    }


    static getTaskProjects() {
        return TaskProjectHolder.#projects;
    }


    static getTodayTask() {
        return TaskProjectHolder.getTaskProjects().reduce((todayTask, taskProject) => {

                taskProject.getTasks().map(task => {

                    let taskDate = task.getTaskDetails().dueDate
                    let currentDate = dateFormatter(new Date())


                    if (taskDate === currentDate) {
                        todayTask.push(task)
                    }
                })


                return todayTask

            }, [])
    }


     static getUpcomingTask() {
        return TaskProjectHolder.getTaskProjects().reduce((upcomingTask, taskProject) => {

                taskProject.getTasks().map(task => {

                    let [taskMonthDue, taskDayDue] = task.getTaskDetails().dueDate.split(' ')
                    taskMonthDue = dateParse.parseMonth(taskMonthDue)
                    taskDayDue = dateParse.parseDay(taskDayDue)

                    let date = new Date()
                    let currentMonthDate = date.getMonth() + 1
                    let currentDayDate = date.getDate()


                    if (((taskDayDue > currentDayDate || taskDayDue < currentDayDate)
                         && taskMonthDue >= currentMonthDate)) {
                        upcomingTask.push(task)
                    }

                })

                return upcomingTask

            }, [])
    }
}