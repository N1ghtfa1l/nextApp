'use client'
import styles from "./page.module.css";
import FormRow from "./components/FormField/FormRow";
import { useEffect, useState } from "react";

export default function Home() {
  const [city, setCity] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [lastSubmittedTime, setLastSubmittedTime] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [error, setError] = useState<{ name: boolean; password: boolean; email: boolean, confirmPass: boolean, city: boolean }>({
    name: false,
    password: false,
    email: false,
    confirmPass: false,
    city: false
  });

  const validateCity = () => city && city.length > 0;

  const validateName = (value: string) => /^[А-Яа-яЁё]{2,}$/.test(value);

  const validatePassword = (value: string) => /^[a-zA-Z]{6,}$/.test(value);

  const validateEmail = (value: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

  const repeatPassword = () => password === confirmPassword;

  useEffect(() => {
    setError({
      name: validateName(name),
      password: !!password && validatePassword(password),
      email: isChecked ? (!!email && validateEmail(email)) : true,
      confirmPass: repeatPassword(),
      city: !!validateCity()
    });
  }, [name, password, email, confirmPassword, isChecked, city]);

  const handlePhoneChange = (e: string) => {
    let value = e.replace(/\D/g, '');
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    let formattedValue = value;
    if (value.length > 1) {
      formattedValue = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-${value.slice(9, 11)}`;
    }

    setTelephone(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch('/API/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, city: city, telephone: telephone || null, password, email: email || null }),
      });

      const date = new Date();
      const formattedDate = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
      const formattedTime = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
      setLastSubmittedTime(`последние изменения ${formattedDate} в ${formattedTime}`);

      setName(name);
      localStorage.setItem('name', name);
    } catch (e) {
      console.log(e)
    }
    clearForm();
  };

  const clearForm = () => {
    setName('');
    setPassword('');
    setConfirmPassword('');
    setTelephone('');
    setEmail('');
    setIsChecked(false);
  };

  const isFormValid = error.name && error.password && error.confirmPass && error.city && (isChecked ? error.email : true);

  return (
    <div className={styles.body}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.title}>
          Здравствуйте, {localStorage.getItem('name') || <span className={styles.name}>Человек</span>}
        </div>
        <div className={styles.top}>
          <FormRow
            required={true}
            label="Имя"
            value={name}
            placeholder="Введите имя"
            onSelectValue={setName}
            description="Введите корректное имя"
            error={!error.name}
          />
          <FormRow
            required={true}
            label="Ваш город"
            placeholder="Выберите город"
            description="Выберите город"
            type="select"
            selectCity={setCity}
            error={!error.city}
          />
        </div>
        <div className={styles.middle}>
          <FormRow
            required={true}
            value={password}
            label="Пароль"
            placeholder="Введите пароль"
            onSelectValue={setPassword}
            error={!error.password}
            description="Укажите пароль"
          />
          <FormRow
            required={true}
            label="Пароль еще раз"
            placeholder="Введите пароль еще раз"
            description="Пароли должны совпадать!"
            value={confirmPassword}
            onSelectValue={setConfirmPassword}
            error={!error.confirmPass}
          />
        </div>
        <div className={styles.bottom}>
          <FormRow
            required={false}
            label="Номер телефона"
            placeholder="Введите номер телефона"
            type="phone"
            value={telephone}
            onChange={handlePhoneChange}
            error={false}
          />
          <FormRow
            required={isChecked}
            label="Электронная почта"
            value={email}
            placeholder="Введите электронную почту"
            onSelectValue={setEmail}
            description="Введите почту"
            error={!error.email}
          />
          <FormRow
            required={false}
            label="Я согласен"
            type="checkbox"
            value={isChecked}
            onSelectValue={setIsChecked}
            error={false}
          />
        </div>
        <input type="submit" className={styles.btn} disabled={!isFormValid} />
        {lastSubmittedTime && <div className={styles.date}>{lastSubmittedTime}</div>}
      </form>
    </div>
  );
}
