import { Button } from '@shared/ui/button';
import { AlertIcon } from '@shared/ui/icons/alert-icon';
import { EyeIcon } from '@shared/ui/icons/eye-icon';
import { useNavigate } from 'react-router';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="example-homework">
      <div className="screen">
        <h2>Интересные факты про эту страницу</h2>

        <p>В ней нет смысла</p>
        <Button as="a" onClick={() => navigate('#second-screen')}>
          Перейти дальше
          <EyeIcon />
        </Button>
      </div>

      <div
        className="screen"
        id="second-screen"
        style={{ backgroundColor: '#e0e0e0' }}
      >
        <h3>Смотрите какие карточки</h3>
        <div className="cards-container">
          <div className="card">
            <h4>Карточка 1</h4>
            <p>Пустота</p>
          </div>
          <div className="card">
            <h4>Карточка 2</h4> <p>Пустота</p>
          </div>
        </div>
      </div>

      <div className="block">
        <h5>Интерактив?</h5>
        <input type="text" placeholder="Напишите тут что-нибудь" />
        <Button onClick={() => navigate('#')}>
          Вывести текст в alert
          <AlertIcon />
        </Button>
      </div>
    </div>
  );
};
