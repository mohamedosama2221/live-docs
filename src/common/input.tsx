import { Input } from "@/components/ui/input";
import { GenericInputProps } from "@/types";

const GenericInput = ({
  title,
  ref,
  settitle,
  updateTitleHandler,
}: GenericInputProps) => {
  return (
    <Input
      defaultValue={title}
      ref={ref}
      onChange={(e) => settitle(e.target.value)}
      onKeyDown={updateTitleHandler}
    />
  );
};

export default GenericInput;
