import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
const fetcher = async (url) => {
  const { data } = await axios.post(url);

  return data;
};

export const Board = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const { data, error } = useSWR(`http://localhost:8000/${username}`, fetcher);

  if (!data && !error) {
    return (
      <div className='min-h-screen grid place-items-center text-2xl font-bold'>
        Loading...
      </div>
    );
  }

  return (
    <div className='min-h-screen grid place-items-center'>
      <div className='p-6 rounded border flex flex-col gap-4'>
        <button
          className='text-lg font-semibold px-4 py-2 bg-indigo-800 text-white rounded shadow'
          onClick={() => navigate(`/${username}/add-topic`)}>
          Add Topic
        </button>
        <div className='flex flex-col gap-2'>
          {data.textData.map((item) => (
            <div
              key={item.id}
              className='flex items-center justify-between p-2 rounded shadow border gap-8'>
              <p>{JSON.parse(item.data).title}</p>
              <button
                className='text-lg font-semibold px-4 py-2 bg-indigo-800 text-white rounded shadow'
                onClick={() => navigate(`/${username}/${item.id}/edit`)}>
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
