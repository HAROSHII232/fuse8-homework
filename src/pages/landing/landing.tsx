import { Button } from '@shared/ui/button';
import { AlertIcon } from '@shared/ui/icons/alert-icon';
import { EyeIcon } from '@shared/ui/icons/eye-icon';

import { useSmoothScroll } from '@shared/hooks';
import { Card } from './ui/card';
import styles from './landing.module.scss';

export const LandingPage = () => {
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
        <input type="text" placeholder="Напишите тут что-нибудь" />
        <Button>
          Вывести текст в alert
          <AlertIcon />
        </Button>
      </section>
    </main>
  );
};
