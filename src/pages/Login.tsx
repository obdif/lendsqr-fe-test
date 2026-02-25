import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from '../assets/login_img.jpeg';
import styles from '../styles/Login.module.scss';
import logo from "../assets/lendsqr-icon.jpeg";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.logo}>
          <img src={logo} alt="Lendsqr Logo" className={styles.logoImage} />
          
        </div>
        <img src={loginImg} alt="Login Illustration" className={styles.illustration} />
      </div>

      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Welcome!</h1>
          <p className={styles.subtitle}>Enter details to login.</p>

          <form onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <input 
                type="email" 
                placeholder="Email" 
                className={styles.input}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className={styles.input}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <a href="#" className={styles.forgotPassword}>FORGOT PASSWORD?</a>

            <button type="submit" className={styles.submitBtn}>
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
