import { useState } from "react";

// TODO - For sanity break these out into their own components.
// Can some of them be shared or are they crm specific

// ui
import * as Text from "@repo/ui/components/ui/text";
import { Button } from "@repo/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Toggle } from "@repo/ui/components/ui/toggle";
import { IconButton, iconSize } from "@repo/ui/components/ui/icon-button";
import { Plus, Trash } from "lucide-react";

// utils
import { cn } from "@repo/ui/lib/utils";

// constants
const conditionsSelect = [
  { value: "if1", text: "Visit is added" },
  { value: "if2", text: "Visit is completed" },
  { value: "if3", text: "Meeeting is completed" },
  { value: "if4", text: "Invoice becomes past due" },
  { value: "if5", text: "Work request is submitted" },
  { value: "if6", text: "Estimate is sent" },
];

// types
type toggleValue = "and" | "or";
type IfBlockShape = {
  blockType: "if";
  toggleValue?: toggleValue;
  selectValue?: string;
  canDelete: boolean;
  dependents?: [];
};

type IfBlockProps = IfBlockShape & {
  onDelete?: () => void;
};

export const IfBlock = ({ canDelete, ...props }: IfBlockProps) => {
  const [value, setValue] = useState<string | undefined>();
  const [toggleValue, setToggleValue] = useState<string | undefined>();

  return (
    <div className="flex flex-row gap-3 items-center">
      {canDelete ? (
        <Toggle size={"sm"} variant={"and-or"} />
      ) : (
        <Text.Body className="uppercase" weight="bold">
          If
        </Text.Body>
      )}

      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[180px] flex-1">
          <SelectValue placeholder="Select a condition" />
        </SelectTrigger>
        <SelectContent>
          {conditionsSelect.map((condition, i) => (
            <SelectItem key={i} value={condition.value}>
              {condition.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {canDelete && (
        <IconButton size="md" variant={"ghost"}>
          <Trash size={iconSize.md} />
        </IconButton>
      )}
    </div>
  );
};

const newBlock: IfBlockShape = {
  blockType: "if",
  toggleValue: "and",
  selectValue: undefined,
  canDelete: true,
  dependents: [],
};

export const IfBuilder = () => {
  const [blocks, setBlocks] = useState<IfBlockShape[]>([
    {
      blockType: "if",
      toggleValue: "and",
      selectValue: undefined,
      canDelete: false,
      dependents: [],
    },
    {
      ...newBlock,
    },
  ]);

  function addNewBlock() {
    setBlocks((cv) => {
      return [
        ...cv,
        {
          ...newBlock,
        },
      ];
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, i) => (
        <IfBlock key={i} {...block} />
      ))}
      <div className="flex flex-row gap-3 items-center">
        <Button variant="ghost" intent={"action"} onClick={addNewBlock}>
          <Plus />
          Add condition
        </Button>
      </div>
    </div>
  );
};

const thenOptions = [
  { value: "then01", text: "Email customer" },
  { value: "then02", text: "Email company owner" },
  { value: "then03", text: "Email employee" },
  { value: "then04", text: "Add a tag to customer" },
  { value: "then05", text: "Remove a tag from customer" },
  { value: "then06", text: "Text customer" },
  { value: "then07", text: "Text company owner" },
];

const thenTemplateOptions = [
  { value: "thenTemplate01", text: "Positive review request" },
  { value: "thenTemplate02", text: "Check for customer review" },
  { value: "thenTemplate03", text: "Pick up your dog shit!" },
  { value: "thenTemplate04", text: "Unpaid balance (1st reminder)" },
  { value: "thenTemplate05", text: "Unpaid balance (2nd reminder)" },
  { value: "thenTemplate06", text: "Unpaid balance (Final reminder)" },
  { value: "thenTemplate07", text: "We'll be in touch" },
  { value: "thenTemplate08", text: "Contact potential customer" },
  { value: "thenTemplate09", text: "Estimate follow up 1" },
  { value: "thenTemplate10", text: "Estimate follow up 2" },
  { value: "thenTemplate11", text: "Estimate follow up 3" },
];

export const ThenBlock = () => {
  const canDelete = true;
  const showTemplateBlock = true;
  return (
    <div className="flex flex-col gap-4">
      {/* row */}
      <div className="flex flex-row gap-3 items-center">
        {/* if */}
        <Text.Body className="uppercase" weight="bold">
          {canDelete ? "And" : "Then"}
        </Text.Body>

        <Select>
          <SelectTrigger className="w-[180px] flex-1">
            <SelectValue placeholder="Select a condition" />
          </SelectTrigger>
          <SelectContent>
            {thenOptions.map((condition, i) => (
              <SelectItem key={i} value={condition.value}>
                {condition.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* conditionals */}

        {/* Template Dropdown */}
        <Text.Body>the template</Text.Body>
        <Select>
          <SelectTrigger className="w-[180px] flex-1">
            <SelectValue placeholder="Select a condition" />
          </SelectTrigger>
          <SelectContent>
            {thenTemplateOptions.map((condition, i) => (
              <SelectItem key={i} value={condition.value}>
                {condition.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {canDelete && (
          <IconButton size="md" variant={"ghost"}>
            <Trash size={iconSize.md} />
          </IconButton>
        )}
      </div>
      <div className="flex flex-row gap-3 items-center">
        <Button variant="ghost" intent={"action"}>
          <Plus />
          Add Action
        </Button>
      </div>
    </div>
  );
};

export const ThenBuilder = () => {
  const [blockCount, setBlockCount] = useState(1);
  return (
    <div className="flex flex-col gap-4">
      <div>then builder</div>
      {/* row */}
      {/* {Array.from(Array(blockCount)).map((block, i) => (
        <IfBlock key={i} />
      ))} */}
      <div className="flex flex-row gap-3 items-center">
        <Button
          variant="ghost"
          intent={"action"}
          onClick={() => {
            setBlockCount((cv) => ++cv);
          }}
        >
          <Plus />
          Add condition
        </Button>
      </div>
    </div>
  );
};

export const StopBlock = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-3 items-center">
        <Button variant="ghost" intent="danger">
          <Plus />
          Add STOP condition
        </Button>
      </div>
    </div>
  );
};

type foo = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const NestedCard = ({ className, ...props }: foo) => {
  return (
    <div
      className={cn(
        "border border-solid border-gray-300 px-4 py-4 rounded bg-gray-50",
        className,
      )}
      {...props}
    />
  );
};

export const Divider = ({ className, ...props }: foo) => {
  return (
    <div className={cn("h-[1px] w-full bg-gray-300", className)} {...props} />
  );
};
