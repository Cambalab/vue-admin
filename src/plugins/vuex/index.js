import { subscriptions } from './subscriptions'

export const subscriptionsPlugin = store => {
  subscriptions.forEach(subscription => store.subscribe(subscription(store)))
}
