import style from './ButtonElem.module.scss'

function ButtonElem({buttonStyle, action, title, type, disabled}){
    return(
        <button className={buttonStyle === 'submit' ? style.submit : ''} onClick={action} type={type} disabled={disabled}>{title}</button>
    )
}

export default ButtonElem