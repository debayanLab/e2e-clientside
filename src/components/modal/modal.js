import './modal.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="header">
          <a class="close" href="#" onClick={handleClose}>&times;</a>
          <h3>Forward message to</h3>
        </div>  
        <div className="modal-content">
          <h2>ALL CONTACTS</h2>
          {children}
        </div>
      </section>
    </div>
  );
};

export default Modal;