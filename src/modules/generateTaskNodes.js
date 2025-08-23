import ModalController from "./modalController.js"

export function generate(taskTitle, taskDueDate, taskPriority, taskIndex, projectOrigin) {
    const mainContainer = document.createElement('div')
    mainContainer.className = 'task'
    mainContainer.dataset.taskIndex = taskIndex
    mainContainer.dataset.projectOrigin = projectOrigin
    

    const taskInformationNode = document.createElement('section')
    const taskTitleNode = document.createElement('h6')
    const taskDueDateNode = document.createElement('span')
    const taskPriorityNode = document.createElement('span')

    taskInformationNode.className = 'task-information'
    taskTitleNode.className = 'task-title'
    taskDueDateNode.className = 'task-due-date'
    taskPriorityNode.className = 'task-priority'

    taskTitleNode.textContent = taskTitle
    taskDueDateNode.textContent = taskDueDate
    taskPriorityNode.textContent = taskPriority

    taskInformationNode.appendChild(taskTitleNode)
    taskInformationNode.appendChild(taskDueDateNode)
    taskInformationNode.appendChild(taskPriorityNode)


    const taskButtonsNode = document.createElement('section')
    taskButtonsNode.className = 'task-buttons'
    const ul = document.createElement('ul')

    const taskButtons = {
        taskInformationButton: {
            className: 'task-details-button'
        },

        taskEditButton: {
            className: 'task-edit-button'
        },

        taskDeleteButton: {
            className: 'task-delete-button'
        },
    }

    Object.entries(taskButtons).map(([key, node], index) => {
        if (key === 'container') return;
        const li = document.createElement('li')
        const anchor = document.createElement('a')
        const div = document.createElement('div')

        div.onmousedown = ModalController.handleEvent[index]
        div.classList.add('task-button')
        div.classList.add(node.className)
        anchor.appendChild(div)
        li.appendChild(anchor)
        ul.appendChild(li)
    });

    taskButtonsNode.appendChild(ul)
    mainContainer.appendChild(taskInformationNode)
    mainContainer.appendChild(taskButtonsNode)


    return mainContainer
}