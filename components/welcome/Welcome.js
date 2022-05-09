import Script from "next/script";
import styles from "./Welcome.module.css";

const welcomeMessages = [
  "Hello ",
  "Hola ",
  "Bonjor ",
  "こんにちは ",
  "Guten tag ",
  "Salve ",
  "Nǐn hǎo ",
  "Olá ",
  "Asalaam alaikum ",
  "",
].map((val) => val + "👋");

const welcomeMessagesHTML = welcomeMessages.map((welcome) => {
  return <code class={styles.slide_in}>{welcome}</code>;
});

export default function Header({ title }) {
  return <div class="welcome-slide">{welcomeMessagesHTML}</div>;
}
