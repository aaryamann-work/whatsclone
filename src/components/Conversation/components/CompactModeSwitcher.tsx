import { Switch } from "@/components/ui/switch";

type Props = {
  enabled: boolean;
  onChange: (value: boolean) => void;
};

export const CompactModeSwitcher = ({ enabled, onChange }: Props) => (
  <div className="d-flex gap-1">
    <Switch checked={enabled} onCheckedChange={onChange} />
    Compact
  </div>
);
