import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../context/firebase";
import styles from "../styles/Authentication.module.css"

export default function Login() {
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };
        const email = target.email.value;
        const password = target.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem("auth", user.uid);
                window.location.href = "movies";
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }
    return (
        <>
            <div className={styles.main_box}>
                <div className={styles.image_box}>
                    <img src="title_bg.jpg" alt="" />
                </div>
                <div className={styles.login_form}>
                    <form onSubmit={submitHandler}>
                        <p>Email</p>
                        <input id="email" type="email" />
                        <p>Password</p>
                        <input id="password" type="password" />
                        <div>
                            <a href="register">Don't have a account? Register here.</a>
                        </div>
                        <button id="login" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}