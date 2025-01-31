import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    creator: string
  }

  export interface DefineStoreOptionsBase<S, Store> {
    notifyOnError?: Array<Record<typeof StoreActions<Store>>>
  }
}
