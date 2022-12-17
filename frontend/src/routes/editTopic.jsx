import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';

const fetcher = async (url) => {
  const { data } = await axios.get(url);

  return data;
};

export const EditTopic = () => {
  const { textid, username } = useParams();
  const { data, error } = useSWR(
    `http://localhost:8000/${username}/${textid}/get`,
    fetcher
  );
  console.log(data);
  if (!error && !data) {
    return <div>Loading...</div>;
  }

  const textData = JSON.parse(data.data);
  console.log(textData);

  return (
    <div className='grid min-h-screen place-items-center'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>{textData.title}</h1>
        <div>
          {textData.text.map((item) => (
            <button key={item.id}>{item.string}</button>
          ))}
        </div>
      </div>
    </div>
  );
};
