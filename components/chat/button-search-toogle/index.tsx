import { Toggle } from '@/components/ui/toggle';
import { Search } from 'lucide-react';
import { memo } from 'react';

interface ButtonSearchToggleProps {
  onToggle?: (mode: boolean) => void;
  disabled?: boolean;
}

function PureButtonSearchToggle(props: ButtonSearchToggleProps) {
  const { onToggle, disabled } = props;
  return (
    <Toggle
      data-testid="search-button"
      className="h-fit rounded-full border p-2 dark:border-zinc-600 data-[state=on]:bg-sky-300/30 data-[state=on]:text-blue-500 data-[state=on]:border-transparent dark:data-[state=on]:border-transparent dark:data-[state=on]:bg-blue-500/20 dark:data-[state=on]:text-blue-500 text-sm"
      onPressedChange={state => {
        onToggle?.(state);
      }}
      disabled={disabled}
    >
      <Search size={14} />
      <span>Search for subcontractors</span>
    </Toggle>
  );
}

export const ButtonSearchToggle = memo(PureButtonSearchToggle, (prevProps, nextProps) => {
  if (prevProps.disabled !== nextProps.disabled) return false;
  return true;
});
