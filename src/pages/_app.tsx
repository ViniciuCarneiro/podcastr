import { Header } from "../components/Header";
import { Player } from "../components/Player";
import { PLayerContextProvaider } from "../context/PlayerContext";

import "../styles/global.scss";
import styles from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {
  return (
    <PLayerContextProvaider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PLayerContextProvaider>
  );
}

export default MyApp
