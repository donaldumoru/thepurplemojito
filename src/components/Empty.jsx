import stamp from '../assets/icons/stamp.webp';

function Empty({ children }) {
  return (
    <section className="empty-container">
      <div>
        <img src={stamp} alt="image of a stamp" />
      </div>
      {children}
    </section>
  );
}

export default Empty;
