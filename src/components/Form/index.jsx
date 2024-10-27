import { useNavigate } from 'react-router-dom';
import style from './Form.module.scss'
import ButtonElem from '../UI/ButtonElem'
import { useContext, useState } from 'react';
import PhoneInput from 'react-phone-number-input/input'
import { Context } from '../../context/Context';

function Form() {

    // получаем функцию по отправке данных
    const { sendApiRequest } = useContext(Context)

    // получение данных о выбранном сертификате
    let localStorageData = localStorage.getItem('choosenCert')
    let JSONData = JSON.parse(localStorageData) || {}

    // навигация
    const navigate = useNavigate();

    // значение номера телефона (используется из-за библиотеки)
    const [phoneVal, setPhoneVal] = useState('');

    // значения данных
    const [values, setValues] = useState({
        name: "",
        phone: "",
        email: "",
    });

    // для проверки полей ввода (пустые ли они или нет)
    const [valid, setValid] = useState(false);

    // функция по подтверждению данных
    const handleSubmit = (evt) => {
        evt.preventDefault();

        // проверка полей ввода
        setValid(true)

        console.log(values)

        if (values.name && (values.phone && phoneVal.length === 12) && values.email) {
            // все необходимые данные для отправки на сервер
            const payload = {
                MethodName: "OSSale",
                isMob: 0,
                Id: JSONData.id,
                TableName: JSONData.tablename,
                PrimaryKey: JSONData.primarykey,
                Price: JSONData.price,
                Summa: JSONData.summa,
                ClientName: values.name,
                Phone: values.phone,
                Email: values.email,
                PaymentTypeId: 2,
                UseDelivery: 0,
            };

            // запускаем запрос к API 
            sendApiRequest(payload, false);

            // перекидывает нас на страницу payment (страница-заглушка)
            navigate("/payment")
        }
    }

    // отслеживание изменений input'ов
    const handleInputChange = (event) => {
        event.preventDefault();

        const { name, value } = event.target;
        setValues((values) => ({
            ...values,
            [name]: value,
        }));
    };

    // отслеживание изменений input'а phone
    const handlePhoneChange = (event) => {
        setValues((values) => ({
            ...values,
            phone: event
        }));

        setPhoneVal(event)
    };

    return (
        <div className={style.formContent}>
            <form onSubmit={handleSubmit}>

                <p><b>Вы выбрали товар:</b> {JSONData.name || 'товар отсутствует'}</p>

                <p>
                    ФИО
                    <input className={valid && !values.name ? style.error : ''} type="text" name="name" id="name" placeholder='ФИО' value={values.name} onChange={handleInputChange} />
                </p>
                <p>
                    Телефон
                    <PhoneInput className={valid && phoneVal.length < 12 ? style.error : ''} type="tel" name="phone" id="phone" placeholder='Телефон' value={phoneVal} onChange={handlePhoneChange} international withCountryCallingCode={true} country="RU" maxLength={16} />
                </p>
                <p>
                    Электронная почта
                    <input className={valid && !values.email ? style.error : ''} type="email" name="email" id="email" placeholder='Электронная почта' value={values.email} onChange={handleInputChange} />
                </p>

                <div className={style.options}>
                    <ButtonElem action={() => navigate("/")} title={'Назад'} />
                    <ButtonElem buttonStyle={localStorageData ? 'submit' : ''} title={'Оплатить'} type={'submit'} disabled={localStorageData ? false : true} />
                </div>
            </form>
        </div>
    )
}

export default Form