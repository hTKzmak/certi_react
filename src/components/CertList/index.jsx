import CertItem from "../CertItem"
import style from './CertList.module.scss';

function CertList({ certData }) {

    return (
        <div className={style.certList}>
            {certData.map(elem => (
                <CertItem id={elem.ID} key={elem.ID} name={elem.NAME} price={elem.SUMMA} summa={elem.SUMMA} primarykey={elem.PRIMARYKEY} tablename={elem.TABLENAME}/>
            ))}
        </div>
    )
}

export default CertList