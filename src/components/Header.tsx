import Link from 'next/link';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className=" bg-blue-900 pt-6 pb-16 md:px-64 px-4 text-white">
      <div className='flex justify-between text-center items-center font-bold'>
        <div>Noir Libs</div>
        <Link href={'https://t.me/walnuthq'} className='flex gap-2 items-center hover:text-blue-300 transition-all delay-75 cursor-pointer'>
        <span className="[&>svg]:h-6 [&>svg]:w-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 496 512">
            <path
              d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
          </svg>
        </span>
          Join us on Telegram!
        </Link>
      </div>
      <h1 className="text-4xl font-bold text-center mt-32">
        <a href="https://noir-lang.org/" target="_blank" className="text-blue-400 hover:text-blue-300 transition-all delay-75 cursor-pointer">Noir</a> packages registry for{' '}
        <a href="https://aztec.network/learn" target="_blank" className="text-blue-400 hover:text-blue-300 transition-all delay-75 cursor-pointer">Aztec Network</a>
      </h1>
      <div className='flex justify-center mt-24'>
        <Button  className='font-bold bg-blue-500 bg-opacity-55 hover:bg-blue-600 text-center text-white'>{'curl -L <url-to-install-noir-libs-cmd>'}</Button>
      </div>
      
    </header>
  );
};

export default Header;