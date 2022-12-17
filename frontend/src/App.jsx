import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await axios.post(`http://localhost:8000/${data.username}`);
    console.log(response);
    if (response.status === 201) {
      navigate(`/${data.username}`);
    }
  };

  return (
    <div className='min-h-screen grid place-items-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4 border p-4 rounded-md'>
        <div className='flex flex-col gap-1'>
          <input
            placeholder='Username'
            {...register('username', {
              required: true,
            })}
            className='p-2 border shadow rounded'
          />
          {errors.username && (
            <span className='text-xs text-red-500 '>
              This field is required
            </span>
          )}
        </div>
        <button
          type='submit'
          className='bg-cyan-700 p-2 rounded text-lg font-semibold text-white'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
