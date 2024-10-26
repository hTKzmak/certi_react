import { Link } from 'react-router-dom';
import style from './CertItem.module.scss';
import ButtonElem from '../UI/ButtonElem';

function CertItem({ id, name, price, summa, primarykey, tablename }) {

    const choosenCert = () => {
        window.localStorage.setItem('choosenCert',  JSON.stringify({id: id, name: name, price: price, summa: summa, primarykey: primarykey, tablename: tablename}))

        console.log(localStorage.getItem('choosenCert'))
    }

    return (
        <div className={style.certItem} id={id} key={id}>
            <h3>{name}</h3>
            <h5>{Math.round(price)} ₽</h5>

            <Link to="/form">
                <ButtonElem action={() => choosenCert()} title={'Купить'}/>
            </Link>
        </div>
    )
}

export default CertItem