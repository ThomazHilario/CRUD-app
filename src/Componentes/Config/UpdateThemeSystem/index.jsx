// Context
import { useContext } from "react"
import { Context } from "../../../Context"

// Css
import './update-theme-system.css'
export const UpdateThemeSystem = () => {

    // context
    const { setLightMode, lightMode } = useContext(Context)

    // updateMode
    function updateMode(input){
        if(input.checked === true){
            input.checked = true

            // Setando o valor na local storage
            localStorage.setItem('themeMode',JSON.stringify(input.checked))

            // Alterando valor na state lightMode
            setLightMode(true)

        } else{
            input.checked = false

            // Setando o valor na local storage
            localStorage.setItem('themeMode',JSON.stringify(input.checked))

            // Alterando valor na state lightMode
            setLightMode(false)
        }

    }

    return(
        <form id='form_theme_system'>
            <label className={lightMode ? 'camposConfigLight' : undefined}>Theme System:</label>

            <label className="switch">
                <input type="checkbox" id='themeTag' onChange={(e) => updateMode(e.target)}/>
                <span className="slider" ></span>
            </label>

        </form>
    )
}