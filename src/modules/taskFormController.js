import datepicker from "js-datepicker";
import dateFormatter from "./dateFormatter.js";
import ModalController from "./modalController.js";

export default class TaskFormController {

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
    }

    static changeSubmitButtonState(state) {
        TaskFormController.taskSubmitButton.value = state ===  1 ? 'add' : 'save edit'
    }

    getFormValues() {

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