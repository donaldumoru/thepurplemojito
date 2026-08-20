import { FaInstagram } from 'react-icons/fa';
import Text from './Text';

function Footer() {
  return (
    <footer className="mx-4 flex flex-col items-center justify-center border-t-[1.5px] border-(--dark-shade) py-20 sm:mx-6 md:mx-10 xl:mx-36">
      <a href="https://instagram.com/thepurplemojito" target="_blank">
        <FaInstagram className="aspect-square h-full w-6 dark:fill-(--dark-primary)" />
      </a>

      <Text
        type="p"
        className="mt-4 font-(family-name:--footer) text-[2rem] font-bold"
      >
        The Purple Mojito
      </Text>

      <Text type="p" className="font-(family-name:--subtitle) text-xl">
        &copy; {new Date().getFullYear()}
      </Text>
    </footer>
  );
}

export default Footer;
