/*
 * @Author: Cookie
 * @Description: 任务队列
 */

class TaskQueue {
  private tasks: (() => void)[];
  private running: boolean;

  constructor() {
    this.tasks = [];
    this.running = false;
  }

  enqueue(task: () => void) {
    this.tasks.push(task);
  }

  private async runNextTask() {
    if (this.tasks.length > 0) {
      const task = this.tasks.shift();
      if (task) {
        this.running = true;
        await task();
        this.runNextTask();
      }
    } else {
      this.running = false;
    }
  }

  start() {
    if (!this.running) {
      this.runNextTask();
    }
  }
}

export default TaskQueue;
