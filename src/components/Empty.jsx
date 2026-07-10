function Empty({ searchQuery, children }) {
  return (
    <section className="empty-container">
      <div className="postcard">
        <div></div>
        <div>
          <img className="stamp" src="src/assets/icons/stamp.png" alt="" />
        </div>
      </div>

      <div className="empty-container-text">
        <h2>
          Haven't made any memories about{' '}
          <span className="postcard-query">"{searchQuery}"</span> yet
        </h2>

        <p>But these memories might interest you instead</p>
      </div>

      {children}
    </section>
  );
}

export default Empty;
