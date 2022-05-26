import { FC, useState } from 'react';
import Image from 'next/image';
import styles from './index.module.scss';
import { useAuth } from '../../context/login';
import router from 'next/router';
import getConfig from 'next/config';

const LoginContainer: FC<any> = () => {
  console.log('HELLO');
  const { login, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
  });

  const validate = () => {
    const formDataChanged = {...formData};
    let valid = true;
    if(formData.email.value === ''){
      formDataChanged.email.error = "Please enter an email";
      valid = false;
    }
    if(formData.password.value === ''){
      formDataChanged.password.error = "Please enter a password";
      valid = false;
    }
    setFormData(formDataChanged);
    return valid;
  }

  const actionLogin = async () => {
    if(!validate()){
      return;
    }
    setIsLoading(true);
    const res = await login(formData.email.value, formData.password.value);
    if (res.status === 1) {
      setErrorMessage("");
      setTimeout(() => {
        router.push(getConfig().publicRuntimeConfig['WEB_DASHBOARD_URL']);
      }, 100);
    } else {
      setErrorMessage("Invalid email or password");
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.login}>
        <div className={styles.logo}>
          <Image src="/images/logo.jpeg" layout="fill" alt="Impulsive Web" />
        </div>
        <div className={styles.title}>Login</div>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        <div className={styles.form_group}>
          <div className={styles.form_label}>Email</div>
          <input
            className={styles.form_control}
            value={formData.email.value}
            onChange={(e) =>
              setFormData(
                Object.assign({}, formData, {
                  email: { value: e.target.value, error: '' },
                })
              )
            }
          />
          {formData.email.error && <div className={styles.form_error}>{formData.email.error}</div>}
        </div>
        <div className={styles.form_group}>
          <div className={styles.form_label}>Password</div>
          <input
            className={styles.form_control}
            type="password"
            value={formData.password.value}
            onChange={(e) =>
              setFormData(
                Object.assign({}, formData, { password: { value: e.target.value, error: '' } })
              )
            }
          />
          {formData.password.error && <div className={styles.form_error}>{formData.password.error}</div>}
        </div>
        <div className={styles.form_group}>
          <div className={styles.form_button} onClick={actionLogin}>
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
