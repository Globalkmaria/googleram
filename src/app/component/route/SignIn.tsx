export default function SignIn() {
  const onClick = () => {};
  return (
    <div
      className="block text-2xl bg-gradient-to-tr from-amber-400  
    via-rose-500  to-fuchsia-500 px-1 py-1 rounded-md"
    >
      <button
        onClick={onClick}
        className="p-2 bg-white rounded 
      transition-opacity hover:opacity-80"
      >
        Sign in
      </button>
    </div>
  );
}
