import { makeAutoObservable, runInAction } from 'mobx';
import { informationConfig } from "../../config";
import ws from '@/socket';
import { StackType } from '@/models/StackType';
import { stackInfo } from '@/api/modules/stack';
import { notice } from '@/utils/notice';
import { SocketKey } from '@/common/socketKey';

export default class StackStore {

  stack: StackType[]  | null = null

  constructor() {
    makeAutoObservable(this)
    if (__STATIC__) {
      this.stack = informationConfig.stack
    } else {
      this.updateStack()
      this.connectStackSocket()
    }
  }


  async updateStack() {
    const res = await stackInfo() as Record<'data', StackType[]>
    this.stack = res.data
  }


  connectStackSocket() {
    ws.on(SocketKey.USER_STACK, (res) => {
      notice.toast('技术栈已更新')
      this.stack = res
    })
  }
}

