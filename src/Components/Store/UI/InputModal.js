
import classes from './InputModal.module.css';

const InputModal = (props) => {
    return <div className={classes.container}>
        {props.children}
    </div>

}

export default InputModal;