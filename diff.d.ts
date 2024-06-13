// Declare the `diff` namespace.
declare namespace diff {

  // Define the Diff type which represents a tuple [number, string].
  type Diff = [number, string];

  // Define a class `DiffMatchPatch` which includes the methods for the diff operations.
  class DiffMatchPatch {
      // Constructor accepts an optional options object.
      constructor(options?: DiffMatchPatchOptions);

      // Timeout in seconds for the diff operation before giving up.
      Timeout: number;
      
      // Cost of an empty edit operation.
      EditCost: number;

      /**
       * Main function to find the differences between two texts.
       * @param text1 - The old string to be diffed.
       * @param text2 - The new string to be diffed.
       * @param opt_checklines - Optional flag to indicate line-level diffing.
       * @param opt_deadline - Optional time when the diff should be complete by.
       * @returns An array of Diff tuples.
       */
      main(text1: string, text2: string, opt_checklines?: boolean, opt_deadline?: number): Diff[];

      /**
       * Computes the differences between two texts assuming no common prefix or suffix.
       * @param text1 - The old string to be diffed.
       * @param text2 - The new string to be diffed.
       * @param checklines - Whether to perform line-level diffing.
       * @param deadline - The time by which the diff operation must be complete.
       * @returns An array of Diff tuples.
       */
      private compute_(text1: string, text2: string, checklines: boolean, deadline: number): Diff[];

      /**
       * Quick line-level diffing on both strings, then re-diff for accuracy.
       * @param text1 - The old string to be diffed.
       * @param text2 - The new string to be diffed.
       * @param deadline - The time by which the diff operation must be complete.
       * @returns An array of Diff tuples.
       */
      private lineMode_(text1: string, text2: string, deadline: number): Diff[];

      /**
       * Finds the 'middle snake' of a diff, splits the problem in two, and recurses.
       * @param text1 - The old string to be diffed.
       * @param text2 - The new string to be diffed.
       * @param deadline - The time by which the diff operation must be complete.
       * @returns An array of Diff tuples.
       */
      private bisect_(text1: string, text2: string, deadline: number): Diff[];

      /**
       * Given the location of the 'middle snake', splits the diff in two and recurses.
       * @param text1 - The old string to be diffed.
       * @param text2 - The new string to be diffed.
       * @param x - Index of split point in text1.
       * @param y - Index of split point in text2.
       * @param deadline - The time by which the diff operation must be complete.
       * @returns An array of Diff tuples.
       */
      private bisectSplit_(text1: string, text2: string, x: number, y: number, deadline: number): Diff[];

      /**
       * Splits two texts into an array of strings and reduces them to a string of hashes.
       * @param text1 - The first string.
       * @param text2 - The second string.
       * @returns An object containing the encoded text1, encoded text2, and the array of unique strings.
       */
      private linesToChars_(text1: string, text2: string): {
          chars1: string,
          chars2: string,
          lineArray: string[]
      };
  }

  // Interface for options that can be passed to the DiffMatchPatch constructor.
  interface DiffMatchPatchOptions {
      timeout?: number;
      editCost?: number;
  }

  // Constants representing diff operations.
  const DIFF_DELETE: number;
  const DIFF_INSERT: number;
  const DIFF_EQUAL: number;
}
