import { useForm, SubmitHandler } from 'react-hook-form';
import type { SearchInputs } from 'types/search';

type SearchFormProps = {
  onSubmit: SubmitHandler<SearchInputs>;
};

const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchInputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">username</label>
      <input
        {...register('username', { required: true })}
        type="text"
        id="username"
        placeholder="Search for users or organizations"
        defaultValue={undefined}
        className="w-full rounded border p-2"
      />
      {errors.username && (
        <span>
          Must provide a term for search. Empty searches are not allowed.
        </span>
      )}

      <input type="submit" />
    </form>
  );
};

export default SearchForm;
