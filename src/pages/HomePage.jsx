import { useContext, useEffect } from "react";
import CertList from "../components/CertList";
import Loading from '../components/Loading'
import { Context } from "../context/Context";

function HomePage({ certData, visibility }) {

    // получаем функцию по отправке данных
    const { getGoodList } = useContext(Context)

    // все необходимые данные для получения data с сервера
    const payload = {
        ApiKey: "011ba11bdcad4fa396660c2ec447ef14",
        MethodName: "OSGetGoodList",
        isMob: 0,
    };

    // запускаем запрос к API 
    useEffect(() => {
        getGoodList(payload, true);
    }, [])

    return (
        <main className="container">
            <Loading visibility={visibility} />
            <CertList certData={certData} />
        </main>
    )
}

export default HomePage;