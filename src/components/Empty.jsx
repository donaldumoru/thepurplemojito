import stamp from '../assets/icons/stamp.webp';

function Empty({ children }) {
  return (
    <section className="my-16 flex w-full flex-col items-center">
      <div className="max-w-1/2 sm:max-w-1/6">
        <img className="w-full" src={stamp} alt="image of a stamp" />
      </div>
      {children}
    </section>
  );
}

export default Empty;
