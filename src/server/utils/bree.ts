import Bree from 'bree'
import path from 'node:path'

const config: Bree.BreeOptions = {
  logger: false,
  root: path.resolve(path.join('ops', 'jobs')),
}

export const bree = new Bree(config)
