const fs = require("fs");
const path = require("path");

function generateEnvExample(dirPath) {
  const envPath = path.join(dirPath, ".env");
  const examplePath = path.join(dirPath, ".env.example");

  if (!fs.existsSync(envPath)) {
    console.error(".env file not found in the specified directory.");
    return;
  }

  const envContent = fs.readFileSync(envPath, "utf8");
  const exampleContent = envContent
    .split("\n")
    .map((line) => {
      if (line.trim() === "" || line.startsWith("#")) {
        return line;
      }
      const parts = line.split("=");
      const key = parts[0];
      return `${key}=`;
    })
    .join("\n");

  fs.writeFileSync(examplePath, exampleContent);
  console.log(".env.example generated successfully.");
}

// Usage: node script.js /path/to/directory
const dirPath = process.argv[2];
if (!dirPath) {
  console.error("Please provide a directory path as an argument.");
  process.exit(1);
}

generateEnvExample(dirPath);
