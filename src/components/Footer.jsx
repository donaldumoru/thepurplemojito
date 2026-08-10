import { CiInstagram } from 'react-icons/ci';
import Text from './Text';

function Footer() {
  return (
    <footer className="mx-4 flex flex-col items-center justify-center py-20 sm:mx-6 md:mx-10 xl:mx-36">
      <a href="https://instagram.com/thepurplemojito" target="_blank">
        <CiInstagram className="mt-4 aspect-square h-full w-6 dark:fill-(--dark-primary)" />
      </a>

      <Text type="p" className="font-(family-name:--footer) text-[2rem]">
        The Purple Mojito
      </Text>

      <Text type="p" className="font-(family-name:--subtitle) text-xl">
        &copy; {new Date().getFullYear()}
      </Text>
    </footer>
  );
}

export default Footer;
