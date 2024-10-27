import { useNavigate } from 'react-router-dom';
import style from './Form.module.scss'
import ButtonElem from '../UI/ButtonElem'
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import PhoneInput from 'react-phone-input-2'

function Form() {

    // получаем функцию по отправке данных
    const { sendApiRequest } = useContext(Context)

    // получение данных о выбранном сертификате
    let localStorageData = localStorage.getItem('choosenCert')
    let JSONData = JSON.parse(localStorageData) || {}

    // навигация
    const navigate = useNavigate();

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

        if (values.name && (values.phone && values.phone.length === 11) && values.email) {
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

    // отслеживание изменений для input phone (из-за библиотеки)
    const handlePhoneChange = (event) => {
        setValues((values) => ({
            ...values,
            phone: event,
        }));
    };

    return (
        <div className={style.formContent}>
            <form onSubmit={handleSubmit}>

                <p><b>Вы выбрали товар:</b> {JSONData.name || 'товар отсутствует'}</p>

                <label>
                    ФИО
                    <input className={valid && !values.name ? style.error : ''} type="text" name="name" id="name" placeholder='ФИО' value={values.name} onChange={handleInputChange} />
                </label>
                <label>
                    Телефон
                    <PhoneInput inputClass={valid && values.phone.length < 11 ? style.error : ''} specialLabel={''} type="tel" name="phone" placeholder={'+7 (999) 999-99-99'} countryCodeEditable={false} id="phone" country={'ru'} value={values.phone} onChange={handlePhoneChange} />
                </label>
                <label>
                    Электронная почта
                    <input className={valid && !values.email ? style.error : ''} type="email" name="email" id="email" placeholder='example@gmail.com' value={values.email} onChange={handleInputChange} />
                </label>

                <div className={style.options}>
                    <ButtonElem action={() => navigate("/")} title={'Назад'} />
                    <ButtonElem buttonStyle={localStorageData ? 'submit' : ''} title={'Оплатить'} type={'submit'} disabled={localStorageData ? false : true} />
                </div>
            </form>
        </div>
    )
}

export default Form