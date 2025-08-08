import type { FormEventHandler, FunctionComponent } from 'react';
import { useState, useCallback } from 'react';
import type { KcContextBase } from '../../config/context-base';

import styles from './login.module.scss';

export interface ILoginProps {
    kcContext: KcContextBase.Login;
}

export const Login: FunctionComponent<ILoginProps> = ({ kcContext }) => {
    const { url } = kcContext;
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
        (e) => {
            e.preventDefault();
            setIsLoginButtonDisabled(true);
            
            const formElement = e.target as HTMLFormElement;

            // Rename email to username
            const emailInput = formElement.querySelector("input[name='email']");
            if (emailInput) {
                emailInput.setAttribute('name', 'username');
            }

            // Submit the form
            formElement.submit();
        },
        [],
    );

    if (!kcContext) {
        return null;
    }

    return (
        <form
            id="kc-form-login"
            action={url.loginAction}
            method="post"
            onSubmit={onSubmit}
            className={styles.login}
        >
            <h1 className={styles.title} id="login-form.login.title">Custom Login</h1>
            {kcContext.message && (
                <>
                    <p className={styles.message}>{kcContext.message?.summary}</p>
                    <p className={styles.messageType}>{kcContext.message.type}</p>
                </>
            )}

            <div className={styles.field}>
                <label htmlFor="email" id="login.email.label">Email</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="off"
                    required
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="password" id="login.password.label">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    required
                />
            </div>
            <button
                type="submit"
                className={styles.button}
                disabled={isLoginButtonDisabled}
            >
                <p id="login.button.label">Log In</p>
            </button>
        </form>
    );
};
