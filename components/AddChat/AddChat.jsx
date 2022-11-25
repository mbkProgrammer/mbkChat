import { useState, useEffect } from 'react';
import { BiCloset } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { collection, query, where } from 'firebase/firestore';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { db } from '../../firebase';
import { ADD_CHAT_ACTION } from '../../actions';

const AddChat = ({ openAddChat, setOpenAddChat }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const { loading, error, errorMes } = useSelector((state) => state.chats);

  useEffect(() => {
    setEmail('');
  }, [openAddChat]);

  const handleAddChat = async () => {
    // dispatch()
    dispatch(ADD_CHAT_ACTION({ email, setOpenAddChat }));
  };

  return (
    <div
      className={`fixed inset-0 z-30 overflow-y-auto bg-gray-800 bg-opacity-60 ${
        !openAddChat ? 'hidden' : ''
      }`}
    >
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 rounded">
        <div className="relative overflow-hidden rounded-lg bg-white">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h1 className="text-2xl text-center mt-0 mb-2">Add Chat</h1>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="email"
              autoComplete="email"
              className="my-2 mt-4 mx-1 p-1 w-64 outline-none border-b-2 text-black text-lg border-gray-800 bg-transparent focus:border-blue-500 placeholder:text-gray-600"
            />
            <p className="text-red-600 text-md mt-4 mb-0">
              {error ? errorMes : ''}
            </p>
          </div>
          <div className="bg-gray-50 py-3 flex flex-row-reverse px-6">
            <button
              type="button"
              disabled={loading}
              className="bg-blue-600 px-4 py-2 rounded-md text-white flex items-center justify-center"
              onClick={handleAddChat}
            >
              {
              loading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin mr-1" />
                  loading
                </>
              ) : 'Start Chat'
            }

            </button>
            <button
              onClick={() => setOpenAddChat(false)}
              type="button"
              className="border-gray-400 bg-blue-50 border-2 mx-2 px-4 py2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChat;
