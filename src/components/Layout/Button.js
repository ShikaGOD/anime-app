import classes from './Button.module.css'
import { useLocation } from 'react-router-dom'

function Button(props) {
    const location = useLocation();
    return <button className={location.pathname === '/' ? classes.mainButton : classes.button} onClick={props.onClick}>{props.children}</button>
}

export default Button