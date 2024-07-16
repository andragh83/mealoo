export default function TextAreaInput({
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
    <div className="flex flex-col gap-1 items-end">
      <textarea
        name={name}
        required
        className="bg-white dark:bg-zinc-700 border min-h-32 lg:min-h-20 border-zinc-300 dark:border-zinc-600  rounded-md px-4 py-2 w-full text-sm focus:outline-primary placeholder:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        maxLength={200}
      />
      <span className="text-xs font-raleway_light text-zinc-500">
        Max 200 characters
      </span>
    </div>
  );
}
