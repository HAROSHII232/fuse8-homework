import { Button } from '@shared/ui/button';
import { AlertIcon } from '@shared/ui/icons/alert-icon';
import { EyeIcon } from '@shared/ui/icons/eye-icon';

import { useAlert, useSmoothScroll } from '@shared/hooks';
import { Input } from '@shared/ui/input';
import { Card } from './card';
import styles from './landing.module.scss';

export const LandingPage = () => {
  const { alertValue, setAlertValue, error, handleAlertMessage, resetError } =
    useAlert();

  const { ref: secondSectionRef, scrollToElement: scrollToSecondSection } =
    useSmoothScroll<HTMLDivElement>();

  return (
    <main className={styles.landing}>
      <h1 className="visually-hidden">Очень интересный landing page</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Интересные факты про эту страницу
        </h2>

        <p>В ней нет смысла</p>
        <Button as={'a'} onClick={scrollToSecondSection}>
          Перейти дальше
          <EyeIcon />
        </Button>
      </section>

      <section className={styles.section} ref={secondSectionRef}>
        <h2 className={styles.sectionTitle}>Смотрите какие карточки</h2>
        <div className={styles.cardsContainer}>
          <Card title={'Карточка 1'} description={'Пустота'} />
          <Card title={'Карточка 2'} description={'Пустота'} />
        </div>
      </section>

      <section className={styles.section} id="second-screen2">
        <h2 className={styles.section__title}>Интерактив?</h2>
        <Input
          value={alertValue}
          placeholder={'Напишите тут что-нибудь'}
          onChangeText={setAlertValue}
          onEnter={handleAlertMessage}
          onFocus={resetError}
          error={error}
        />
        <Button onClick={handleAlertMessage}>
          Вывести текст в alert
          <AlertIcon />
        </Button>
      </section>
    </main>
  );
};
