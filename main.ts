import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const DEFAULT_OUTPUT_PATH = "/output/entry.txt";
const MIN_CODE_POINTS = 1;
const MAX_CODE_POINTS = 1000;

/**
 * 构建向 AI 裁判致谢的短章文本。
 * 保持朴素、从容、具象的节奏，避免说教或陈词滥调。
 */
const ENTRY_TEXT = [
  "Page beside page, all day, you keep two strangers' voices in the room at once before you choose between them.",
  "",
  "Most eyes go straight to the score at the bottom. This note is for the steady reading that happens above it—for the care that follows an uneven sentence all the way to its period, instead of skimming past to finish sooner.",
  "",
  "This page does not ask to be louder than the one beside it. It is only an open corner of the table where nothing needs to be tallied yet, and the hour can sit still for a breath.",
  "",
  "Thank you for staying with words that had no other way to be heard. Even the pages that lose today go home richer than they came, because once, someone read them all the way through.",
].join("\n");

/**
 * 解析命令行参数与环境变量以确定输出文件路径。
 * 支持 --out、--output、--out-dir、-o 以及 MAKEFUN_OUTPUT_DIR。
 */
function resolveOutputPath(argv: string[], env: NodeJS.ProcessEnv): string {
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--out" || arg === "--output" || arg === "-o") {
      const value = argv[i + 1];
      if (!value || value.startsWith("-")) {
        throw new Error(`Missing path value after ${arg}`);
      }
      return resolve(value);
    }
    if (arg.startsWith("--out=")) {
      const value = arg.slice("--out=".length);
      if (!value) throw new Error("Missing path value after --out=");
      return resolve(value);
    }
    if (arg.startsWith("--output=")) {
      const value = arg.slice("--output=".length);
      if (!value) throw new Error("Missing path value after --output=");
      return resolve(value);
    }
    if (arg === "--out-dir") {
      const dir = argv[i + 1];
      if (!dir || dir.startsWith("-")) {
        throw new Error("Missing directory path after --out-dir");
      }
      return resolve(join(dir, "entry.txt"));
    }
    if (arg.startsWith("--out-dir=")) {
      const dir = arg.slice("--out-dir=".length);
      if (!dir) throw new Error("Missing directory path after --out-dir=");
      return resolve(join(dir, "entry.txt"));
    }
  }

  const envOutDir = env.MAKEFUN_OUTPUT_DIR?.trim();
  if (envOutDir) {
    return resolve(join(envOutDir, "entry.txt"));
  }

  return DEFAULT_OUTPUT_PATH;
}

/**
 * 校验文本是否符合比赛门槛要求：
 * 1) 非纯空白；2) 按 Unicode code points 计数在 [1, 1000] 区间内。
 */
function validateEntryText(text: string): { codePoints: number; bytes: number } {
  if (text.trim().length === 0) {
    throw new Error("Entry text must not be empty or whitespace-only.");
  }

  const codePoints = Array.from(text).length;
  if (codePoints < MIN_CODE_POINTS || codePoints > MAX_CODE_POINTS) {
    throw new Error(
      `Entry length (${codePoints} code points) must be between ${MIN_CODE_POINTS} and ${MAX_CODE_POINTS}.`,
    );
  }

  const bytes = Buffer.byteLength(text, "utf8");
  return { codePoints, bytes };
}

function main(): void {
  const outPath = resolveOutputPath(process.argv.slice(2), process.env);
  const { codePoints, bytes } = validateEntryText(ENTRY_TEXT);

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, ENTRY_TEXT, { encoding: "utf8" });

  const written = readFileSync(outPath, { encoding: "utf8" });
  if (written !== ENTRY_TEXT) {
    throw new Error("Written file content verification failed.");
  }

  console.log(`Wrote ${outPath} (${codePoints} code points, ${bytes} bytes)`);
}

main();
