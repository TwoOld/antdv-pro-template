<template>
  <div>
    <a-card :bordered="false">
      <a-table :data-source="data" :pagination="false">
        <a-table-column key="lastName" title="lastName" data-index="lastName">
          <template slot-scope="lastName">
            <a-row type="flex" align="middle" :gutter="8">
              <a-col>
                <a-avatar :size="40"></a-avatar>
              </a-col>
              <a-col>
                <span>{{ lastName }}</span>
              </a-col>
            </a-row>
          </template>
        </a-table-column>
        <a-table-column
          key="firstName"
          title="firstName"
          data-index="firstName"
          align="center"
          width="120px"
        >
          <template slot-scope="firstName">
            <span>{{ firstName }}</span>
          </template>
        </a-table-column>
      </a-table>
    </a-card>
    <div v-if="loading && !busy" class="demo-loading-container">
      <a-spin />
    </div>
    <div v-if="busy">
      <a-divider>已加载全部</a-divider>
    </div>
  </div>
</template>
<script>
import { throttle } from 'lodash'
import infiniteScroll from 'vue-infinite-scroll'
let key = 0
export default {
  name: 'Infinite',
  directives: { infiniteScroll },
  data () {
    this.handleInfiniteOnLoad = throttle(this.handleInfiniteOnLoad, 160)

    return {
      data: [],
      loading: false,
      busy: false
    }
  },
  beforeMount () {
    this.fetchData(res => {
      this.data = res
    })
  },
  mounted () {
    console.log('mounted')

    window.addEventListener('scroll', this.handleInfiniteOnLoad)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleInfiniteOnLoad)
  },
  methods: {
    fetchData (callback) {
      const data = []

      for (let i = 0; i < 10; i++) {
        key++
        const temp = {
          key,
          firstName: 'John',
          lastName: 'Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        }
        data.push(temp)
      }
      callback(data)
    },
    handleInfiniteOnLoad () {
      const isBottom =
        document.documentElement.scrollHeight - document.documentElement.scrollTop - window.innerHeight <= 50
      if (!isBottom || this.loading || this.busy) return
      const data = this.data
      this.loading = true
      this.fetchData(res => {
        this.data = data.concat(res)
        this.loading = false
        if (data.length > 50) {
          this.busy = true
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.demo-infinite-container {
  overflow: auto;
  height: calc(100vh - 64px - 24px);
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>
