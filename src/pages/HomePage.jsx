import { useContext, useEffect } from "react";
import CertList from "../components/CertList";
import Loading from '../components/Loading'
import { Context } from "../context/Context";

function HomePage({ certData, visibility }) {

    // получаем функцию по отправке данных
    const { sendApiRequest } = useContext(Context)

    // все необходимые данные для получения data с сервера
    const payload = {
        MethodName: "OSGetGoodList",
        isMob: 0,
    };

    // запускаем запрос к API 
    useEffect(() => {
        sendApiRequest(payload, true);
    }, [])

    return (
        <main className="container">
            <Loading visibility={visibility} />
            <CertList certData={certData} />
        </main>
    )
}

export default HomePage;