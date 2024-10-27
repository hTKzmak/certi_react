import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import HomePage from './pages/HomePage'
import './reset.css';
import FormPage from './pages/FormPage';
import { Context } from './context/Context';
import { useState } from 'react';
import PaymentPage from './pages/PaymentPage';

function App() {

  // данные
  const [certData, setCertData] = useState([])

  // отображение экрана загрузки
  const [visibility, setVisibility] = useState('flex')

  // ссылка на API
  const URL = 'http://127.0.0.1:5000/proxy';

  // Функция для отправки запросов к Api
  async function sendApiRequest(payload, usePreolader) {

    console.log("Загрузка данных..."); // Сообщение о начале загрузки

    if(usePreolader){
      setVisibility('flex')
    }

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ApiKey: "011ba11bdcad4fa396660c2ec447ef14", ...payload})
      });

      const result = await response.json();

      if (result.result === 0) {
        console.log('Результат:', result)
        setCertData(result.data);

        if(usePreolader){
          setVisibility('none')
        }
      } else {
        console.error("Ошибка:", result.resultdescription);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  }

  return (
    <Context.Provider value={{sendApiRequest}}>
      <div>
        <Header />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage certData={certData} visibility={visibility}/>} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Context.Provider>
  );
}

export default App;
