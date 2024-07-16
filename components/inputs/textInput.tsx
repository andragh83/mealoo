export default function TextInput({
  name,
  placeholder,
  value,
  onChange,
}: {
  name: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      className="bg-white dark:bg-zinc-700  border border-zinc-300 dark:border-zinc-600 rounded-md outline-none px-4 py-2 w-full text-sm focus:outline-primary placeholder:text-sm"
      name={name}
      required
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      maxLength={50}
    />
  );
}
