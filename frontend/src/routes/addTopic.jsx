import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

export const AddTopic = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const structTextData = data.text
      .split(/[ .:;?!~,`"&|()<>{}\[\]\r\n/\\]+/)
      .map((string, idx) => {
        return {
          id: idx,
          string: string,
          understood: false,
          somewhat_understood: false,
          not_clear: false,
          what_rubbish: false,
        };
      });

    const structuredData = JSON.stringify({
      title: data.title,
      text: structTextData,
    });

    const respose = await axios.post(
      `http://localhost:8000/${username}/${data.title}`,
      {
        data: structuredData,
      }
    );

    if (respose.status === 201) {
      navigate(`/${username}`);
    }
  };

  return (
    <div className='grid place-items-center min-h-screen'>
      <form
        className='p-4 rounded shadow border flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}>
        <section className='flex flex-col gap-2'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            className='rounded shadow p-2 border'
            {...register('title', {
              required: true,
            })}
          />
          {errors?.title && (
            <small className='text-xs text-red-700'>Please enter a title</small>
          )}
        </section>
        <section className='flex flex-col gap-2'>
          <label htmlFor='text'>Text</label>
          <textarea
            name='text'
            id=''
            cols='30'
            rows='10'
            className='rounded shadow p-2 border'
            {...register('text', {
              required: true,
            })}></textarea>
          {errors?.text && (
            <small className='text-xs text-red-700'>Please enter text</small>
          )}
        </section>
        <button
          type='submit'
          className='p-2 rounded bg-cyan-700 text-white font-semibold'>
          Submit
        </button>
      </form>
    </div>
  );
};
