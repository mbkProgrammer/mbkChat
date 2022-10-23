import { signInWithEmailAndPassword } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_IN_USER_ACTION } from '../actions/auth';

const signIn = () => {
  const [signInInfo, setsignInInfo] = useState({});
  const [error, setError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setError(auth.signInError);
    setSubmitLoading(auth.loading);
    if (auth.signInError) {
      setErrorMessage(auth.errorMessage.code);
    }
    if (auth.response && auth.response.uid !== '') {
      router.push('/');
    }
  }, [auth]);

  const handleOnChange = (name, e) => {
    setsignInInfo({
      ...signInInfo,
      [name]: e.target.value,
    });
  };

  const handleSubmitSignIn = async (e) => {
    dispatch(SIGN_IN_USER_ACTION({ email: signInInfo.email, password: signInInfo.password }));
    e.preventDefault();
  };

  return (
    <div className="signIn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmitSignIn} className="max-w-xs flex flex-col rounded-xl items-center p-4 bg-gray-500/50 backdrop-blur">
        <Image src="/assets/img/user.png" width="100" height="100" alt="placeholder profile image" className="rounded-full my-4 mx-1" />
        <input onChange={(e) => handleOnChange('email', e)} type="email" required placeholder="email" autoComplete="email" className="my-2 mx-1 p-1 outline-none border-b-2 text-white text-lg border-gray-400 bg-transparent focus:border-blue-500 placeholder:text-gray-200" />
        <input onChange={(e) => handleOnChange('password', e)} type="password" required placeholder="password" autoComplete="password" className="my-2 mx-1 p-1 outline-none border-b-2 text-white text-lg border-gray-400 bg-transparent focus:border-blue-500 placeholder:text-gray-200" />
        <button
          disabled={submitLoading}
          type="submit"
          className=" flex items-center justify-center w-full py-2 mt-4 text-xl bg-blue-500 text-white rounded-lg disabled:bg-blue-400"
        >
          {submitLoading ? (<AiOutlineLoading className="animate-spin h-5 w-5 mr-3" />) : ''}
          Submit
        </button>
        <div className="text-blue-300 mt-2 mx-1">
          <Link href="/signUp">Don't have an account? sign up.</Link>
        </div>
        <p className="text-red-700 text-lg">{error ? `Error: ${errorMessage}` : ''}</p>
      </form>
    </div>
  );
};

export default signIn;
