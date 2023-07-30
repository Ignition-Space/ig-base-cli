import { ConfigExist, loadTsConfig } from "@/util/file"

import shelljs from 'shelljs'

import TaskQueue from "@/util/taskQueue"
import { loggerInfo } from "@/util"

const buildFlow = () => {
  const taskQueue = new TaskQueue()
  const exist = ConfigExist("ig.config.ts")

  let buildConfig: any = {}
  if (exist) {
    buildConfig = loadTsConfig("ig.config.ts")
  }

  // If flow is detected, execute process orchestration
  if (buildConfig.flow) {
    const { flow } = buildConfig

    // Add task into queue
    flow?.stages.forEach((stage: any) => {
      if (flow[stage].script) {
        loggerInfo(`stage.script==>+${flow[stage].script}`)
        taskQueue.enqueue(() => {
          shelljs.exec(flow[stage].script);
        })
      }
    })

    // Execute queue
    taskQueue.start()
  }
}

export {
  buildFlow
}
