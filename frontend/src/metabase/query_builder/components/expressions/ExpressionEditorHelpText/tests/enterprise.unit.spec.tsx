import { createMockMetadata } from "__support__/metadata";
import { screen } from "__support__/ui";
import { checkNotNull } from "metabase/lib/types";
import { getHelpText } from "metabase-lib/v1/expressions/helper-text-strings";
import {
  SAMPLE_DB_ID,
  createSampleDatabase,
} from "metabase-types/api/mocks/presets";

import type { SetupOpts } from "./setup";
import { setup as baseSetup } from "./setup";

async function setup(opts: SetupOpts) {
  await baseSetup({ hasEnterprisePlugins: true, ...opts });
}

describe("ExpressionEditorHelpText (EE without token)", () => {
  const metadata = createMockMetadata({ databases: [createSampleDatabase()] });
  const database = checkNotNull(metadata.database(SAMPLE_DB_ID));

  describe("Metabase links", () => {
    const helpText = getHelpText("concat", database, "UTC");

    it("should show a help link when `show-metabase-links: true`", async () => {
      await setup({ helpText, showMetabaseLinks: true });

      expect(
        screen.getByRole("img", { name: "reference icon" }),
      ).toBeInTheDocument();
      expect(screen.getByText("Learn more")).toBeInTheDocument();
    });

    it("should show a help link when `show-metabase-links: false`", async () => {
      await setup({ helpText, showMetabaseLinks: false });

      expect(
        screen.getByRole("img", { name: "reference icon" }),
      ).toBeInTheDocument();
      expect(screen.getByText("Learn more")).toBeInTheDocument();
    });
  });
});
