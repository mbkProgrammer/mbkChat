import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { AiOutlineLoading } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { auth, db, storage } from '../firebase';

const signUp = () => {
  const [signUpProfileImgLink, setSignUpProfileImgLink] = useState('');
  const [signUpInfo, setSignUpInfo] = useState({});
  const [uploadSnapshot, setUploadSnapshot] = useState('upload profile');
  const [error, setError] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const router = useRouter();

  const metadata = {
    contentType: 'image/jpeg',
  };

  const handleChangeProfile = async (e) => {
    if (e) e.preventDefault();
    const storageRef = await ref(storage, `images/${e.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0], metadata);
    setDisableSubmit(true);
    setImageUploadLoading(true);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadSnapshot(`Upload is ${progress}% done`);
        switch (snapshot.state) {
          case 'paused':
            setUploadSnapshot('Upload is paused');
            setDisableSubmit(false);
            setImageUploadLoading(false);
            break;
          case 'running':
            setUploadSnapshot('Upload is running');
            setDisableSubmit(true);
            setImageUploadLoading(true);
            break;
          default:
        }
      },
      (error) => {
        console.log('error', error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadSnapshot('Upload is finished');
          setSignUpProfileImgLink(downloadURL);
          setDisableSubmit(false);
          setImageUploadLoading(false);
        });
      },
    );
  };

  const handleOnChange = (name, e) => {
    setSignUpInfo({
      ...signUpInfo,
      [name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmitLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        signUpInfo.email,
        signUpInfo.password,
      );
      await updateProfile(auth.currentUser, {
        displayName: signUpInfo.displayName,
        photoURL: signUpProfileImgLink,
      });
      await setDoc(doc(db, 'users', res.user.uid), {
        uid: res.user.uid,
        displayName: signUpInfo.displayName,
        email: signUpInfo.email,
        photoURL: signUpProfileImgLink,
      });
      await setDoc(doc(db, 'userChats', res.user.uid), {});
      setSubmitLoading(false);
      setError(false);
      router.push('./');
    } catch (error) {
      setSubmitLoading(false);
      console.log('error', error);
      setError(true);
    }
  };

  return (
    <div className="signUp bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col rounded-xl items-center p-4 bg-gray-500/50 backdrop-blur"
      >
        <label
          htmlFor="profile-upload"
          className="relative cursor-pointer flex flex-col items-center mx-1 my-3"
        >
          <Image
            src={signUpProfileImgLink || '/assets/img/user.png'}
            width="100"
            height="100"
            alt="placeholder profile image"
            className="rounded-full"
          />
          <span className="text-gray-100">
            {uploadSnapshot}
            {imageUploadLoading ? (<AiOutlineLoading className="animate-spin h-5 w-5 ml-3 inline" />) : ''}
          </span>
          <input
            id="profile-upload"
            name="profile-upload"
            type="file"
            className="sr-only"
            onChange={handleChangeProfile}
          />
        </label>
        <input
          onChange={(e) => handleOnChange('displayName', e)}
          type="text"
          required
          placeholder="User Name"
          autoComplete="username"
          className="my-2 mx-1 p-1 outline-none border-b-2 text-white text-lg border-gray-400 bg-transparent focus:border-blue-500 placeholder:text-gray-200"
        />
        <input
          onChange={(e) => handleOnChange('email', e)}
          type="email"
          required
          placeholder="email"
          autoComplete="email"
          className="my-2 mx-1 p-1 outline-none border-b-2 text-white text-lg border-gray-400 bg-transparent focus:border-blue-500 placeholder:text-gray-200"
        />
        <input
          onChange={(e) => handleOnChange('password', e)}
          type="password"
          required
          placeholder="password"
          autoComplete="password"
          className="my-2 mx-1 p-1 outline-none border-b-2 text-white text-lg border-gray-400 bg-transparent focus:border-blue-500 placeholder:text-gray-200"
        />
        <button
          disabled={disableSubmit}
          type="submit"
          className=" flex items-center justify-center w-full py-2 mt-4 text-xl bg-blue-500 text-white rounded-lg disabled:bg-blue-400"
        >
          {submitLoading ? (<AiOutlineLoading className="animate-spin h-5 w-5 mr-3" />) : ''}
          Submit
        </button>
        <div className="text-blue-300 mt-2 mx-1">
          <Link href="/signIn">Do you have an account? sign in.</Link>
        </div>
        <p>{error ? 'Something went wrong!!' : ''}</p>
      </form>
    </div>
  );
};

export default signUp;
