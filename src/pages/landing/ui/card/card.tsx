import styles from './card.module.scss';

type Props = {
  title: string;
  description: string;
};

export const Card = ({ title, description }: Props) => {
  return (
    <div className={styles.cardItem}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
