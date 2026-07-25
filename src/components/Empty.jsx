import stamp from '../assets/icons/stamp.webp';

function Empty({ children }) {
  return (
    <section className="flex w-full flex-col items-center sm:my-16">
      <div className="max-w-1/2 sm:max-w-1/6">
        <img className="w-full" src={stamp} alt="image of a stamp" />
      </div>
      {children}
    </section>
  );
}

export default Empty;
