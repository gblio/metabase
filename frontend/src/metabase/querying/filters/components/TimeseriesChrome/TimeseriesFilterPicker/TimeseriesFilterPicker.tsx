import { useMemo, useState } from "react";
import { t } from "ttag";

import { Button, Icon, Popover } from "metabase/ui";
import * as Lib from "metabase-lib";

import { SimpleDateFilterPicker } from "../../FilterPicker/DateFilterPicker/SimpleDateFilterPicker";

export interface TimeseriesFilterPickerProps {
  query: Lib.Query;
  stageIndex: number;
  column: Lib.ColumnMetadata;
  filter?: Lib.FilterClause;
  onChange: (newFilter: Lib.ExpressionClause | undefined) => void;
}

export function TimeseriesFilterPicker({
  query,
  stageIndex,
  column,
  filter,
  onChange,
}: TimeseriesFilterPickerProps) {
  const [isOpened, setIsOpened] = useState(false);

  const filterName = useMemo(() => {
    return filter
      ? Lib.filterArgsDisplayName(query, stageIndex, filter)
      : t`All time`;
  }, [query, stageIndex, filter]);

  const handleButtonClick = () => {
    setIsOpened(!isOpened);
  };

  const handleFilterChange = (newFilter: Lib.ExpressionClause | undefined) => {
    onChange(newFilter);
    setIsOpened(false);
  };

  return (
    <Popover opened={isOpened} onChange={setIsOpened}>
      <Popover.Target>
        <Button
          rightSection={<Icon name="chevrondown" />}
          data-testid="timeseries-filter-button"
          onClick={handleButtonClick}
        >
          {filterName}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <SimpleDateFilterPicker
          query={query}
          stageIndex={stageIndex}
          column={column}
          filter={filter}
          onChange={handleFilterChange}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
