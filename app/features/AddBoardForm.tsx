function AddBoardForm() {
  const columns: { name: string }[] = [{ name: 'Todo' }];

  return (
    <form>
      <div>
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {columns.length > 0 && (
        <>
          <h2>Columns</h2>
          {columns.map(({ name }) => (
            <input value={name}></input>
          ))}
        </>
      )}
      <div>
        <button>+ Add New Column</button>
      </div>
      <div>
        <button>Create New Board</button>
      </div>
    </form>
  );
}

export { AddBoardForm };
