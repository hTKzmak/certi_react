import style from './Loading.module.scss';

function Loading({visibility}){
    return(
        <div className={style.loading} style={{display: visibility}}>
            <span className={style.loader}></span>
        </div>
    )
}

export default Loading