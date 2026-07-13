import stamp from '../assets/icons/stamp1.webp';

function Empty({ searchQuery, children }) {
  return (
    <section className="empty-container">
      <div>
        <img src={stamp} alt="" />
      </div>

      <div className="empty-container-text">
        <h2>
          No memories about{' '}
          <span className="postcard-query">"{searchQuery}"</span> yet
        </h2>

        <p>But these memories might interest you instead</p>
      </div>

      {children}
    </section>
  );
}

export default Empty;
