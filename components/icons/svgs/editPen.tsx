export default function EditPen({
  size,
  colour,
}: {
  size?: number;
  colour?: string;
}) {
  return (
    <svg
      width={size ?? "16"}
      height={size ?? "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4086 0C11.2264 3.69503e-05 11.0517 0.0721466 10.9226 0.200578L0.197956 10.9212C0.0701475 11.051 -0.00100296 11.2262 1.06839e-05 11.4085V15.3055C-0.000685733 15.4883 0.0711978 15.6639 0.199943 15.7936C0.328688 15.9234 0.503751 15.9967 0.686538 15.9974H4.58359C4.67441 15.9974 4.76429 15.9794 4.84815 15.9446C4.93201 15.9097 5.00813 15.8586 5.07217 15.7942L15.7968 5.07492C15.8612 5.01087 15.9123 4.93473 15.9471 4.85087C15.982 4.76701 16 4.67709 16 4.58627C16 4.49545 15.982 4.40554 15.9471 4.32168C15.9123 4.23782 15.8612 4.16168 15.7968 4.09763L11.8944 0.200578C11.7653 0.0721403 11.5907 3.00679e-05 11.4086 0ZM11.4059 1.66112L14.3324 4.58627L4.29836 14.619H1.37855V11.6938L11.4059 1.66112Z"
        fill={colour ?? "#343434"}
      />
    </svg>
  );
}
