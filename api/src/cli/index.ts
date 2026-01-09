import { Command } from "commander";

const program = new Command();

// loggerが絡む場合はプロセス管理要注意 https://github.com/vorkers/openwork-career/pull/1954
program
  .command("calculate")
  .description("二つの引数から足し算を実行するサンプルコマンド")
  .option("--numberX <Xの値>")
  .option("--numberY <Yの値>")
  .action(async (options: { numberX: string, numberY: string }) => {
    // 時間がかかる処理
    await new Promise(resolve => setTimeout(resolve, 10000));
    const answer = Number(options.numberX) + Number(options.numberY)
    console.log(`calculateコマンドの実行結果: ${answer}`);
    process.exit(0);
  });
  
program.parse(process.argv);
