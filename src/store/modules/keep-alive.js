const keepAlive = {
  state: {
    keepAliveComponents: [] // 缓存数组
  },
  mutations: {
    keepAlive (state, components) {
      //   // 注：防止重复添加（当然也可以使用Set）
      //   !state.keepAliveComponents.includes(component) && state.keepAliveComponents.push(component)

      state.keepAliveComponents = components.filter(comp => comp.meta.keepAlive).map(comp => comp.name)
      console.log(state.keepAliveComponents)
    },
    // TODO
    noKeepAlive (state, component) {
      const index = state.keepAliveComponents.indexOf(component)
      index !== -1 && state.keepAliveComponents.splice(index, 1)
    }
  }
}

export default keepAlive
