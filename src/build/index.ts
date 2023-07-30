import { ConfigExist, loadTsConfig } from "@/util/file"

import shelljs from 'shelljs'

import TaskQueue from "@/util/taskQueue"
import { loggerInfo } from "@/util"

const buildFlow = async () => {
  const taskQueue = new TaskQueue()
  const exist = ConfigExist("ig.config.ts")

  let buildConfig: any = {}
  if (exist) {
    buildConfig = loadTsConfig("ig.config.ts")
  }

  // If flow is detected, execute process orchestration
  if (buildConfig.flow) {
    const { flow } = buildConfig

    if (flow.preHook) {
      loggerInfo(`stage.preHook==>${flow.preHook}`)
      await shelljs.exec(flow.preHook)
    }

    // Add task into queue
    flow?.stages.forEach((stage: any) => {
      if (flow[stage].script) {
        loggerInfo(`stage.script==>${flow[stage].script}`)
        taskQueue.enqueue(async () => {

          if (flow[stage].preHook) {
            await shelljs.exec(flow[stage].preHook)
          }

          await shelljs.exec(flow[stage].script)

          if (flow[stage].doneHook) {
            await shelljs.exec(flow[stage].doneHook)
          }
        })
      }
    })

    if (flow.doneHook) {
      taskQueue.enqueue(async () => {
        loggerInfo(`stage.doneHook==>${flow.doneHook}`)
        await shelljs.exec(flow.doneHook)
      })
    }

    // Execute queue
    taskQueue.start()
  }
}

export {
  buildFlow
}
