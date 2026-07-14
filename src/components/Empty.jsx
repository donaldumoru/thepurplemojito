import stamp from '../assets/icons/stamp1.webp';

function Empty({ isEmpty = false, searchQuery, children }) {
  return (
    <section className="empty-container">
      <div>
        <img src={stamp} alt="" />
      </div>

      <div className="empty-container-text">
        {isEmpty ? (
          <>
            <h2>No memories have been published yet</h2>

            <p>Come back soon</p>
          </>
        ) : (
          <>
            <h2>
              No memories about{' '}
              <span className="postcard-query">"{searchQuery}"</span> yet
            </h2>

            <p>But these memories might interest you instead</p>
          </>
        )}
      </div>

      {children}
    </section>
  );
}

export default Empty;
