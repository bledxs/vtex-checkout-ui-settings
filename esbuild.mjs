import esbuild from 'esbuild'
import path from 'path'
import { sassPlugin } from 'esbuild-sass-plugin'
const isProduction = process.env.NODE_ENV === 'production'

const DIR_NAME = path.resolve()

const loggingPlugin = {
  name: 'logging-plugin',
  setup(build) {
    build.onStart(() => {
      console.info('Build started')
    })

    build.onEnd((result) => {
      console.info(`Build ended with ${result.errors.length} errors`)
      console.info(`Build ended with ${result.warnings.length} warnings`)
      console.info(`Output files: ${result.outputFiles?.map((f) => f.path).join(', ')}`)
    })

    build.onLoad({ filter: /.*/ }, async (args) => {
      console.info(`Loading: ${args.path}`)


    })

    build.onResolve({ filter: /.*/ }, async (args) => {
      console.info(`Resolving: ${args.path}`)


    })
  },
}

const options = {
  entryPoints: [
    { out: 'checkout6-custom', in: './src/index.ts' },
    { out: 'checkout6-custom', in: './src/index.scss' },
  ],
  bundle: true,
  write: true,
  outdir: path.resolve(DIR_NAME, './checkout-ui-custom'),
  plugins: [sassPlugin(), loggingPlugin],
  minify: isProduction,
  define: isProduction
    ? {
        'process.env.NODE_ENV': '"production"',
      }
    : {
        'process.env.NODE_ENV': '"development"',
      },
  target: 'es2015',
  tsconfig: path.resolve(DIR_NAME, './tsconfig.json'),
}

const ctx = await esbuild.context(options)

await ctx.watch()

if(isProduction){
  ctx.dispose()
  ctx.cancel()
}
