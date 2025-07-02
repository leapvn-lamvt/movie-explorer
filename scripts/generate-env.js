const fs = require('fs');
const path = require('path');

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  return fs.readFileSync(filePath, 'utf-8')
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .reduce((env, line) => {
      const [key, ...vals] = line.split('=');
      env[key.trim()] = vals.join('=').trim();
      return env;
    }, {});
}

function writeEnvTs(env, outPath, isProd) {
  const content = `export const environment = {
        production: ${isProd},
        omdbApiKey: '${env.OMDB_API_KEY || ''}',
        omdbBaseUrl: '${env.OMDB_BASE_URL || ''}'
    };
`;
  fs.writeFileSync(outPath, content, 'utf-8');
}

const envDev = parseEnvFile('.env');
const envProd = parseEnvFile('.env.prod');

writeEnvTs(envDev, path.join('src/environments/environment.ts'), false);
writeEnvTs(envProd, path.join('src/environments/environment.prod.ts'), true);

console.log('Angular environment files generated!');
