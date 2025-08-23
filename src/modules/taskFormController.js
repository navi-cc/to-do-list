import datepicker from "js-datepicker";
import dateFormatter from "./dateFormatter.js";
import ModalController from "./modalController.js";
import Logger from "./logger.js";
import TaskProjectHolder from "./taskProjectHolder.js";
import Render from "./render.js";

export default class TaskFormController {


    static #taskFormField = {
        title: document.querySelector('#task-form-title > input'),
        description: document.querySelector('#task-form-description > p'),
        dueDate: document.querySelector('.selected-button-container > .selected-due-date'),
        priority: document.querySelector('.selected-button-container > .selected-priority')
    }

    static #taskForm = document.querySelector('.add-task-form')    
    static taskSubmitButton = document.querySelector('#task-form-submit')
    static #taskPriorityPicker = document.querySelector('.task-priority-button-container')
    static #selectedPriority = document.querySelector('.selected-priority')
    static #selectedDueDate = document.querySelector('.selected-due-date')
    static #taskDatePicker = datepicker("#task-form-due-date", {
        onSelect: () => TaskFormController.#displaySelectedDueDate()
    })

    static showForm() {
        TaskFormController.changeSubmitButtonState(1)
        ModalController.makeModalActive()
    }

    static resetForm() {
        TaskFormController.#taskForm.reset()
        TaskFormController.#taskFormField.description.textContent = ''
        TaskFormController.#taskFormField.dueDate.classList.add('hidden')
        TaskFormController.#taskFormField.priority.classList.add('hidden')
    }

    static changeFormState(state, taskIndex, projectOrigin) {

        if (state === 1) {
            TaskFormController.setTaskFormStateToAdd()
        } else {
            TaskFormController.setTaskFormStateToEdit(taskIndex, projectOrigin)
        }
    }


    static #showPriorityPicker() {
        TaskFormController.#taskPriorityPicker.children[1].classList.remove('hidden')
    }


    static #displaySelectedPrioty(selectedPriority, selectedPriorityText) {
        TaskFormController.#selectedPriority.textContent = selectedPriorityText
        TaskFormController.#selectedPriority.id = selectedPriority
        TaskFormController.#selectedPriority.classList.remove('hidden')
    }

    static #displaySelectedDueDate() {
        TaskFormController.#selectedDueDate.textContent = dateFormatter(TaskFormController.#taskDatePicker.dateSelected)
        TaskFormController.#selectedDueDate.classList.remove('hidden')
    }

    static #closePriorityPicker() {
        TaskFormController.#taskPriorityPicker.children[1].classList.add('hidden')
    }

    static setTaskFormSubmitEvent() {
        TaskFormController.#taskForm.onsubmit = function (e) {
            let formState = e.target.dataset.state
            let task = TaskFormController.getFormValues()
            
            if (formState === 'add') {
                TaskProjectHolder.addNewTaskToProject(task)
            } else {
                TaskProjectHolder.saveTaskEdit(task, e.target.dataset.taskIndex, e.target.dataset.projectOrigin)
            }
            
            Render.renderDefaultProject()            
            ModalController.makeModalInactive()
            e.preventDefault()
        }
    }

    static setPriorityPickerEvent() {
        TaskFormController.#taskPriorityPicker.onmousedown = function (e) {

            if (e.target.id === "task-form-priority") {
                TaskFormController.#showPriorityPicker()
            }

            if (e.target.dataset.buttons === "priorityButtons") {
                TaskFormController.#displaySelectedPrioty(e.target.id, e.target.textContent)
                TaskFormController.#closePriorityPicker()
            }
        }
    }
    
}