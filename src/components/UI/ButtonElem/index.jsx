import style from './ButtonElem.module.scss'

function ButtonElem({hoverType, action, title, type, disabled}){
    return(
        <button className={hoverType !== 'exit' ? style.base : style.exit} onClick={action} type={type} disabled={disabled}>{title}</button>
    )
}

export default ButtonElem