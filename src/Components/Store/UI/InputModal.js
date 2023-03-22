
import classes from './InputModal.module.css';

const InputModal = (props) => {
    return <div className={classes.container} style={ props.style}>
        {props.children}
    </div>

}

export default InputModal;