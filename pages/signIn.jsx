import { signInWithEmailAndPassword } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { auth } from '../firebase';

const signIn = () => {
  const [signInInfo, setsignInInfo] = useState({});
  const [error, setError] = useState(false);

  const handleOnChange = (name, e) => {
    setsignInInfo({
      ...signInInfo,
      [name]: e.target.value,
    });
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    const res = await signInWithEmailAndPassword(auth, signInInfo.email, signInInfo.password);
    console.log('res :>> ', res);
  };

  return (
    <div className="signIn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmitSignIn} className="flex flex-col rounded-xl items-center p-4 bg-gray-500/50 backdrop-blur">
        <Image src="/assets/img/user.png" width="100" height="100" alt="placeholder profile image" className="rounded-full my-4 mx-1" />
        <input onChange={(e) => handleOnChange('email', e)} type="email" required placeholder="email" autoComplete="email" className="my-2 mx-1 p-1 outline-none border-b-2 text-white text-lg border-gray-400 bg-transparent focus:border-blue-500 placeholder:text-gray-200" />
        <input onChange={(e) => handleOnChange('password', e)} type="password" required placeholder="password" autoComplete="password" className="my-2 mx-1 p-1 outline-none border-b-2 text-white text-lg border-gray-400 bg-transparent focus:border-blue-500 placeholder:text-gray-200" />
        <input type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg" />
        <div className="text-blue-300 mt-2 mx-1">
          <Link href="/signUp">Don't have an account? sign up.</Link>
        </div>
        <p className="text-red-700 text-lg">{error ? 'Something went wrong!!' : ''}</p>
      </form>
    </div>
  );
};

export default signIn;
