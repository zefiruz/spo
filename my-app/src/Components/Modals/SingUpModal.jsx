import './Modal.css'

const Singnup = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation нужен, чтобы окно не закрывалось при клике внутри самой формы */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Регистрация</h2>
        <form>
          <input type="text" placeholder="Логин" />
          <button type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
}

export default Singnup;