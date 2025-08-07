import Render from "./render.js"


export default function controlMenu() {

    const menuButtonsContainer = document.querySelector('.primary-navigation-buttons')
    const homeMenu = document.querySelector('.home-btn')
    
    menuButtonsContainer.onmousedown = function (e) {
        
        if (e.target.nodeName.toLowerCase() === 'button') {
            handleActiveMenu(e.target)            
        }
        
    }


    const handleActiveMenu = (activeButton) => {   
        for (let i = 0; i < menuButtonsContainer.children.length; i++) {
            menuButtonsContainer.children[i].classList.remove('active')
        }

        makeButtonActive(activeButton)

        for (let i = 0; i < menuButtonsContainer.children.length; i++) {

            if (menuButtonsContainer.children[i].classList.contains('active')) {
                Render.renderActiveMenu[i].call()
                break
            }
       
        }
    }

    const loadDefault = () => {
        makeButtonActive(homeMenu)
        Render.renderDefaultProject()
    }

    const makeButtonActive = (activeButton) => {
        activeButton.classList.add('active')
    }

    return {loadDefault}

}