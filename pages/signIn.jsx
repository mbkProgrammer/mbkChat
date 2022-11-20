import { signInWithEmailAndPassword } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_IN_USER_ACTION } from '../actions/auth';
import firebaseAdmin from '../firebaseAdmin';

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
export const getStaticProps = async ({ ctx }) => {
  try {
    const token = await firebaseAdmin.auth().verifyIdToken('eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ3YjE5MTI0MGZjZmYzMDdkYzQ3NTg1OWEyYmUzNzgzZGMxYWY4OWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWJrY2hhdC01Yjk5NiIsImF1ZCI6Im1ia2NoYXQtNWI5OTYiLCJhdXRoX3RpbWUiOjE2NjgwOTA0MjIsInVzZXJfaWQiOiJXd0ZRRXV2OHE5UjZOSWt3amRJYlBWbk10TW0yIiwic3ViIjoiV3dGUUV1djhxOVI2Tklrd2pkSWJQVm5NdE1tMiIsImlhdCI6MTY2ODA5MDQyMiwiZXhwIjoxNjY4MDk0MDIyLCJlbWFpbCI6Im1ia2RkZTIwMTkuY29AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm1ia2RkZTIwMTkuY29AZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.AOsR6LoVa6EdnkoV3LPFfSo5edTqPADLwoJKI4PZ-_9A3QaaVn9tWhzdN53fU3VD7t5XD7HQwSlKE5p2TW9gLCEOjeo6YmJ4XW9IEhGdCITM9YAQ2Igxivir7GYP-_yYZH1TX1acDJTel8f1TioNumxlp4BzmQwrNxA04T_oHwn3Aw3U9300xRmwgR1boSEuL3dQzNoHTU9s3twTr_j3o5PLLJJZePLrci26TVhsXNrvtjNTdUNGIaYaRy-NtZ2kgihi9f4d5aChA1AcKZpIIIK1Ljdi30i_C2vwkXUDVVF1QJvTx92xGYZuLiL1DfcBctYARYiP_l_AoNOfZw4r6A');
    return {
      redirect: { destination: '/' },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default signIn;
